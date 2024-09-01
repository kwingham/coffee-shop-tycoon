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
                <button data-upgrade-type="${upgrade.id}">Buy</button>
            `;
      upgradeCard
        .querySelector("button")
        .addEventListener("click", () => purchaseUpgrade(upgrade));
      upgradesContainer.appendChild(upgradeCard);
    });
  } catch (error) {
    upgradesContainer.innerHTML = `<p>Error loading upgrades: ${error.message}</p>`;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  fetchUpgrades();
});
