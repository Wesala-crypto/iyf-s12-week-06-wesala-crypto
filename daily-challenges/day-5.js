// DAILY CHALLENGE 5 — PARALLEL FETCHES

async function fetchData(url, name) {
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error(`${name} request failed`);
    }

    const data = await response.json();

    console.log(`${name} loaded:`, data.length, "records");

    return data;
}

async function main() {
    const requests = [
        fetchData("https://jsonplaceholder.typicode.com/users", "Users"),
        fetchData("https://jsonplaceholder.typicode.com/posts", "Posts"),
        fetchData("https://jsonplaceholder.typicode.com/comments", "Comments")
    ];

    const results = await Promise.allSettled(requests);

    console.log("\nFinal results:");

    results.forEach((result, index) => {
        const names = ["Users", "Posts", "Comments"];

        if (result.status === "fulfilled") {
            console.log(`${names[index]}: Successful`);
        } else {
            console.log(`${names[index]}: Failed - ${result.reason.message}`);
        }
    });
}

main();
