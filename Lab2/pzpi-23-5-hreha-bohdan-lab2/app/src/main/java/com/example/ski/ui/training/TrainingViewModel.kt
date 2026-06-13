package com.example.ski.ui.training

import androidx.compose.runtime.*
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.example.ski.network.ApiService
import com.example.ski.network.dto.TrainingSessionResponse
import com.example.ski.storage.AuthRepository
import kotlinx.coroutines.launch

class TrainingViewModel(
    private val api: ApiService,
    private val repo: AuthRepository
) : ViewModel() {

    var trainings by mutableStateOf<List<TrainingSessionResponse>>(emptyList())
        private set

    var loading by mutableStateOf(false)
        private set

    var page by mutableStateOf(0)
        private set

    var endReached by mutableStateOf(false)
        private set

    fun loadFirst() {
        page = 0
        trainings = emptyList()
        endReached = false
        loadMore()
    }

    fun loadMore() {
        if (loading || endReached) return

        viewModelScope.launch {
            val userId = repo.getUserId() ?: return@launch

            loading = true

            try {
                // Используем сортировку по умолчанию (createdAt,desc)
                val res = api.getTraining(userId, page, 20)

                if (res.success && res.data != null) {
                    val data = res.data

                    trainings = trainings + data.content
                    endReached = data.last || data.content.isEmpty()
                    page++
                }
            } finally {
                loading = false
            }
        }
    }

    fun deleteTraining(id: Int) {
        viewModelScope.launch {
            try {
                val res = api.deleteTraining(id)
                if (res.success) {
                    trainings = trainings.filter { it.id != id }
                }
            } catch (e: Exception) {
                e.printStackTrace()
            }
        }
    }
}
