package com.example.ski.network.dto

data class TrainingSessionDTO(
    val userId: Int,
    val startTime: String,
    val routeId: Int,
    val distanceKm: Double,
    val avgSpeedKmh: Double,
    val status: String
)

data class TrainingSession(
    val id: Int,
    val routeId: Int,
    val startTime: String,
    val distanceKm: Double,
    val avgSpeedKmh: Double,
    val status: String
)
