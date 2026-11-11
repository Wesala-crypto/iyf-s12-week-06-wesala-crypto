
// ==========================================
// LESSON 12.1 — FETCH API BASICS
// ==========================================

// EXERCISE 1: Your First Fetch

fetch("https://jsonplaceholder.typicode.com/users/1")
    .then(response => {
        console.log("Response object:", response);
        console.log("Status:", response.status);
        console.log("OK:", response.ok);

        return response.json();
    })
    .then(data => {
        console.log("User data:", data);
    })
    .catch(error => {
        console.error("Fetch error:", error);
    });


// EXERCISE 2: Fetch with Async/Await

async function getUser(id) {
    try {
        const response = await fetch(
            `https://jsonplaceholder.typicode.com/users/${id}`
        );

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        return data;

    } catch (error) {
        console.error("Failed to fetch user:", error);
    }
}


// PRACTICE 1: Fetch a single user

async function fetchSingleUser() {
    const user = await getUser(1);
    console.log("Single user:", user);
}


// PRACTICE 2: Fetch all users

async function fetchAllUsers() {
    try {
        const response = await fetch(
            "https://jsonplaceholder.typicode.com/users"
        );

        if (!response.ok) {
            throw new Error("Failed to fetch users");
        }

        const users = await response.json();
        console.log("All users:", users);

    } catch (error) {
        console.error(error);
    }
}


// PRACTICE 3: Fetch posts for user 1

async function fetchUserPosts() {
    try {
        const response = await fetch(
            "https://jsonplaceholder.typicode.com/users/1/posts"
        );

        if (!response.ok) {
            throw new Error("Failed to fetch posts");
        }

        const posts = await response.json();
        console.log("User 1 posts:", posts);

    } catch (error) {
        console.error(error);
    }
}


// RUN THE PRACTICE

async function main() {
    await fetchSingleUser();
    await fetchAllUsers();
    await fetchUserPosts();
}

main();
