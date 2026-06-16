const els = {
    html: document.documentElement,
    postsGrid: document.querySelector("#postsGrid"),
    emptyState: document.querySelector("#emptyState")
};

boot();

async function boot() {
    bindAccent(); 
    bindTelemetry(); // Inicializa el dock inferior de forma nativa

    try {
        const index = await fetchJson("data/posts-index.json");
        renderPosts(index.posts ?? []);
    } catch (error) {
        renderError(error);
    }
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

/* --- CONTROL DE ACENTOS CROMÁTICOS --- */
function setAccent(accent) {
    document.documentElement.dataset.accent = accent;
    localStorage.setItem("plaza-acento", accent);
    document.querySelectorAll(".accent-dot").forEach(btn => {
        btn.classList.toggle("is-active", btn.dataset.accent === accent);
    });
}

function bindAccent() {
    const saved = localStorage.getItem("plaza-acento") ?? "sangre";
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

        // Cierre orgánico al hacer clic en el vacío de la interfaz
        document.addEventListener("click", e => {
            if (!e.target.closest(".settings-root")) {
                submenu.setAttribute("data-state", "closed");
            }
        });
    }
}

/* --- NAVEGACIÓN MÓVIL (MENÚ EN X PERFECCIONADO) --- */
document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.getElementById('menuToggle');
    const mainNav = document.getElementById('mainNav');

    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', () => {
            const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
            menuToggle.setAttribute('aria-expanded', !isExpanded);
            mainNav.classList.toggle('is-open');
            document.body.style.overflow = !isExpanded ? 'hidden' : '';
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

/* ==========================================================================
   SISTEMA DE PERSISTENCIA Y SOBERANÍA DE DATOS (PLAZA COMÚN)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    initPortalGate();
    initTelemetryControl();
});

// 1. GESTIÓN DEL MODAL DE BIENVENIDA (UNA SOLA VEZ)
function initPortalGate() {
    const portal = document.getElementById('portalGate');
    const acceptBtn = document.getElementById('acceptManifesto');
    if (!portal) return;

    // Verificar si ya existe el bit de confirmación en el almacenamiento local
    const manifestoLeido = localStorage.getItem('plaza-manifesto-leido') === 'true';

    if (!manifestoLeido) {
        // Ejecución en modo modal estricto por hardware
        portal.showModal();
    }

    // Al hacer clic en el botón de salida/aceptar
    acceptBtn.addEventListener('click', () => {
        localStorage.setItem('plaza-manifesto-leido', 'true');
        portal.close();
    });
}

// 2. GESTIÓN DEL PANEL DE TELEMETRÍA (CONFIGURACIÓN GUARDADA)
function initTelemetryControl() {
    const telemetrySection = document.getElementById('telemetrySection');
    const toggleBtn = document.getElementById('toggleTelemetryBtn');
    const checkboxes = document.querySelectorAll('.telemetry-selector input[type="checkbox"]');

    if (!telemetrySection || !toggleBtn) return;

    // A. RESTAURAR ESTADO DE LA SECCIÓN MONOLÍTICA
    const isCollapsed = localStorage.getItem('plaza-telemetria-colapsada') === 'true';
    if (isCollapsed) {
        telemetrySection.classList.add('is-collapsed');
        toggleBtn.querySelector('.tab-text').textContent = 'MOSTRAR TELEMETRÍA';
    }

    // Escuchador del click en la lengüeta axial
    toggleBtn.addEventListener('click', () => {
        const currentlyCollapsed = telemetrySection.classList.toggle('is-collapsed');
        localStorage.setItem('plaza-telemetria-colapsada', currentlyCollapsed);
        
        // Mutación sutil de la etiqueta de texto
        toggleBtn.querySelector('.tab-text').textContent = currentlyCollapsed ? 'MOSTRAR TELEMETRÍA' : 'TELEMETRÍA';
    });

    // B. RESTAURAR PREFERENCIAS DE TARJETAS INDIVIDUALES
    checkboxes.forEach(chk => {
        const metricId = chk.dataset.metric;
        const card = document.getElementById(`card-${metricId}`);
        const isVisible = localStorage.getItem(`metric-${metricId}`) !== 'false';
        
        chk.checked = isVisible;
        if (!isVisible && card) card.style.display = 'none';

        chk.addEventListener('change', () => {
            localStorage.setItem(`metric-${metricId}`, chk.checked);
            if (card) card.style.display = chk.checked ? '' : 'none';
        });
    });
}