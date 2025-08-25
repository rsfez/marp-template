/* Shake text animation */
function applyShakeText(element) {
  if (!element) {
    console.error("Element not provided for shake text effect.");
    return false;
  }

  // Shake text doesn't need special processing, 
  // the CSS animation handles everything
  return true;
}

function initializeShakeText() {
  const shakeTextElements = document.querySelectorAll(".shake-text");

  if (!shakeTextElements.length) {
    console.error('Element with class "shake-text" not found.');
    return;
  }

  shakeTextElements.forEach((element) => applyShakeText(element));
}