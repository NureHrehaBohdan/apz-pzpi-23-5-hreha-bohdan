package com.example.ski.network.dto

data class TrainingSessionResponse(
    val id: Int,
    val routeName: String?,
    val startTime: String?,
    val endTime: String?,
    val distanceKm: Double?,
    val avgSpeedKmh: Double?,
    val status: String?
)