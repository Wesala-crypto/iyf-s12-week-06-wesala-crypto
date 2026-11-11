

// WEEK 6 - LESSON 11
// CALLBACKS, PROMISES & ASYNC/AWAIT

// TASK 11.1: UNDERSTANDING ASYNC


// Exercise 1: Synchronous vs Asynchronous

console.log("A");

setTimeout(() => console.log("B"), 0);

console.log("C");

setTimeout(() => console.log("D"), 100);

console.log("E");


// Exercise 2: Callback Pattern

function fetchData(callback) {
    setTimeout(() => {
        const data = { name: "John", age: 30 };
        callback(data);
    }, 1000);
}

fetchData(function(data) {
    console.log("Data received:", data);
});



function loadUser(userId, callback) {
    setTimeout(() => {
        const user = {
            id: userId,
            name: "John",
            age: 30
        };

        callback(user);
    }, 1500);
}

loadUser(1, function(user) {
    console.log("User loaded:", user);
});


// TASK 11.2: CALLBACK HELL & PROMISES


function getUserDataCallback(userId, callback) {
    setTimeout(() => {
        callback({ id: userId, name: "John" });
    }, 1000);
}

function getUserPostsCallback(userId, callback) {
    setTimeout(() => {
        callback([
            { id: 1, title: "Post 1" },
            { id: 2, title: "Post 2" }
        ]);
    }, 1000);
}

function getPostCommentsCallback(postId, callback) {
    setTimeout(() => {
        callback([
            { id: 1, text: "Great post!" },
            { id: 2, text: "Thanks for sharing" }
        ]);
    }, 1000);
}



getUserDataCallback(1, function(user) {
    console.log("User:", user);

    getUserPostsCallback(user.id, function(posts) {
        console.log("Posts:", posts);

        getPostCommentsCallback(posts[0].id, function(comments) {
            console.log("Comments:", comments);
        });
    });
});


// Exercise 2: Creating Promises

function getUserData(userId) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (userId > 0) {
                resolve({ id: userId, name: "John" });
            } else {
                reject(new Error("Invalid user ID"));
            }
        }, 1000);
    });
}

function getUserPosts(userId) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (userId > 0) {
                resolve([
                    { id: 1, title: "Post 1" },
                    { id: 2, title: "Post 2" }
                ]);
            } else {
                reject(new Error("Invalid user ID"));
            }
        }, 1000);
    });
}

function getPostComments(postId) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (postId > 0) {
                resolve([
                    { id: 1, text: "Great post!" },
                    { id: 2, text: "Thanks for sharing" }
                ]);
            } else {
                reject(new Error("Invalid post ID"));
            }
        }, 1000);
    });
}



// TASK 11.3: PROMISE CHAINING




getUserData(1)
    .then(user => {
        console.log("User:", user);
        return getUserPosts(user.id);
    })
    .then(posts => {
        console.log("Posts:", posts);
        return getPostComments(posts[0].id);
    })
    .then(comments => {
        console.log("Comments:", comments);
    })
    .catch(error => {
        console.error("Error:", error);
    });


// Exercise 2: Promise.all

const promise1 = getUserData(1);
const promise2 = getUserData(2);
const promise3 = getUserData(3);

Promise.all([promise1, promise2, promise3])
    .then(results => {
        console.log("All users:", results);
    })
    .catch(error => {
        console.error("One failed:", error);
    });


// Exercise 3: Promise.race

const fast = new Promise(resolve =>
    setTimeout(() => resolve("Fast!"), 100)
);

const slow = new Promise(resolve =>
    setTimeout(() => resolve("Slow!"), 500)
);

Promise.race([fast, slow])
    .then(result => {
        console.log("Winner:", result);
    });


async function fetchThreeUsers() {
    try {
        const users = await Promise.all([
            getUserData(1),
            getUserData(2),
            getUserData(3)
        ]);

        console.log("Three users:", users);
    } catch (error) {
        console.error("Failed to fetch users:", error);
    }
}

fetchThreeUsers();


// TASK 11.4: ASYNC/AWAIT


function getDataWithPromises() {
    return getUserData(1)
        .then(user => getUserPosts(user.id))
        .then(posts => getPostComments(posts[0].id))
        .then(comments => comments);
}


async function getDataWithAsync() {
    const user = await getUserData(1);
    const posts = await getUserPosts(user.id);
    const comments = await getPostComments(posts[0].id);

    return comments;
}



async function main() {
    const comments = await getDataWithAsync();
    console.log("Async comments:", comments);
}

main();


// Exercise 2: Error Handling with Try/Catch

async function fetchUserData(userId) {
    try {
        const user = await getUserData(userId);
        const posts = await getUserPosts(user.id);

        return { user, posts };

    } catch (error) {
        console.error("Failed to fetch:", error);
        throw error;
    }
}


// Exercise 3: Parallel with Async/Await

async function getAllUsers() {
    const [u1, u2, u3] = await Promise.all([
        getUserData(1),
        getUserData(2),
        getUserData(3)
    ]);

    return [u1, u2, u3];
}



async function getCompleteUserData(userId) {
    try {
        const user = await getUserData(userId);
        const posts = await getUserPosts(user.id);
        const comments = await getPostComments(posts[0].id);

        console.log("User:", user);
        console.log("Posts:", posts);
        console.log("Comments:", comments);

        return { user, posts, comments };

    } catch (error) {
        console.error("Error loading user information:", error);
    }
}

getCompleteUserData(1);


