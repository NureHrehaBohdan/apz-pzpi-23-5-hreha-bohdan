package com.example.ski.network.dto

data class TrainingPageResponse(
    val content: List<TrainingSessionResponse>,
    val totalPages: Int,
    val totalElements: Int,
    val last: Boolean,
    val number: Int
)