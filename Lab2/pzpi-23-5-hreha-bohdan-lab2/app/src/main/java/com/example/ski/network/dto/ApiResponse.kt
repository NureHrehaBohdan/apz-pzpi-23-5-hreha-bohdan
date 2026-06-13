package com.example.ski.network.dto

data class ApiResponse<T>(
    val success: Boolean,
    val message: String,
    val data: T?
)