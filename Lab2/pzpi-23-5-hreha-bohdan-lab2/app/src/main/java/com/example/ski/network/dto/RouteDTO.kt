package com.example.ski.network.dto

data class RouteDTO(
    val id: Long,
    val name: String?,
    val description: String?,
    val difficultyLevel: String?,
    val lengthKm: Double?
)