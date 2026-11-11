
// ==========================================
// WEEK 6 — WEATHER DASHBOARD
// Async JavaScript, APIs, fetch, and localStorage
// ==========================================

// OpenWeatherMap API URL
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";

// Get HTML elements
const form = document.getElementById("search-form");
const cityInput = document.getElementById("city-input");

const loading = document.getElementById("loading");
const error = document.getElementById("error");
const weatherDisplay = document.getElementById("weather-display");

const cityName = document.getElementById("city-name");
const weatherIcon = document.getElementById("weather-icon");
const temperature = document.getElementById("temperature");
const description = document.getElementById("description");
const feelsLike = document.getElementById("feels-like");
const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");
const pressure = document.getElementById("pressure");

const historyContainer = document.getElementById("search-history");

// ==========================================
// TASK: Show loading message
// ==========================================

function showLoading() {
    loading.classList.remove("hidden");
    weatherDisplay.classList.add("hidden");
}

function hideLoading() {
    loading.classList.add("hidden");
}

// ==========================================
// TASK: Display error messages
// ==========================================

function showError(message) {
    error.textContent = message;
    error.classList.remove("hidden");
    weatherDisplay.classList.add("hidden");
}

function hideError() {
    error.textContent = "";
    error.classList.add("hidden");
}

// ==========================================
// TASK: Fetch weather using async/await
// ==========================================

async function getWeather(city) {
    try {
        showLoading();
        hideError();

        // Check whether the API key exists
        if (typeof API_KEY === "undefined" || !API_KEY) {
            throw new Error(
                "API key missing. Please configure your config.js file."
            );
        }

        // Build the API request URL
        const url = `${BASE_URL}?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`;

        // Send request to OpenWeatherMap
        const response = await fetch(url);

        // Check whether the request was successful
        if (!response.ok) {
            if (response.status === 404) {
                throw new Error("City not found. Check the spelling and try again.");
            }

            if (response.status === 401) {
                throw new Error(
                    "Invalid or inactive API key. Check config.js. New keys may take up to 2 hours to activate."
                );
            }

            throw new Error("Unable to get weather data. Please try again.");
        }

        // Convert response into JavaScript data
        const data = await response.json();

        // Display the weather information
        displayWeather(data);

        // Save the successful search
        saveToHistory(data.name);

    } catch (err) {
        if (err instanceof TypeError) {
            showError("Network error. Check your internet connection.");
        } else {
            showError(err.message);
        }

    } finally {
        // Always hide loading message
        hideLoading();
    }
}

// ==========================================
// TASK: Display weather information
// ==========================================

function displayWeather(data) {
    cityName.textContent = `${data.name}, ${data.sys.country}`;

    weatherIcon.src =
        `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

    weatherIcon.alt = data.weather[0].description;

    temperature.textContent = `${Math.round(data.main.temp)} °C`;

    description.textContent = data.weather[0].description;

    feelsLike.textContent = `${Math.round(data.main.feels_like)} °C`;

    humidity.textContent = `${data.main.humidity}%`;

    wind.textContent = `${data.wind.speed} m/s`;

    pressure.textContent = `${data.main.pressure} hPa`;

    weatherDisplay.classList.remove("hidden");
}

// ==========================================
// TASK: Save the last 5 searches
// using localStorage
// ==========================================

function saveToHistory(city) {
    let recentSearches =
        JSON.parse(localStorage.getItem("recentSearches")) || [];

    // Remove duplicates
    recentSearches = recentSearches.filter(
        item => item.toLowerCase() !== city.toLowerCase()
    );

    // Put newest search first
    recentSearches.unshift(city);

    // Keep only the last 5 searches
    recentSearches = recentSearches.slice(0, 5);

    // Save searches in the browser
    localStorage.setItem(
        "recentSearches",
        JSON.stringify(recentSearches)
    );

    displayHistory(recentSearches);
}

// Display saved searches
function displayHistory(searches) {
    historyContainer.innerHTML = "";

    searches.forEach(city => {
        const item = document.createElement("li");

        item.textContent = city;
        item.tabIndex = 0;

        // Search again when clicked
        item.addEventListener("click", () => {
            getWeather(city);
        });

        // Also support keyboard selection
        item.addEventListener("keydown", event => {
            if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                getWeather(city);
            }
        });

        historyContainer.appendChild(item);
    });
}

// Load search history when the page opens
function loadHistory() {
    const recentSearches =
        JSON.parse(localStorage.getItem("recentSearches")) || [];

    displayHistory(recentSearches);
}

// ==========================================
// TASK: Handle search form
// ==========================================

form.addEventListener("submit", event => {
    event.preventDefault();

    const city = cityInput.value.trim();

    if (city) {
        getWeather(city);
        cityInput.value = "";
    }
});

// ==========================================
// INITIALIZE THE DASHBOARD
// ==========================================

loadHistory();
