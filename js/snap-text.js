/* Snap text animation (Thanos effect) */
function createSnapCharacterSpan(char, index) {
  return `<span class="snap-letter" style="--snap-index: ${index}">${char}</span>`;
}

function processSnapText(textContent) {
  let html = "";
  let charIndex = 0;

  for (const char of textContent) {
    if (char.trim() !== "") {
      html += createSnapCharacterSpan(char, charIndex);
      charIndex++;
    } else {
      html += char; // Preserve spaces
    }
  }

  return html;
}

function applySnapText(element) {
  if (!element) {
    console.error("Element not provided for snap text effect.");
    return false;
  }

  const originalText = element.textContent;
  let animationTimeout;
  let cycleInterval;

  function triggerSnapAnimation() {
    // Clear any existing timeouts
    if (animationTimeout) {
      clearTimeout(animationTimeout);
    }

    // Reset the element completely
    element.innerHTML = processSnapText(originalText);
    const letters = element.querySelectorAll(".snap-letter");

    // Quick fade-in on reformation
    letters.forEach((letter) => {
      letter.style.opacity = "0";
      letter.classList.add("fade-in");
      // Force reflow to ensure animation restarts
      letter.offsetHeight;
    });

    // Wait for fade-in to complete, then show text normally for a while
    animationTimeout = setTimeout(() => {
      letters.forEach((letter) => {
        letter.classList.remove("fade-in");
        letter.style.opacity = "1";
      });

      // After displaying for a while, trigger the snap animation
      animationTimeout = setTimeout(() => {
        letters.forEach((letter) => {
          const delay = Math.random() * 1.2;
          letter.style.animationDelay = `${delay}s`;
          letter.classList.add("animate-snap");
        });
      }, 2500); // Display text for 2.5 seconds before snapping
    }, 150); // Wait for fade-in to complete
  }

  triggerSnapAnimation();
  cycleInterval = setInterval(triggerSnapAnimation, 5000); // Full cycle: 0.15s fade-in + 2.5s display + 1.5s snap + ~1s buffer

  return true;
}

function initializeSnapText() {
  const snapTextElements = document.querySelectorAll(".snap-text");

  if (!snapTextElements.length) {
    console.error('Element with class "snap-text" not found.');
    return;
  }

  snapTextElements.forEach((element) => applySnapText(element));
}