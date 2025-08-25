/* Wavy text animation */
function applyWavyText(element) {
  if (!element) {
    console.error("Element not provided for wavy text effect.");
    return false;
  }

  // Get the full HTML content as a string
  const originalHTML = element.innerHTML;
  const parentClasses = Array.from(element.classList).join(" ");
  
  // Create a temporary element to parse the HTML
  const temp = document.createElement('div');
  temp.innerHTML = originalHTML;
  
  // Extract just the text content to split into characters
  const fullText = temp.textContent || temp.innerText || '';
  
  // Track which characters should be wrapped in which tags
  let charMap = [];
  let charIndex = 0;
  
  function mapNode(node, currentTag = null) {
    if (node.nodeType === Node.TEXT_NODE) {
      for (const char of node.textContent) {
        charMap.push({ char, tag: currentTag });
      }
    } else if (node.nodeType === Node.ELEMENT_NODE) {
      const tag = node.tagName.toLowerCase();
      for (const child of node.childNodes) {
        mapNode(child, tag);
      }
    }
  }
  
  // Build the character map
  for (const node of temp.childNodes) {
    mapNode(node);
  }
  
  // Now build the new HTML with proper spacing
  let newHTML = '';
  let visualIndex = 0;
  
  for (let i = 0; i < charMap.length; i++) {
    const { char, tag } = charMap[i];
    
    if (char === ' ') {
      // Preserve spaces as-is
      newHTML += '&nbsp;';
    } else if (char.trim() === '') {
      // Skip other whitespace
      continue;
    } else {
      // Wrap visible characters
      const content = tag ? `<${tag}>${char}</${tag}>` : char;
      newHTML += `<span class="${parentClasses}" style="--i: ${visualIndex}">${content}</span>`;
      visualIndex++;
    }
  }
  
  element.innerHTML = newHTML;
  return true;
}

function initializeWavyText() {
  const wavyTextElements = document.querySelectorAll(".wavy-text");

  if (!wavyTextElements.length) {
    console.error('Element with class "wavy-text" not found.');
    return;
  }

  wavyTextElements.forEach((element) => applyWavyText(element));
}