package com.example.ski.navigation

import androidx.compose.foundation.layout.padding
import androidx.compose.material3.Scaffold
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.LocalContext
import androidx.lifecycle.ViewModel
import androidx.lifecycle.ViewModelProvider
import androidx.lifecycle.viewmodel.compose.viewModel
import androidx.navigation.compose.*
import com.example.ski.network.RetrofitClient
import com.example.ski.storage.AuthRepository
import com.example.ski.ui.HomeScreen
import com.example.ski.ui.LoginScreen
import com.example.ski.ui.components.BottomBar
import com.example.ski.ui.home.HomeViewModel
import com.example.ski.ui.profile.ProfileScreen
import com.example.ski.ui.profile.ProfileViewModel
import com.example.ski.ui.routes.RoutesScreen
import com.example.ski.ui.training.TrainingScreen
import com.example.ski.ui.training.TrainingViewModel

@Composable
fun AppNavGraph() {
    val startDestination = Routes.LOGIN

    val navController = rememberNavController()
    val context = LocalContext.current

    val backStackEntry by navController.currentBackStackEntryAsState()
    val currentRoute = backStackEntry?.destination?.route

    Scaffold(
        bottomBar = {
            if (currentRoute != Routes.LOGIN) {
                BottomBar(navController)
            }
        }
    ) { padding ->

        NavHost(
            navController = navController,
            startDestination = Routes.LOGIN,
            modifier = Modifier.padding(padding)
        ) {

            // 🔐 LOGIN
            composable(Routes.LOGIN) {
                LoginScreen(
                    onLoginSuccess = {
                        navController.navigate(Routes.HOME) {
                            popUpTo(Routes.LOGIN) {
                                inclusive = true
                            }
                            launchSingleTop = true
                        }
                    }
                )
            }

            // 🏠 HOME
            composable(Routes.HOME) {
                val context = LocalContext.current
                val api = remember { RetrofitClient.create(context) }
                val repo = remember { AuthRepository(context) }
                
                val viewModel: HomeViewModel = viewModel(
                    factory = object : ViewModelProvider.Factory {
                        override fun <T : ViewModel> create(modelClass: Class<T>): T {
                            return HomeViewModel(api, repo, context.applicationContext) as T
                        }
                    }
                )
                
                HomeScreen(viewModel)
            }

            // 👤 PROFILE
            composable(Routes.PROFILE) {

                val viewModel = remember {
                    ProfileViewModel(context)
                }

                ProfileScreen(
                    viewModel = viewModel,
                    onLogout = {
                        navController.navigate(Routes.LOGIN) {
                            popUpTo(Routes.HOME) {
                                inclusive = true
                            }
                        }
                    }
                )
            }

            composable(Routes.TRAINING) {

                val context = LocalContext.current

                val api = remember {
                    RetrofitClient.create(context)
                }

                val repo = remember {
                    AuthRepository(context)
                }

                val viewModel = remember {
                    TrainingViewModel(api, repo)
                }

                TrainingScreen(viewModel = viewModel)
            }

            // 🗺 ROUTES
            composable(Routes.ROUTES) {
                RoutesScreen()
            }
        }
    }
}