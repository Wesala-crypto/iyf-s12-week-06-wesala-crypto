
const form = document.getElementById("post-form");
const titleInput = document.getElementById("title");
const bodyInput = document.getElementById("body");
const userIdInput = document.getElementById("userId");

const loading = document.getElementById("loading");
const errorDiv = document.getElementById("error");
const result = document.getElementById("result");
const postDisplay = document.getElementById("post-display");

// Send a new post to the API
async function createPost(title, body, userId) {
    const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                title,
                body,
                userId
            })
        }
    );

    if (!response.ok) {
        throw new Error("Failed to create post");
    }

    return response.json();
}

// Handle form submission
form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const title = titleInput.value.trim();
    const body = bodyInput.value.trim();
    const userId = Number(userIdInput.value);

    loading.classList.remove("hidden");
    errorDiv.classList.add("hidden");
    result.classList.add("hidden");

    try {
        const newPost = await createPost(title, body, userId);

        postDisplay.innerHTML = `
            <h3>${newPost.title}</h3>
            <p>${newPost.body}</p>
            <p><strong>User ID:</strong> ${newPost.userId}</p>
            <p><strong>Post ID:</strong> ${newPost.id}</p>
        `;

        result.classList.remove("hidden");
        form.reset();

    } catch (error) {
        errorDiv.textContent = error.message;
        errorDiv.classList.remove("hidden");

    } finally {
        loading.classList.add("hidden");
    }
});
