let isDarkMode = false; // Default light mode
let showDigitalTime = false; // Default to radian time

// Function to calculate radians
function calculateRadians(hours, minutes) {
  const hourNumerator = hours * 4;
  const minuteNumerator = minutes * 1;
  const totalNumerator = hourNumerator * 30 + minuteNumerator;
  const denominator = 30 * 2;

  const gcd = (a, b) => (b === 0 ? a : gcd(b, a % b));
  const divisor = gcd(totalNumerator, denominator);

  const simplifiedNumerator = totalNumerator / divisor;
  const simplifiedDenominator = denominator / divisor;

  return `${simplifiedNumerator}π / ${simplifiedDenominator}`;
}

// Function to update the clock
function updateClock() {
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();

  const radians = calculateRadians(hours, minutes);
  const digitalTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;

  const timeDisplay = document.getElementById('timeDisplay');

  if (showDigitalTime) {
    timeDisplay.textContent = digitalTime;
  } else {
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
