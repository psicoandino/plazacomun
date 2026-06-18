const els = {
    html: document.documentElement,
    postsGrid: document.querySelector("#postsGrid"),
    emptyState: document.querySelector("#emptyState")
};

let cachedPosts = [];

function getTypeColor(type) {
    return 'var(--acento)';
}

document.addEventListener('DOMContentLoaded', () => boot());

async function boot() {
    bindAccent(); 
    bindTelemetry();

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

function renderCardHTML(post, isHero = false) {
    const typeColor = getTypeColor(post.postType);
    const textColor = (post.postType === 'columna' || post.postType === 'manifiesto')
        ? '#000000' : '#ffffff';
    const titleTag = isHero ? 'h2' : 'h3';
    const dek = isHero
        ? `<p class="briefing-dek">${escapeHtml(post.dek)}</p>`
        : '';
    return `
        <span class="type-tag" style="background:${typeColor};color:${textColor}">${escapeHtml(post.postType)}</span>
        <${titleTag}><a href="${escapeHtml(post.url)}">${escapeHtml(post.title)}</a></${titleTag}>
        ${dek}
        <div class="card-meta">
            <span>${escapeHtml(post.axisLabel)}</span>
            <span>${escapeHtml(post.territory)}</span>
        </div>
    `;
}

function renderPosts(posts) {
    cachedPosts = posts;
    const hero = document.getElementById('homeHero');
    const row  = document.getElementById('homeRow');

    els.emptyState.hidden = posts.length > 0;

    if (hero && posts[0]) {
        const card = document.createElement('article');
        card.className = 'briefing-card briefing-card--hero';
        card.innerHTML = renderCardHTML(posts[0], true);
        hero.replaceChildren(card);
    }

    if (row) {
        row.replaceChildren(...posts.slice(1, 3).map(post => {
            const card = document.createElement('article');
            card.className = 'briefing-card briefing-card--small';
            card.innerHTML = renderCardHTML(post, false);
            return card;
        }));
    }

    els.postsGrid.replaceChildren(...posts.map(post => {
        const card = document.createElement('article');
        card.className = 'briefing-card';
        card.innerHTML = renderCardHTML(post, false);
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
    const saved = localStorage.getItem("plaza-acento") ?? "blanco";
    setAccent(saved);
    document.querySelectorAll(".accent-dot").forEach(btn => {
        btn.addEventListener("click", (e) => {
            e.stopPropagation();
            setAccent(btn.dataset.accent);
        });
    });
}

/* --- MANEJO DE ENTORNO REACCIONARIO MÓVIL --- */
function bindTelemetry() {
    const menuToggle = document.getElementById('menuToggle');
    const mainNav    = document.getElementById('mainNav');
 
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
 
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('is-active'));
            link.classList.add('is-active');
        });
    });
}

/* ==========================================================================
   SISTEMA DE PERSISTENCIA Y SOBERANÍA DE DATOS (PLAZA COMÚN)
   ========================================================================== */
document.addEventListener('DOMContentLoaded', () => {
    initPortalGate();
});

function initPortalGate() {
    const portal = document.getElementById('portalGate');
    const acceptBtn = document.getElementById('acceptManifesto');
    if (!portal || !acceptBtn) return;

    const manifestoLeido = localStorage.getItem('plaza-manifesto-leido') === 'true';

    if (!manifestoLeido) {
        portal.showModal();
    }

    portal.addEventListener('cancel', (e) => {
        e.preventDefault();
    });

    acceptBtn.addEventListener('click', () => {
        localStorage.setItem('plaza-manifesto-leido', 'true');
        portal.close();
    });
}

/* ==========================================================================
   CONTROLADOR DE ESTADOS DEL PORTAL SECUENCIAL (ONBOARDING SLIDER)
   ========================================================================== */
document.addEventListener('DOMContentLoaded', () => {
    const portal = document.getElementById('portalGate');
    const prevBtn = document.getElementById('prevStep');
    const nextBtn = document.getElementById('nextStep');
    const executeBtn = document.getElementById('acceptManifesto');
    const progressIndicator = document.querySelector('.progress-indicator');

    if (!portal || !nextBtn || !prevBtn || !executeBtn) return;

    let currentStep = 1;
    const totalSteps = 3;

    function updatePortalState() {
        portal.setAttribute('data-current-step', currentStep);

        if (progressIndicator) {
            const progressPercentage = (currentStep / totalSteps) * 100;
            progressIndicator.style.width = `${progressPercentage}%`;
        }

        if (currentStep === 1) {
            prevBtn.style.visibility = 'hidden';
            nextBtn.style.display = 'block';
            executeBtn.style.display = 'none';
        } else if (currentStep === 2) {
            prevBtn.style.visibility = 'visible';
            nextBtn.style.display = 'block';
            executeBtn.style.display = 'none';
        } else if (currentStep === 3) {
            prevBtn.style.visibility = 'visible';
            nextBtn.style.display = 'none';
            executeBtn.style.display = 'block';
        }
    }

    nextBtn.addEventListener('click', () => {
        if (currentStep < totalSteps) {
            currentStep++;
            updatePortalState();
        }
    });

    prevBtn.addEventListener('click', () => {
        if (currentStep > 1) {
            currentStep--;
            updatePortalState();
        }
    });

    updatePortalState();
});

/* ==========================================================================
   SISTEMA DE CONTROL DE APERTURA Y CIERRE DE CONFIGURACIÓN (UNIFICADO)
   ========================================================================== */
const navConfig = document.getElementById('navConfig');
const closeConfigBtn = document.getElementById('closeConfigBtn');
const desktopConfigBtn = document.getElementById('desktopConfigBtn');

function openConfigPanel() {
    if (!navConfig) return;

    if (window.innerWidth > 920 && desktopConfigBtn) {
        const buttonRect = desktopConfigBtn.getBoundingClientRect();
        
        const buttonCenterX = buttonRect.left + (buttonRect.width / 2);
        const buttonCenterY = buttonRect.top + (buttonRect.height / 2);

        const xOffsetFromRight = 36; 
        const targetLeft = buttonCenterX - (420 - xOffsetFromRight);
        
        const xOffsetFromTop = 36;
        const targetTop = buttonCenterY - xOffsetFromTop;

        navConfig.style.left = `${targetLeft}px`;
        navConfig.style.top = `${targetTop}px`;
    } else {
        navConfig.style.left = '';
        navConfig.style.top = '';
    }

    navConfig.classList.add('is-open');
    if (desktopConfigBtn) {
        desktopConfigBtn.setAttribute('aria-expanded', 'true');
    }
}

function closeConfigPanel() {
    if (!navConfig) return;
    navConfig.classList.remove('is-open');
    if (desktopConfigBtn) {
        desktopConfigBtn.setAttribute('aria-expanded', 'false');
    }
}

// Interceptación de evento sobre la tuerca editorial
if (desktopConfigBtn) {
    desktopConfigBtn.addEventListener('click', (e) => {
        e.stopPropagation(); 
        if (navConfig && navConfig.classList.contains('is-open')) {
            closeConfigPanel();
        } else {
            openConfigPanel();
        }
    });
}

// Cierre explícito mediante botón de aspa ("X")
if (closeConfigBtn) {
    closeConfigBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        closeConfigPanel();
    });
}

// Cierre universal mediante secuencia física (Escape)
window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navConfig && navConfig.classList.contains('is-open')) {
        closeConfigPanel();
    }
});

// Cierre analizado geométricamente por click reactivo fuera de la interfaz activa
document.addEventListener('click', (e) => {
    if (!navConfig || window.innerWidth <= 920) return;
    
    if (navConfig.classList.contains('is-open')) {
        const isClickOnButton = desktopConfigBtn && desktopConfigBtn.contains(e.target);
        const isClickInsidePanel = navConfig.contains(e.target);
        
        if (!isClickOnButton && !isClickInsidePanel) {
            closeConfigPanel();
        }
    }
});