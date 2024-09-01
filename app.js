// app.js

let coffeeCount = 0;
let coffeePerSecond = 0;
let clickCount = 0;
const coffeeMug = document.getElementById("coffeeMug");

document.addEventListener("DOMContentLoaded", () => {
  loadGameData();
  initializeStats();
  setupCoffeeMug();
  fetchUpgrades();
});

function initializeStats() {
  document.getElementById(
    "coffeeCount"
  ).textContent = `Cups of Coffee Sold: ${coffeeCount}`;
  document.getElementById(
    "coffeePerSecond"
  ).textContent = `Coffees being sold per second by colleagues: ${coffeePerSecond}`;

  setInterval(() => {
    coffeeCount += coffeePerSecond;
    updateStats();
    updateUpgradeButtons();
    saveGameData();
  }, 1000);
}

function updateStats() {
  document.getElementById(
    "coffeeCount"
  ).textContent = `Cups of Coffee Sold: ${coffeeCount}`;
  document.getElementById(
    "coffeePerSecond"
  ).textContent = `Coffees being sold per second by colleagues: ${coffeePerSecond}`;
}

function updateUpgradeButtons() {
  const upgradeButtons = document.querySelectorAll(".upgrade-card button");

  upgradeButtons.forEach((button) => {
    const upgradeCost = parseInt(button.getAttribute("data-upgrade-cost"));

    if (coffeeCount >= upgradeCost) {
      button.classList.add("enabled");
      button.disabled = false;
    } else {
      button.classList.remove("enabled");
      button.disabled = true;
    }
  });
}

function purchaseUpgrade(upgrade) {
  if (coffeeCount >= upgrade.cost) {
    coffeeCount -= upgrade.cost;
    coffeePerSecond += upgrade.increase;
    updateStats();
    updateUpgradeButtons();
    saveGameData(); // Save the game data after purchasing an upgrade
  } else {
    alert("Not enough coffee cups!");
  }
}

// Setup Coffee Mug behavior
function setupCoffeeMug() {
  coffeeMug.style.display = "block";
  coffeeMug.addEventListener("click", handleCoffeeMugClick);
}

function handleCoffeeMugClick() {
  clickCount++;
  coffeeCount += 8;
  updateStats();
  updateUpgradeButtons();
  saveGameData(); // Save the game data after clicking the coffee mug

  if (clickCount % 5 === 0) {
    moveCoffeeMug();
  }

  coffeeMug.style.transform = `rotate(${clickCount * 360}deg)`;
}

function moveCoffeeMug() {
  const positions = [
    { left: "0", top: "50%" }, // Center Left
    { left: "calc(100% - 100px)", top: "50%" }, // Center Right (subtracting the mug width)
  ];

  const nextPosition = positions[(clickCount / 5) % 2];
  coffeeMug.style.left = nextPosition.left;
  coffeeMug.style.top = nextPosition.top;
}

// Fetch upgrades and add event listeners
async function fetchUpgrades() {
  const upgradesContainer = document.getElementById("upgradesContainer");
  try {
    const response = await fetch(
      "https://cookie-upgrade-api.vercel.app/api/upgrades"
    );
    if (!response.ok) {
      throw new Error("Failed to fetch upgrades");
    }
    const upgrades = await response.json();
    upgradesContainer.innerHTML = ""; // Clear loading text
    upgrades.forEach((upgrade) => {
      const upgradeCard = document.createElement("div");
      upgradeCard.classList.add("upgrade-card");
      upgradeCard.innerHTML = `
                <h3>${upgrade.name}</h3>
                <p>Increase: ${upgrade.increase} per second</p>
                <p>Cost: ☕${upgrade.cost}</p>
                <button data-upgrade-cost="${upgrade.cost}">Buy</button>
            `;
      upgradeCard
        .querySelector("button")
        .addEventListener("click", () => purchaseUpgrade(upgrade));
      upgradesContainer.appendChild(upgradeCard);
    });

    // Update the state of buttons initially
    updateUpgradeButtons();
  } catch (error) {
    upgradesContainer.innerHTML = `<p>Error loading upgrades: ${error.message}</p>`;
  }
}

// Save game data to localStorage
function saveGameData() {
  const gameData = {
    coffeeCount: coffeeCount,
    coffeePerSecond: coffeePerSecond,
    clickCount: clickCount,
  };
  localStorage.setItem("coffeeGameData", JSON.stringify(gameData));
}

// Load game data from localStorage
function loadGameData() {
  const savedData = localStorage.getItem("coffeeGameData");
  if (savedData) {
    const gameData = JSON.parse(savedData);
    coffeeCount = gameData.coffeeCount;
    coffeePerSecond = gameData.coffeePerSecond;
    clickCount = gameData.clickCount;
  }
}
