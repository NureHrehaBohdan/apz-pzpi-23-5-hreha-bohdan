// ======================================================
// Twitch API Example
// Example of working with Twitch Helix API using fetch
// ======================================================

// ------------------------------------------
// Twitch application credentials
// ------------------------------------------

// Client ID from Twitch Developer Console
const CLIENT_ID = "YOUR_CLIENT_ID";

// OAuth Access Token
const ACCESS_TOKEN = "YOUR_ACCESS_TOKEN";

// Base URL for Twitch Helix API
const BASE_URL = "https://api.twitch.tv/helix";

// ------------------------------------------
// Common headers for all API requests
// ------------------------------------------

const headers = {
    "Client-Id": CLIENT_ID,
    "Authorization": `Bearer ${ACCESS_TOKEN}`
};

// ======================================================
// 1. Get active streams
// ======================================================

async function getStreams() {

    console.log("Loading active streams...");

    try {

        // Sending GET request to Twitch API
        const response = await fetch(
            `${BASE_URL}/streams`,
            {
                method: "GET",
                headers: headers
            }
        );

        // Convert response to JSON
        const data = await response.json();

        console.log("========== ACTIVE STREAMS ==========");

        // Display stream information
        data.data.forEach(stream => {

            console.log(`
Streamer: ${stream.user_name}
Title: ${stream.title}
Game: ${stream.game_name}
Viewers: ${stream.viewer_count}
Language: ${stream.language}
`);
        });

    } catch (error) {

        console.error("Error while loading streams:");
        console.error(error);
    }
}

// ======================================================
// 2. Search channels by keyword
// ======================================================

async function searchChannels(query) {

    console.log(`Searching channels: ${query}`);

    try {

        const response = await fetch(
            `${BASE_URL}/search/channels?query=${query}`,
            {
                method: "GET",
                headers: headers
            }
        );

        const data = await response.json();

        console.log("========== SEARCH RESULTS ==========");

        data.data.forEach(channel => {

            console.log(`
Channel: ${channel.display_name}
Game: ${channel.game_name}
Live: ${channel.is_live}
Description: ${channel.title}
`);
        });

    } catch (error) {

        console.error("Search error:");
        console.error(error);
    }
}

// ======================================================
// 3. Get user information
// ======================================================

async function getUserInfo(username) {

    console.log(`Loading user info: ${username}`);

    try {

        const response = await fetch(
            `${BASE_URL}/users?login=${username}`,
            {
                method: "GET",
                headers: headers
            }
        );

        const data = await response.json();

        // First user from response
        const user = data.data[0];

        console.log("========== USER INFO ==========");

        console.log(`
ID: ${user.id}
Login: ${user.login}
Display Name: ${user.display_name}
Description: ${user.description}
Profile Image: ${user.profile_image_url}
View Count: ${user.view_count}
`);

    } catch (error) {

        console.error("User loading error:");
        console.error(error);
    }
}

// ======================================================
// 4. Get top games
// ======================================================

async function getTopGames() {

    console.log("Loading top games...");

    try {

        const response = await fetch(
            `${BASE_URL}/games/top`,
            {
                method: "GET",
                headers: headers
            }
        );

        const data = await response.json();

        console.log("========== TOP GAMES ==========");

        data.data.forEach(game => {

            console.log(`
Game: ${game.name}
Game ID: ${game.id}
`);
        });

    } catch (error) {

        console.error("Top games error:");
        console.error(error);
    }
}


// ======================================================
// Main function
// ======================================================

async function main() {

    // Get active streams
    await getStreams();

    // Search Minecraft channels
    await searchChannels("minecraft");

    // Load information about streamer
    await getUserInfo("shroud");

    // Get top Twitch games
    await getTopGames();

    // Connect to Twitch chat
    // Uncomment if needed
    // connectToChat();
}

// Run application
main();