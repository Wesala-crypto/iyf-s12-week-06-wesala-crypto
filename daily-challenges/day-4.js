// DAILY CHALLENGE 4 — ASYNC/AWAIT

async function getUser(id) {
    const response = await fetch(
        `https://jsonplaceholder.typicode.com/users/${id}`
    );

    if (!response.ok) {
        throw new Error("Could not fetch user");
    }

    return await response.json();
}

async function getUserPosts(userId) {
    const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts?userId=${userId}`
    );

    if (!response.ok) {
        throw new Error("Could not fetch posts");
    }

    return await response.json();
}

async function main() {
    try {
        const user = await getUser(1);
        console.log("User:", user.name);

        const posts = await getUserPosts(user.id);
        console.log("Number of posts:", posts.length);
        console.log("First post:", posts[0].title);

    } catch (error) {
        console.error("Error:", error.message);
    }
}

main();