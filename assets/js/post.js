const els = {
    html: document.documentElement,
    postArticle: document.querySelector("#postArticle")
};

function getTypeColor(type) {
    const colors = {
        manifiesto:    '#000000',
        investigacion: '#C73A4A',
        analisis:      '#B78627',
        cronica:       '#6D7C50',
        reflexion:     '#248692',
        memoria:       '#7D5AA1',
        columna:       '#FFFFFF'
    };
    return colors[type] ?? '#ffffff';
}

boot();

async function boot() {
    bindAccent(); 
    bindTelemetry(); // Inicializa el dock inferior en posts

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

async function fetchJson(url) {
    const response = await fetch(url, { cache: "no-cache" });
    if (!response.ok) throw new Error(`${url} failed with HTTP ${response.status}`);
    return response.json();
}

function renderPost(post) {
    document.title = `${post.title} | Plaza Comun beta 001`;
    els.postArticle.innerHTML = `
        <p class="eyebrow">${escapeHtml(post.axisLabel)} // ${escapeHtml(post.publishedLabel)}</p>
        <span class="type-tag" style="background:${getTypeColor(post.postType)}; color:${post.postType === 'columna' || post.postType === 'analisis' ? '#000000' : '#ffffff'}">${escapeHtml(post.postType)}</span>
        <h1>${escapeHtml(post.title)}</h1>
        <p class="briefing-dek">${escapeHtml(post.dek)}</p>
        <div class="briefing-meta">
            <span>${escapeHtml(post.territory)}</span>
            <span>${escapeHtml(post.readingTime)}</span>
            <span>${escapeHtml(post.methodLabel)}</span>
        </div>
        ${post.sections.map(renderSection).join("")}
        ${renderBibliography(post)}
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

/* --- CONTROL DE ACENTOS CROMÁTICOS --- */
function setAccent(accent) {
    document.documentElement.dataset.accent = accent;
    localStorage.setItem("plaza-acento", accent);
    document.querySelectorAll(".accent-dot").forEach(btn => {
        btn.classList.toggle("is-active", btn.dataset.accent === accent);
    });
}

function bindAccent() {
    // CAMBIO: Inicialización por defecto mutada de "sangre" a "blanco"
    const saved = localStorage.getItem("plaza-acento") ?? "blanco";
    setAccent(saved);
    document.querySelectorAll(".accent-dot").forEach(btn => {
        btn.addEventListener("click", (e) => {
            e.stopPropagation();
            setAccent(btn.dataset.accent);
        });
    });
}

/* --- MANEJO DE TELEMETRÍA DEL SISTEMA (DOCK INFERIOR) --- */
function bindTelemetry() {
    const toggle = document.getElementById("settingsToggle");
    const submenu = document.getElementById("colorSubmenu");

    if (toggle && submenu) {
        toggle.addEventListener("click", e => {
            e.stopPropagation();
            const isOpen = submenu.getAttribute("data-state") === "open";
            submenu.setAttribute("data-state", isOpen ? "closed" : "open");
        });

        document.addEventListener("click", e => {
            if (!e.target.closest(".settings-root")) {
                submenu.setAttribute("data-state", "closed");
            }
        });
    }
}

/* ==========================================================================
   CONTROL DE NAVEGACIÓN RESPONSIVE MÓVIL (SINCRO POST)
   ========================================================================== */
document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.getElementById('menuToggle');
    const mainNav = document.getElementById('mainNav');

    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', () => {
            const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
            menuToggle.setAttribute('aria-expanded', !isExpanded);
            mainNav.classList.toggle('is-open');
            
            if (!isExpanded) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });

        mainNav.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.setAttribute('aria-expanded', 'false');
                mainNav.classList.remove('is-open');
                document.body.style.overflow = '';
            });
        });
    }
});