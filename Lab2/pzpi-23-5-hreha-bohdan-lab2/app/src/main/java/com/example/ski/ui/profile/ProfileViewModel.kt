package com.example.ski.ui.profile

import android.content.Context
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.example.ski.network.RetrofitClient
import com.example.ski.network.dto.UserDTO
import com.example.ski.storage.AuthRepository
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.launch

class ProfileViewModel(context: Context) : ViewModel() {

    private val api = RetrofitClient.create(context)
    private val repo = AuthRepository(context)

    private val _user = MutableStateFlow<UserDTO?>(null)
    val user: StateFlow<UserDTO?> = _user

    private val _loading = MutableStateFlow(false)
    val loading: StateFlow<Boolean> = _loading

    fun loadUser() {
        viewModelScope.launch {
            _loading.value = true

            val id = repo.getUserId() ?: return@launch

            try {
                val response = api.getUser(id)
                if (response.success) {
                    _user.value = response.data
                }
            } catch (e: Exception) {
                e.printStackTrace()
            }

            _loading.value = false
        }
    }

    fun updateUser(updated: UserDTO) {
        viewModelScope.launch {
            _loading.value = true

            try {
                val response = api.updateUser(updated)
                if (response.success) {
                    _user.value = updated
                }
            } catch (e: Exception) {
                e.printStackTrace()
            }

            _loading.value = false
        }
    }
}