function getAccounts() {
  return JSON.parse(localStorage.getItem("accounts") || "[]");
}

function registerUser(username, password, confirm) {
  username = username.trim();
  if (!username || !password) return "Lagyan ang lahat ng fields.";
  if (password.length < 4) return "Dapat 4 characters pataas ang password.";
  if (password !== confirm) return "Hindi magkapareho ang password.";

  const accounts = getAccounts();
  const exists = accounts.some(a => a.username.toLowerCase() === username.toLowerCase());
  if (exists) return "May gumagamit na ng username na yan.";

  accounts.push({ username, password });
  localStorage.setItem("accounts", JSON.stringify(accounts));
  return "";
}

function loginUser(username, password) {
  username = username.trim();
  const acc = getAccounts().find(
    a => a.username.toLowerCase() === username.toLowerCase() && a.password === password
  );
  if (!acc) return false;
  sessionStorage.setItem("currentUser", acc.username);
  return true;
}

function currentUser() {
  return sessionStorage.getItem("currentUser");
}

// ilagay sa taas ng protected pages
function requireLogin() {
  if (!currentUser()) {
    window.location.href = "login.html";
  }
}

function logout() {
  sessionStorage.clear();
  window.location.href = "login.html";
}
