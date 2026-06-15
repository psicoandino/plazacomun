const els = {
    html: document.documentElement,
    themeToggle: document.querySelector("#themeToggle"),
    themeIcon: document.querySelector("#themeIcon"),
    postsGrid: document.querySelector("#postsGrid"),
    emptyState: document.querySelector("#emptyState")
};

boot();

async function boot() {
    bindTheme();

    try {
        const index = await fetchJson("data/posts-index.json");
        renderPosts(index.posts ?? []);
    } catch (error) {
        renderError(error);
    }
}

function bindTheme() {
    const savedTheme = localStorage.getItem("plaza-beta-theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    setTheme(savedTheme ?? (prefersDark ? "dark" : "light"));
    els.themeToggle.addEventListener("click", () => {
        setTheme(els.html.dataset.theme === "dark" ? "light" : "dark");
    });
}

function setTheme(theme) {
    els.html.dataset.theme = theme;
    localStorage.setItem("plaza-beta-theme", theme);
    els.themeIcon.textContent = theme === "dark" ? "☾" : "☼";
}

async function fetchJson(url) {
    const response = await fetch(url, { cache: "no-cache" });
    if (!response.ok) throw new Error(`${url} failed with HTTP ${response.status}`);
    return response.json();
}

function renderPosts(posts) {
    els.emptyState.hidden = posts.length > 0;
    els.postsGrid.replaceChildren(...posts.map((post) => {
        const card = document.createElement("article");
        card.className = "briefing-card";
        card.innerHTML = `
            <p class="card-axis">${escapeHtml(post.axisLabel)}</p>
            <h3><a href="${escapeHtml(post.url)}">${escapeHtml(post.title)}</a></h3>
            <p>${escapeHtml(post.dek)}</p>
            <div class="card-meta">
                <span>${escapeHtml(post.publishedLabel)}</span>
                <span>${escapeHtml(post.territory)}</span>
            </div>
        `;
        return card;
    }));
}

function renderError(error) {
    console.error(error);
    els.postsGrid.innerHTML = "";
    els.emptyState.hidden = false;
    els.emptyState.textContent = "No se pudo cargar el indice de posts.";
}

function escapeHtml(value) {
    return String(value ?? "")
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}
