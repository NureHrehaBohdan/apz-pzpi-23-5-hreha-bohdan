package com.example.ski.ui.routes

import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.material3.Card
import androidx.compose.material3.CircularProgressIndicator
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp

@Composable
fun RouteActivityScreen(
    viewModel: RoutesViewModel
) {

    val stats = viewModel.activityStats
    val loading = viewModel.loading

    LaunchedEffect(Unit) {
        viewModel.loadActivity()
    }

    Column(Modifier.fillMaxSize().padding(16.dp)) {

        Text(
            "Route Activity",
            style = MaterialTheme.typography.headlineMedium
        )

        Spacer(Modifier.height(12.dp))

        if (loading) {
            CircularProgressIndicator()
        } else {

            LazyColumn {

                items(stats) { item ->

                    Card(
                        Modifier
                            .fillMaxWidth()
                            .padding(vertical = 6.dp)
                    ) {

                        Column(Modifier.padding(12.dp)) {

                            Text(item.routeName ?: "Unnamed Route")

                            Text("Avg sessions/day: ${item.avgSessionsPerDay ?: 0.0}")
                        }
                    }
                }
            }
        }
    }
}