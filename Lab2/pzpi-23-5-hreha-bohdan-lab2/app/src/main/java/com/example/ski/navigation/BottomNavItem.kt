package com.example.ski.navigation

import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.FitnessCenter
import androidx.compose.material.icons.filled.Home
import androidx.compose.material.icons.filled.Person
import androidx.compose.material.icons.filled.Route
import androidx.compose.ui.graphics.vector.ImageVector

sealed class BottomNavItem(
    val route: String,
    val title: String,
    val icon: ImageVector
) {

    object Home : BottomNavItem(
        route = Routes.HOME,
        title = "Home",
        icon = Icons.Default.Home
    )

    object Profile : BottomNavItem(
        route = Routes.PROFILE,
        title = "Profile",
        icon = Icons.Default.Person
    )

    object Training : BottomNavItem(
        route = Routes.TRAINING,
        title = "Training",
        icon = Icons.Default.FitnessCenter
    )

    object RoutesScreen : BottomNavItem(
        route = Routes.ROUTES,
        title = "Routes",
        icon = Icons.Default.Route
    )
}