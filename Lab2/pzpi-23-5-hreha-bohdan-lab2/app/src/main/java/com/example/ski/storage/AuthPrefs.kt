package com.example.ski.storage

import androidx.datastore.preferences.core.stringPreferencesKey
import androidx.datastore.preferences.core.longPreferencesKey

object AuthPrefs {
    val TOKEN = stringPreferencesKey("token")
    val USER_ID = longPreferencesKey("user_id")
}