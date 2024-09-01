// Initialize coffee count and CPS (Coffee per Second)
let coffeeCount = 0;
let coffeePerSecond = 0;
const clicksBeforeMove = 5; // Number of clicks before moving the coffee mug

// Get references to the HTML elements
const coffeeCountDisplay = document.getElementById("coffeeCount");
const coffeePerSecondDisplay = document.getElementById("coffeePerSecond");
const coffeeMugImage = document.getElementById("coffeeMug");

// Function to update the UI with the current coffee count and CPS
function updateUI() {
  coffeeCountDisplay.innerText = coffeeCount;
  coffeePerSecondDisplay.innerText = coffeePerSecond;
}

// Function to randomly position the coffee mug
function moveCoffeeMug() {
  // Generate random positions within the screen boundaries
  const randomBottom = Math.floor(Math.random() * 70) + 10; // Random bottom position between 10% and 80%
  const randomLeft = Math.floor(Math.random() * 70) + 10; // Random left position between 10% and 80%

  // Apply the random positions to the coffee mug
  coffeeMugImage.style.bottom = `${randomBottom}%`;
  coffeeMugImage.style.left = `${randomLeft}%`;
}

// Function to handle the coffee mug click event
coffeeMugImage.addEventListener("click", function () {
  coffeeCount++;
  updateUI();

  // Spin the coffee mug
  const rotation = coffeeCount * 360; // Calculate the rotation based on the coffee count
  coffeeMugImage.style.transform = `translateX(-50%) rotate(${rotation}deg)`;

  // Move the coffee mug after every 5 clicks
  if (coffeeCount % clicksBeforeMove === 0) {
    moveCoffeeMug();
  }
});

// Function to increment coffee count based on CPS
function updateCoffeeSales() {
  coffeeCount += coffeePerSecond;
  updateUI();
}

// Example function to increase CPS (this can be triggered by upgrades)
function increaseCPS(amount) {
  coffeePerSecond += amount;
  updateUI();
}

// Run the updateCoffeeSales function every second
setInterval(updateCoffeeSales, 1000);

// Example usage: Increase CPS by 1 every 10 seconds (for demonstration)
setInterval(function () {
  increaseCPS(1);
}, 10000);

// Initial UI update
updateUI();
