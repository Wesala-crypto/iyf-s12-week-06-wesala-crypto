// DAILY CHALLENGE 3 — ERROR HANDLING

async function getUser(id) {
    try {
        const response = await fetch(
            `https://jsonplaceholder.typicode.com/users/${id}`
        );

        if (response.status === 404) {
            return {
                id: id,
                name: "Guest User",
                email: "guest@example.com"
            };
        }

        if (!response.ok) {
            throw new Error("Failed to fetch user");
        }

        return await response.json();

    } catch (error) {
        console.error("Error:", error.message);
        throw error;
    }
}

async function main() {
    const user = await getUser(999);
    console.log("User:", user);
}

main();
