const els = {
    html: document.documentElement,
    themeToggle: document.querySelector("#themeToggle"),
    themeIcon: document.querySelector("#themeIcon"),
    postArticle: document.querySelector("#postArticle")
};

boot();

async function boot() {
    bindTheme();

    const id = new URLSearchParams(window.location.search).get("id");
    if (!id || !/^\d{4}_\d{2}_\d{2}_[a-z0-9-]+$/.test(id)) {
        renderMissingPost();
        return;
    }

    try {
        const post = await fetchJson(`content/posts/${id}.json`);
        renderPost(post);
    } catch (error) {
        renderLoadError(error);
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

function renderPost(post) {
    document.title = `${post.title} | Plaza Comun beta 001`;
    els.postArticle.innerHTML = `
        <p class="eyebrow">${escapeHtml(post.axisLabel)} // ${escapeHtml(post.publishedLabel)}</p>
        <h1>${escapeHtml(post.title)}</h1>
        <p class="briefing-dek">${escapeHtml(post.dek)}</p>
        <div class="briefing-meta">
            <span>${escapeHtml(post.territory)}</span>
            <span>${escapeHtml(post.readingTime)}</span>
            <span>${escapeHtml(post.methodLabel)}</span>
        </div>
        ${post.sections.map(renderSection).join("")}
        ${renderBibliography(post)}
        ${renderFutureSlots(post)}
    `;
}

function renderSection(section) {
    return `
        <section class="reader-block">
            <h3>${escapeHtml(section.heading)}</h3>
            <p>${escapeHtml(section.body)}</p>
        </section>
    `;
}

function renderFutureSlots(post) {
    return `
        <section class="reader-block">
            <h3>Espacio futuro</h3>
            <p>Este post ya tiene identificador estable: ${escapeHtml(post.id)}. Mas adelante puede conectar comentarios, reacciones, fuentes o actualizaciones sin cambiar su URL compartible.</p>
        </section>
    `;
}

function renderMissingPost() {
    els.postArticle.innerHTML = `
        <p class="eyebrow">Post no encontrado</p>
        <h1>Falta el identificador del post</h1>
        <p>Usa una URL como <code>post.html?id=2026_05_08_salud-mental-liceos</code>.</p>
    `;
}

function renderLoadError(error) {
    console.error(error);
    els.postArticle.innerHTML = `
        <p class="eyebrow">Error de carga</p>
        <h1>No se pudo abrir este post</h1>
        <p>Revisa que el archivo exista en <code>content/posts</code> y que el sitio se sirva por HTTP.</p>
    `;
}

function escapeHtml(value) {
    return String(value ?? "")
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}

function renderBibliography(post) {
    if (!post.bibliography || post.bibliography.length === 0) return "";

    return `
        <section class="reader-block bibliography-section">
            <h3>Fuentes y Bibliografía</h3>
            <ul class="bibliography-list" style="list-style: none; padding: 0; margin: 0;">
                ${post.bibliography.map(src => `
                    <li style="margin-bottom: 12px; line-height: 1.5;">
                        <span style="font-family: monospace; font-weight: bold; margin-right: 6px;">[${escapeHtml(src.sourceId)}]</span>
                        <a href="${escapeHtml(src.url)}" target="_blank" rel="noopener noreferrer" class="source-link" style="text-decoration: underline;">
                            ${escapeHtml(src.title)}
                        </a> 
                        <span style="opacity: 0.7;">— ${escapeHtml(src.publisher)}</span>
                        ${src.usedFor && src.usedFor.length > 0 ? `
                            <small style="display: block; opacity: 0.6; margin-top: 2px; padding-left: 42px;">
                                ➔ ${escapeHtml(src.usedFor.join(". "))}
                            </small>
                        ` : ""}
                    </li>
                `).join("")}
            </ul>
        </section>
    `;
}