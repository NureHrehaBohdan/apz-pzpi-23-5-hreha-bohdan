package com.example.ski.storage

import android.content.Context
import androidx.datastore.preferences.core.edit
import kotlinx.coroutines.flow.first

class AuthRepository(private val context: Context) {

    suspend fun saveToken(token: String, userId: Long) {
        context.dataStore.edit { prefs ->
            prefs[AuthPrefs.TOKEN] = token
            prefs[AuthPrefs.USER_ID] = userId
        }
    }

    suspend fun getToken(): String? {
        val prefs = context.dataStore.data.first()
        return prefs[AuthPrefs.TOKEN]
    }

    suspend fun getUserId(): Long? {
        val prefs = context.dataStore.data.first()
        return prefs[AuthPrefs.USER_ID]
    }

    suspend fun clear() {
        context.dataStore.edit { it.clear() }
    }
}