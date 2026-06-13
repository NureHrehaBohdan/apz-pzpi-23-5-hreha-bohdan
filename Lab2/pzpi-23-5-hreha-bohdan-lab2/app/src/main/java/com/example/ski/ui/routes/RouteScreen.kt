package com.example.ski.ui.routes

import androidx.compose.foundation.horizontalScroll
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.rememberScrollState
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.SignalCellularAlt
import androidx.compose.material.icons.filled.Straighten
import androidx.compose.material.icons.filled.Terrain
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp

@Composable
fun RoutesScreen() {
    val context = androidx.compose.ui.platform.LocalContext.current
    var selectedTab by remember { mutableStateOf(0) }

    val api = remember {
        com.example.ski.network.RetrofitClient.create(context)
    }

    val viewModel = remember {
        RoutesViewModel(api)
    }

    val routes = viewModel.routes
    val loading = viewModel.loading

    LaunchedEffect(Unit) {
        viewModel.loadAll()
    }

    Column(
        modifier = Modifier
            .fillMaxSize()
            .padding(16.dp)
    ) {
        Text(
            text = "Ski Routes",
            style = MaterialTheme.typography.headlineMedium,
            fontWeight = FontWeight.Bold,
            color = MaterialTheme.colorScheme.primary
        )

        Spacer(Modifier.height(16.dp))

        TabRow(
            selectedTabIndex = selectedTab,
            containerColor = androidx.compose.ui.graphics.Color.Transparent,
            divider = {}
        ) {
            Tab(
                selected = selectedTab == 0,
                onClick = { selectedTab = 0; viewModel.loadAll() },
                text = { Text("Discover") }
            )
            Tab(
                selected = selectedTab == 1,
                onClick = { selectedTab = 1; viewModel.loadActivity() },
                text = { Text("Popularity") }
            )
        }

        Spacer(Modifier.height(16.dp))

        when (selectedTab) {
            0 -> {
                RouteListContent(viewModel, routes, loading)
            }
            1 -> {
                RouteActivityScreen(viewModel)
            }
        }
    }
}

@Composable
fun RouteListContent(viewModel: RoutesViewModel, routes: List<com.example.ski.network.dto.RouteDTO>, loading: Boolean) {
    Column {
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .horizontalScroll(rememberScrollState()),
            horizontalArrangement = Arrangement.spacedBy(8.dp)
        ) {
            FilterChip(
                selected = true,
                onClick = { viewModel.loadAll() },
                label = { Text("All") }
            )
            FilterChip(
                selected = false,
                onClick = { viewModel.filterByDifficulty("EASY") },
                label = { Text("Easy") }
            )
            FilterChip(
                selected = false,
                onClick = { viewModel.filterByDifficulty("MEDIUM") },
                label = { Text("Medium") }
            )
            FilterChip(
                selected = false,
                onClick = { viewModel.filterByDifficulty("HARD") },
                label = { Text("Hard") }
            )
        }

        Spacer(Modifier.height(12.dp))

        if (loading) {
            Box(Modifier.fillMaxSize(), contentAlignment = Alignment.Center) {
                CircularProgressIndicator()
            }
        } else {
            LazyColumn(
                verticalArrangement = Arrangement.spacedBy(12.dp),
                contentPadding = PaddingValues(bottom = 16.dp)
            ) {
                items(routes) { route ->
                    RouteItemCard(route)
                }
            }
        }
    }
}

@Composable
fun RouteItemCard(route: com.example.ski.network.dto.RouteDTO) {
    Card(
        modifier = Modifier.fillMaxWidth(),
        shape = MaterialTheme.shapes.large,
        elevation = CardDefaults.cardElevation(defaultElevation = 2.dp)
    ) {
        Column(modifier = Modifier.padding(16.dp)) {
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.SpaceBetween,
                verticalAlignment = Alignment.CenterVertically
            ) {
                Text(
                    text = route.name ?: "Unnamed Route",
                    style = MaterialTheme.typography.titleLarge,
                    fontWeight = FontWeight.Bold
                )
                DifficultyBadge(route.difficultyLevel ?: "UNKNOWN")
            }

            Spacer(Modifier.height(8.dp))
            
            Text(
                text = route.description ?: "",
                style = MaterialTheme.typography.bodyMedium,
                color = MaterialTheme.colorScheme.onSurfaceVariant,
                maxLines = 2
            )

            Spacer(Modifier.height(16.dp))

            Row(horizontalArrangement = Arrangement.spacedBy(16.dp)) {
                RouteInfoTag(Icons.Default.Straighten, "${route.lengthKm ?: 0.0} km")
                RouteInfoTag(Icons.Default.Terrain, "Ski Route")
            }
        }
    }
}

@Composable
fun DifficultyBadge(level: String) {
    val color = when (level.uppercase()) {
        "EASY" -> androidx.compose.ui.graphics.Color(0xFF4CAF50)
        "MEDIUM" -> androidx.compose.ui.graphics.Color(0xFFFF9800)
        "HARD" -> androidx.compose.ui.graphics.Color(0xFFF44336)
        else -> MaterialTheme.colorScheme.secondary
    }
    
    Surface(
        color = color.copy(alpha = 0.1f),
        shape = MaterialTheme.shapes.small,
        border = androidx.compose.foundation.BorderStroke(1.dp, color.copy(alpha = 0.5f))
    ) {
        Text(
            text = level,
            modifier = Modifier.padding(horizontal = 8.dp, vertical = 2.dp),
            style = MaterialTheme.typography.labelSmall,
            color = color,
            fontWeight = FontWeight.Bold
        )
    }
}

@Composable
fun RouteInfoTag(icon: ImageVector, text: String) {
    Row(verticalAlignment = Alignment.CenterVertically) {
        Icon(
            imageVector = icon,
            contentDescription = null,
            modifier = Modifier.size(16.dp),
            tint = MaterialTheme.colorScheme.outline
        )
        Spacer(Modifier.width(4.dp))
        Text(
            text = text,
            style = MaterialTheme.typography.labelMedium,
            color = MaterialTheme.colorScheme.outline
        )
    }
}
