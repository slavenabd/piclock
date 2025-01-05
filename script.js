let isDarkMode = false; // Default light mode
let showDigitalTime = false; // Default to radian time

// Function to calculate radians
function calculateRadians(hours, minutes) {
  // Calculate the numerator for hours and minutes
  const hourNumerator = hours * 2; // Correctly account for 2π per hour
  const minuteNumerator = minutes * 1; // π/30 for each minute

  // Combine numerator for total radians
  const totalNumerator = hourNumerator * 30 + minuteNumerator; // Convert to a single fraction
  const denominator = 30 * 2; // Always 60 (30 * 2 for full circle)

  // Simplify the fraction
  const gcd = (a, b) => (b === 0 ? a : gcd(b, a % b)); // Greatest common divisor
  const divisor = gcd(totalNumerator, denominator);

  const simplifiedNumerator = totalNumerator / divisor;
  const simplifiedDenominator = denominator / divisor;

  return `${simplifiedNumerator}π / ${simplifiedDenominator}`;
}

// Function to update the clock
function updateClock() {
  const now = new Date();
  const hours = now.getHours(); // Local time in 24-hour format
  const minutes = now.getMinutes();

  // Debugging output
  console.log(`Local time: ${hours}:${minutes}`);
  
  // Calculate radians
  const radians = calculateRadians(hours, minutes);

  // Update the display
  const timeDisplay = document.getElementById('timeDisplay');
  timeDisplay.textContent = radians;
}

  timeDisplay.style.transform = 'scale(1.1)';
  setTimeout(() => (timeDisplay.style.transform = 'scale(1)'), 300); // Animation
}

// Function to toggle between radian and digital time
function toggleTimeFormat() {
  showDigitalTime = !showDigitalTime;
  updateClock();
}

// Function to toggle dark mode
function toggleDarkMode() {
  isDarkMode = !isDarkMode;
  document.documentElement.classList.toggle('dark', isDarkMode);
}

// Attach event listeners
document.getElementById('themeToggle').addEventListener('click', toggleDarkMode);

// Update clock every minute
setInterval(updateClock, 60000);
updateClock(); // Run initially