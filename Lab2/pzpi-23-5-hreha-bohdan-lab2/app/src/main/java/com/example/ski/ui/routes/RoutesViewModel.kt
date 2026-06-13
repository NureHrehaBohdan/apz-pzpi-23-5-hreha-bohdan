package com.example.ski.ui.routes

import androidx.compose.runtime.*
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.example.ski.network.ApiService
import com.example.ski.network.RetrofitClient
import com.example.ski.network.dto.RouteActivityStat
import com.example.ski.network.dto.RouteDTO
import kotlinx.coroutines.launch

class RoutesViewModel(
    private val api: ApiService
) : ViewModel() {

    var activityStats by mutableStateOf<List<RouteActivityStat>>(emptyList())
        private set

    fun loadActivity() {
        viewModelScope.launch {
            loading = true
            try {
                val res = api.getRouteActivity()
                if (res.success) {
                    activityStats = res.data ?: emptyList()
                }
            } finally {
                loading = false
            }
        }
    }
    var routes by mutableStateOf<List<RouteDTO>>(emptyList())
        private set

    var loading by mutableStateOf(false)
        private set

    fun loadAll() {
        viewModelScope.launch {
            loading = true
            try {
                val res = api.getAllRoutes()
                if (res.success) {
                    routes = res.data ?: emptyList()
                }
            } finally {
                loading = false
            }
        }
    }

    fun filterByDifficulty(difficulty: String) {
        viewModelScope.launch {
            loading = true
            try {
                val res = api.getRoutesByDifficulty(difficulty)
                if (res.success) {
                    routes = res.data ?: emptyList()
                }
            } finally {
                loading = false
            }
        }
    }
}