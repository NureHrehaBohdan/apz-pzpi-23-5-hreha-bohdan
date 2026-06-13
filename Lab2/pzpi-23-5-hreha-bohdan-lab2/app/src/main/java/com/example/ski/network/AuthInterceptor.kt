package com.example.ski.network

import android.content.Context
import com.example.ski.storage.AuthPrefs
import com.example.ski.storage.dataStore
import kotlinx.coroutines.flow.first
import kotlinx.coroutines.runBlocking
import okhttp3.Interceptor
import okhttp3.Response

class AuthInterceptor(
    private val context: Context
) : Interceptor {

    override fun intercept(chain: Interceptor.Chain): Response {

        val prefs = runBlocking {
            context.dataStore.data.first()
        }

        val token = prefs[AuthPrefs.TOKEN]

        println("TOKEN = $token")

        val request = chain.request()
        val path = request.url.encodedPath

        val newRequest = request.newBuilder().apply {
            // Не добавляем токен для запросов авторизации
            if (token != null && !path.contains("/auth/")) {
                addHeader("Authorization", "Bearer $token")
            }
        }.build()

        return chain.proceed(newRequest)
    }
}