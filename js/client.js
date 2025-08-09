const backendUrl = "http://localhost:8080/api";
const user = JSON.parse(localStorage.getItem("user"));

async function loadGigs() {
    const res = await fetch(`${backendUrl}/gigs/${user.id}`);
    const gigs = await res.json();
    const list = document.getElementById("gigList");
    list.innerHTML = gigs.map(g => `<p>${g.title} - $${g.price}</p>`).join("");
}

document.getElementById("postGigForm")?.addEventListener("submit", async (e) => {
    e.preventDefault();
    const title = document.getElementById("gigTitle").value;
    const description = document.getElementById("gigDesc").value;
    const budget = document.getElementById("gigPrice").value;

    await fetch(`${backendUrl}/projects`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description, budget, postedRole: "CLIENT", client_id: user.id, })
    });

    loadGigs();
});

document.getElementById("logoutBtn").addEventListener("click", () => {
    localStorage.removeItem("user");
    window.location.href = "../../index.html";
});

loadGigs();
