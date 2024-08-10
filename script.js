// User credentials and initial balances with money entries
const users = {
  Patrick: {
    username: "Patrick",
    password: "12213443",
    balance: 0,
    moneyEntries: ["Withdrawal: 0$"],
  },
  user2: {
    username: "",
    password: "password2",
    balance: 2500,
    moneyEntries: ["Initial deposit: $2500"],
  },
};

document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("login-form");
  const errorMessage = document.getElementById("error-message");

  if (loginForm) {
    loginForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const username = document.getElementById("username").value;
      const password = document.getElementById("password").value;

      if (users[username] && users[username].password === password) {
        // Store user in session storage
        sessionStorage.setItem("currentUser", username);
        // Redirect to account page
        window.location.href = "account.html";
      } else {
        errorMessage.textContent = "Invalid username or password";
      }
    });
  }

  // Account page logic
  const accountPage = document.querySelector(".account-container");
  if (accountPage) {
    const currentUser = sessionStorage.getItem("currentUser");

    if (currentUser && users[currentUser]) {
      const userNameElement = document.getElementById("user-name");
      const balanceElement = document.getElementById("balance");
      const entriesElement = document.getElementById("entries");

      userNameElement.textContent = currentUser;
      balanceElement.textContent = users[currentUser].balance;

      // Display money entries
      entriesElement.innerHTML = users[currentUser].moneyEntries
        .map((entry) => `<li>${entry}</li>`)
        .join("");

      // Handle deposit and withdrawal
      const depositButton = document.getElementById("deposit");
      const withdrawButton = document.getElementById("withdraw");

      if (depositButton && withdrawButton) {
        depositButton.addEventListener("click", () => {
          const amount = parseFloat(prompt("Enter amount to deposit:"));
          if (!isNaN(amount) && amount > 0) {
            users[currentUser].balance += amount;
            users[currentUser].moneyEntries.push(`Deposited: $${amount}`);
            balanceElement.textContent = users[currentUser].balance;
            entriesElement.innerHTML = users[currentUser].moneyEntries
              .map((entry) => `<li>${entry}</li>`)
              .join("");
            alert(`$${amount} deposited successfully!`);
          } else {
            alert("Invalid deposit amount.");
          }
        });

        withdrawButton.addEventListener("click", () => {
          const amount = parseFloat(prompt("Enter amount to withdraw:"));
          if (
            !isNaN(amount) &&
            amount > 0 &&
            amount <= users[currentUser].balance
          ) {
            users[currentUser].balance -= amount;
            users[currentUser].moneyEntries.push(`Withdrew: $${amount}`);
            balanceElement.textContent = users[currentUser].balance;
            entriesElement.innerHTML = users[currentUser].moneyEntries
              .map((entry) => `<li>${entry}</li>`)
              .join("");
            alert(`$${amount} withdrawn successfully!`);
          } else if (amount > users[currentUser].balance) {
            alert("Insufficient funds.");
          } else {
            alert("Invalid withdrawal amount.");
          }
        });
      }

      // Logout functionality
      document.getElementById("logout").addEventListener("click", () => {
        sessionStorage.removeItem("currentUser");
        window.location.href = "index.html";
      });
    } else {
      // Redirect to login page if not logged in
      window.location.href = "index.html";
    }
  }
});
