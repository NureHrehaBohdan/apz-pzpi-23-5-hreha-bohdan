package com.example.ski.network

import com.example.ski.network.dto.ApiResponse
import com.example.ski.network.dto.AuthRequest
import com.example.ski.network.dto.AuthResponse
import com.example.ski.network.dto.RouteActivityStat
import com.example.ski.network.dto.RouteDTO
import com.example.ski.network.dto.TrainingPageResponse
import com.example.ski.network.dto.TrainingSessionDTO
import com.example.ski.network.dto.TrainingSessionResponse
import com.example.ski.network.dto.UserDTO
import retrofit2.Response
import retrofit2.http.*

interface ApiService {

    // AUTH
    @POST("/auth/register")
    suspend fun register(@Body body: AuthRequest): ApiResponse<Void>

    @POST("/auth/login")
    suspend fun login(@Body body: AuthRequest): ApiResponse<AuthResponse>

    // USER
    @GET("/user/{id}")
    suspend fun getUser(@Path("id") id: Long): ApiResponse<UserDTO>

    @PUT("/user")
    suspend fun updateUser(@Body body: UserDTO): ApiResponse<Void>

    @GET("/user/route")
    suspend fun getAllRoutes(): ApiResponse<List<RouteDTO>>

    @GET("/user/route/difficulty/{difficulty}")
    suspend fun getRoutesByDifficulty(
        @Path("difficulty") difficulty: String
    ): ApiResponse<List<RouteDTO>>

    @GET("/admin/analytics/route-activity")
    suspend fun getRouteActivity(): ApiResponse<List<RouteActivityStat>>

    @GET("/user/training/{userId}")
    suspend fun getTraining(
        @Path("userId") userId: Long,
        @Query("page") page: Int,
        @Query("size") size: Int,
        @Query("sort") sort: String = "createdAt,desc"
    ): ApiResponse<TrainingPageResponse>

    @DELETE("/user/training/{id}")
    suspend fun deleteTraining(
        @Path("id") id: Int
    ): ApiResponse<Void>

    @POST("/user/training")
    suspend fun addTraining(
        @Body body: TrainingSessionDTO
    ): ApiResponse<TrainingSessionResponse>
}