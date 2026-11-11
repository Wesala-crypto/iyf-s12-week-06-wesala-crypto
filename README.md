# iyf-s12-week-06-wesala-crypto# Week 6 — Async JavaScript & APIs

**Repository:** `iyf-s12-week-06-wesala-crypto`

This project contains my Week 6 exercises for the IYF WeCan Academy Season 12. It focuses on asynchronous JavaScript, Promises, the Fetch API, working with APIs, and building interactive web applications.

## Project Contents

### 1. Async JavaScript Practice
- Callback functions
- Promises and Promise chaining
- `async` and `await`
- Error handling with `try/catch`
- Parallel requests using `Promise.all()` and `Promise.allSettled()`

### 2. API Practice
Located in `api-practice/`.

- **Fetch Practice:** Fetching users and posts from JSONPlaceholder.
- **User Directory:** Displaying, searching, sorting, and filtering user information.
- **Post Creator:** Creating posts using HTTP POST requests.

### 3. Daily Challenges
Located in `daily-challenges/`.

- Day 1: Delayed Promise
- Day 2: Promise Chain
- Day 3: Error Handling
- Day 4: Rewrite with Async/Await
- Day 5: Parallel Fetches

### 4. Weather Dashboard
A weather application that uses the OpenWeatherMap API.

Features:
- Search for weather by city.
- Display temperature and weather conditions.
- Show humidity, wind speed, pressure, and feels-like temperature.
- Handle loading states and errors.
- Store the five most recent searches using localStorage.

## Technologies Used

- HTML5
- CSS3
- JavaScript (ES6+)
- Fetch API
- JSONPlaceholder API
- OpenWeatherMap API
- Git and GitHub

## Running the Project Locally

1. Clone this repository.
2. Open the project folder.
3. Create a `config.js` file in the root directory.
4. Add your own OpenWeatherMap API key:

   ```javascript
   const API_KEY = "YOUR_API_KEY";
   ```

5. Start a local server from the project root:

   ```bash
   python -m http.server 8000
   ```

6. Open `http://localhost:8000` in your browser.

**Important:** Never commit `config.js` or share your API key. The file is excluded through `.gitignore`. Use `config.example.js` as a reference.

## Learning Objectives

This project demonstrates practical understanding of asynchronous JavaScript, API communication, DOM manipulation, error handling, and version control.

---

**Course:** IYF WeCan Academy — Season 12  
**Week:** 6 — Async JavaScript & APIs  
**Author:** Wesala-crypto