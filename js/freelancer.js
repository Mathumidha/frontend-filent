const backendUrl = "http://localhost:8080/api";

async function loadGigs() {
    const res = await fetch(`${backendUrl}/projects`);
    const gigs = await res.json();
    const list = document.getElementById("gigList");
    list.innerHTML = gigs.map(g => `<p>${g.title} - $${g.price}</p>`).join("");
}

document.getElementById("logoutBtn").addEventListener("click", () => {
    localStorage.removeItem("user");
    window.location.href = "../../index.html";
});

loadGigs();
