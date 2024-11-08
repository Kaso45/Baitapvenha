function validateInput() {
  const input = window.prompt("Enter your text (max 50 characters):");
  
  if (input.length > 50) {
    alert("Input exceeds the maximum length of 50 characters.");
    return false;
  }
  
  alert("Input is valid.");
  return true;
}

validateInput();
