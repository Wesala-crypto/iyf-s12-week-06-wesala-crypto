
const loading = document.getElementById("loading");
const errorDiv = document.getElementById("error");
const container = document.getElementById("users-container");

const searchInput = document.getElementById("search");
const sortSelect = document.getElementById("sort");
const cityFilter = document.getElementById("city-filter");

// Kenyan sample users
const kenyanNames = [
    "Brian Mwangi",
    "Faith Wanjiku",
    "Kevin Otieno",
    "Aisha Hassan",
    "Mary Njeri",
    "David Kiptoo",
    "Grace Atieno",
    "Dennis Kamau",
    "Sheila Akinyi",
    "Eric Mutua"
];

// Actual Kenyan cities
const kenyanCities = [
    "Nairobi",
    "Mombasa",
    "Kisumu",
    "Nakuru",
    "Eldoret",
    "Thika",
    "Nyeri",
    "Machakos",
    "Kakamega",
    "Kitale"
];

let allUsers = [];

// Generate Kenyan display name
function getDisplayName(user) {
    return kenyanNames[user.id - 1] || user.name;
}

// Generate email from name
function getEmail(user) {
    const name = getDisplayName(user);

    return name
        .toLowerCase()
        .replace(/\s+/g, ".") + "@example.com";
}

// Assign Kenyan city
function getCity(user) {
    return kenyanCities[user.id - 1] || "Nairobi";
}

// Fetch users
async function fetchUsers() {
    const response = await fetch(
        "https://jsonplaceholder.typicode.com/users"
    );

    if (!response.ok) {
        throw new Error("Failed to fetch users");
    }

    return await response.json();
}

// Display users
function displayUsers(users) {
    if (users.length === 0) {
        container.innerHTML = "<p>No users found.</p>";
        return;
    }

    container.innerHTML = users.map(user => `
        <div class="user-card">
            <h2>${getDisplayName(user)}</h2>
            <p>📧 ${getEmail(user)}</p>
            <p>🏢 ${user.company.name}</p>
            <p>📍 ${getCity(user)}, Kenya</p>
        </div>
    `).join("");
}

// Search, sort and filter
function updateUsers() {
    const query = searchInput.value.toLowerCase().trim();
    const sortOrder = sortSelect.value;
    const selectedCity = cityFilter.value;

    let filteredUsers = allUsers.filter(user => {
        const name = getDisplayName(user).toLowerCase();
        const email = getEmail(user).toLowerCase();

        const matchesSearch =
            name.includes(query) || email.includes(query);

        const matchesCity =
            selectedCity === "all" ||
            getCity(user) === selectedCity;

        return matchesSearch && matchesCity;
    });

    // Sort names
    filteredUsers.sort((a, b) => {
        const nameA = getDisplayName(a).toLowerCase();
        const nameB = getDisplayName(b).toLowerCase();

        if (sortOrder === "az") {
            return nameA.localeCompare(nameB);
        }

        return nameB.localeCompare(nameA);
    });

    displayUsers(filteredUsers);
}

// Populate city dropdown
function populateCities() {
    cityFilter.innerHTML = '<option value="all">All Cities</option>';

    kenyanCities.forEach(city => {
        const option = document.createElement("option");

        option.value = city;
        option.textContent = city;

        cityFilter.appendChild(option);
    });
}

// Initialize application
async function init() {
    try {
        loading.classList.remove("hidden");
        errorDiv.classList.add("hidden");

        allUsers = await fetchUsers();

        populateCities();
        updateUsers();

    } catch (error) {
        errorDiv.textContent = `Error: ${error.message}`;
        errorDiv.classList.remove("hidden");

    } finally {
        loading.classList.add("hidden");
    }
}

// Event listeners
searchInput.addEventListener("input", updateUsers);
sortSelect.addEventListener("change", updateUsers);
cityFilter.addEventListener("change", updateUsers);

// Start application
init();
