package com.example.ski.ui.components

import androidx.compose.material3.Icon
import androidx.compose.material3.NavigationBar
import androidx.compose.material3.NavigationBarItem
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.navigation.NavController
import androidx.navigation.NavGraph.Companion.findStartDestination
import androidx.navigation.compose.currentBackStackEntryAsState
import com.example.ski.navigation.BottomNavItem

@Composable
fun BottomBar(
    navController: NavController
) {

    val items = listOf(
        BottomNavItem.Home,
        BottomNavItem.RoutesScreen,
        BottomNavItem.Training,
        BottomNavItem.Profile
    )

    val navBackStackEntry =
        navController.currentBackStackEntryAsState()

    val currentRoute =
        navBackStackEntry.value?.destination?.route

    NavigationBar {

        items.forEach { item ->

            NavigationBarItem(

                selected = currentRoute == item.route,

                onClick = {

                    navController.navigate(item.route) {
                        popUpTo(navController.graph.findStartDestination().id) {
                            saveState = true
                        }
                        launchSingleTop = true
                        restoreState = true
                    }
                },

                icon = {
                    Icon(
                        imageVector = item.icon,
                        contentDescription = item.title
                    )
                },

                label = {
                    Text(item.title)
                }
            )
        }
    }
}