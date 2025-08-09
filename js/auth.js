const backendUrl = "http://localhost:8080/api/auth";

document.getElementById("loginForm")?.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const res = await fetch(`${backendUrl}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
    });

    const data = await res.json();
    if (res.ok) {
        localStorage.setItem("user", JSON.stringify(data));
        if (data.role === "CLIENT") {
            window.location.href = "../client-dashboard.html";
        } else {
            window.location.href = "../freelancer-dashboard.html";
        }
    } else {
        alert(data.message || "Login failed");
    }
});

document.getElementById("registerForm")?.addEventListener("submit", async (e) => {
    e.preventDefault();
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const role = document.getElementById("role").value;

    const res = await fetch(`${backendUrl}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, role })
    });

    const data = await res.json();
    if (res.ok) {
        alert("Registration successful!");
        window.location.href = "login.html";
    } else {
        alert(data.message || "Registration failed");
    }
});
