// --- USER AUTHENTICATION SCRIPT ---

// ===== Signup =====
function signup() {
  const username = document.getElementById("signupUsername").value.trim();
  const password = document.getElementById("signupPassword").value.trim();

  if (!username || !password) {
    alert("Please fill in both fields");
    return;
  }

  if (localStorage.getItem(username)) {
    alert("Username already exists. Please login.");
    window.location.href = "login.html";
    return;
  }

  localStorage.setItem(username, password);
  alert("Account created successfully!");
  window.location.href = "login.html";
}

// ===== Login =====
function login() {
  const username = document.getElementById("loginUsername").value.trim();
  const password = document.getElementById("loginPassword").value.trim();
  const storedPassword = localStorage.getItem(username);

  if (storedPassword === password) {
    localStorage.setItem("loggedInUser", username);

    // Check if there's a stored redirect URL
    const redirectUrl = localStorage.getItem('redirectUrl');

    if (redirectUrl) {
      // If there is, remove it from storage to avoid old redirects
      localStorage.removeItem('redirectUrl');
      // And send the user back to where they were
      window.location.href = redirectUrl;
    } else {
      // Otherwise, send them to the homepage as a default
      window.location.href = "index.html";
    }
  } else {
    alert("Invalid username or password!");
  }
}

// ===== Logout =====
function logout() {
  localStorage.removeItem("loggedInUser");
  // Reload the page to update the navbar button from "Logout" back to "Login"
  window.location.reload();
}

// ===== Navbar Update (Runs on every page load) =====
window.addEventListener("DOMContentLoaded", () => {
  const user = localStorage.getItem("loggedInUser");
  
  // Find the button in the navbar
  const authButton = document.getElementById('dynamic-auth-button');

  if (authButton) {
    if (user) {
      // If user is logged in, change button to "Logout"
      authButton.textContent = 'Logout';
      authButton.href = '#'; 
      authButton.onclick = logout; 
    } else {
      // If user is logged out, make it a smart "Login" button
      authButton.textContent = 'Login';
      authButton.href = 'login.html'; // Fallback for browsers with JS disabled
      
      authButton.onclick = function(event) {
        // Prevent the link from navigating immediately
        event.preventDefault(); 
        
        // Remember the current page before going to login
        localStorage.setItem('redirectUrl', window.location.href); 
        
        // Now, go to the login page
        window.location.href = 'login.html'; 
      };
    }
  }
});