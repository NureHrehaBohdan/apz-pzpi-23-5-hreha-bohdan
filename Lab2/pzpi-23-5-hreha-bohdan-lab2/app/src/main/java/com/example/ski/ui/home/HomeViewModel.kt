package com.example.ski.ui.home

import android.annotation.SuppressLint
import android.content.Context
import android.location.Location
import android.os.Looper
import androidx.compose.runtime.*
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.example.ski.network.ApiService
import com.example.ski.network.dto.LocationPointDTO
import com.example.ski.network.dto.RouteDTO
import com.example.ski.network.dto.TrainingSessionDTO
import com.example.ski.storage.AuthRepository
import com.google.android.gms.location.LocationCallback
import com.google.android.gms.location.LocationRequest
import com.google.android.gms.location.LocationResult
import com.google.android.gms.location.LocationServices
import com.google.android.gms.location.Priority
import kotlinx.coroutines.Job
import kotlinx.coroutines.delay
import kotlinx.coroutines.launch
import java.text.SimpleDateFormat
import java.util.*

class HomeViewModel(
    private val api: ApiService,
    private val authRepository: AuthRepository,
    context: Context
) : ViewModel() {

    private val applicationContext = context.applicationContext
    private val fusedLocationClient = LocationServices.getFusedLocationProviderClient(applicationContext)

    var routes by mutableStateOf<List<RouteDTO>>(emptyList())
        private set

    var selectedRoute by mutableStateOf<RouteDTO?>(null)

    var isTracking by mutableStateOf(false)
        private set

    var isLoading by mutableStateOf(false)
        private set

    var isSaving by mutableStateOf(false)
        private set

    var error by mutableStateOf<String?>(null)
        private set

    var distanceMeters by mutableDoubleStateOf(0.0)
        private set

    var elapsedTimeSeconds by mutableLongStateOf(0L)
        private set

    private val collectedPoints = mutableListOf<LocationPointDTO>()

    private var startTime: Date? = null
    private var startMillis: Long = 0L
    private var lastLocation: Location? = null
    private var timerJob: Job? = null

    private val locationCallback = object : LocationCallback() {
        override fun onLocationResult(result: LocationResult) {
            if (!isTracking) return
            result.lastLocation?.let { location ->
                collectedPoints.add(
                    LocationPointDTO(
                        latitude = location.latitude,
                        longitude = location.longitude,
                        timestamp = System.currentTimeMillis()
                    )
                )
                lastLocation?.let { last ->
                    distanceMeters += last.distanceTo(location).toDouble()
                }
                lastLocation = location
            }
        }
    }

    init {
        loadRoutes()
    }

    fun loadRoutes() {
        viewModelScope.launch {
            isLoading = true
            error = null
            try {
                val response = api.getAllRoutes()
                if (response.success) {
                    routes = response.data ?: emptyList()
                    if (routes.isNotEmpty() && selectedRoute == null) {
                        selectedRoute = routes[0]
                    }
                } else {
                    error = response.message
                }
            } catch (e: Exception) {
                error = "Failed to load routes: ${e.localizedMessage}"
                e.printStackTrace()
            } finally {
                isLoading = false
            }
        }
    }

    @SuppressLint("MissingPermission")
    fun startTraining() {
        if (selectedRoute == null || isTracking) return

        isTracking = true
        distanceMeters = 0.0
        elapsedTimeSeconds = 0L
        startTime = Date()
        startMillis = System.currentTimeMillis()
        lastLocation = null
        collectedPoints.clear()
        error = null

        val request = LocationRequest.Builder(Priority.PRIORITY_HIGH_ACCURACY, 5000)
            .setMinUpdateIntervalMillis(2000)
            .build()

        fusedLocationClient.requestLocationUpdates(
            request,
            locationCallback,
            Looper.getMainLooper()
        )

        timerJob = viewModelScope.launch {
            while (isTracking) {
                delay(500)
                elapsedTimeSeconds = (System.currentTimeMillis() - startMillis) / 1000
            }
        }
    }

    fun stopTraining() {
        if (!isTracking) return
        isTracking = false
        fusedLocationClient.removeLocationUpdates(locationCallback)
        timerJob?.cancel()

        saveTraining()
    }

    fun cancelTraining() {
        if (!isTracking) return
        isTracking = false
        fusedLocationClient.removeLocationUpdates(locationCallback)
        timerJob?.cancel()

        distanceMeters = 0.0
        elapsedTimeSeconds = 0L
        collectedPoints.clear()
        lastLocation = null
        startTime = null
        error = null
    }

    private fun saveTraining() {
        val route = selectedRoute ?: return
        val start = startTime ?: return
        
        viewModelScope.launch {
            isSaving = true
            error = null
            try {
                val userId = authRepository.getUserId() ?: throw Exception("User ID not found")
                val avgSpeedKmh = if (elapsedTimeSeconds > 0) {
                    (distanceMeters / 1000.0) / (elapsedTimeSeconds / 3600.0)
                } else 0.0

                val sdf = SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss", Locale.US)
                val startTimeStr = sdf.format(start)

                val dto = TrainingSessionDTO(
                    userId = userId.toInt(),
                    startTime = startTimeStr,
                    routeId = route.id.toInt(),
                    distanceKm = distanceMeters / 1000.0,
                    avgSpeedKmh = avgSpeedKmh,
                    status = "COMPLETED"
                )

                val response = api.addTraining(dto)
                if (response.success) {
                    collectedPoints.clear()
                } else {
                    error = response.message
                }
            } catch (e: Exception) {
                error = "Failed to save training: ${e.localizedMessage}"
                e.printStackTrace()
            } finally {
                isSaving = false
            }
        }
    }

    override fun onCleared() {
        super.onCleared()
        fusedLocationClient.removeLocationUpdates(locationCallback)
        timerJob?.cancel()
    }
}
