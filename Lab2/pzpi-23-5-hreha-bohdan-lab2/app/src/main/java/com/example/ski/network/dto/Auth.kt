package com.example.ski.network.dto

data class AuthRequest(
    val email: String,
    val password: String
)

data class AuthResponse(
    val userId: Long,
    val jwt: String
)