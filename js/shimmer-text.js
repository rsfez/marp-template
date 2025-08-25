/* Shimmer text animation */
function applyShimmerText(element) {
  if (!element) {
    console.error("Element not provided for shimmer text effect.");
    return false;
  }

  // Clone the element to test color without shimmer effect
  const clone = element.cloneNode(true);
  clone.classList.remove('shimmer-text');
  clone.style.visibility = 'hidden';
  clone.style.position = 'absolute';
  
  // Insert clone temporarily to get computed styles
  element.parentNode.insertBefore(clone, element);
  
  // Check if there's a child element (like <strong>) to get color from
  let targetElement = clone;
  const childElements = clone.querySelectorAll('*');
  if (childElements.length > 0) {
    targetElement = childElements[0]; // Get first child element (e.g., <strong>)
  }
  
  // Get the computed color
  const computedStyle = window.getComputedStyle(targetElement);
  const originalColor = computedStyle.color;
  
  // Remove the clone
  clone.remove();
  
  // Set the color as a CSS variable on the element
  element.style.setProperty('--text-color', originalColor);
  
  return true;
}

function initializeShimmerText() {
  const shimmerTextElements = document.querySelectorAll(".shimmer-text");

  if (!shimmerTextElements.length) {
    console.error('Element with class "shimmer-text" not found.');
    return;
  }

  shimmerTextElements.forEach((element) => applyShimmerText(element));
}