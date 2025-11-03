/* ========== Base / Layout ==========
   A clean, modern look with good spacing and readable type.
*/
:root{
  --bg: #0b1220;
  --panel: #111a2e;
  --ink: #e9eefc;
  --muted: #a9b4d0;
  --accent: #5ea0ff;
  --accent-2: #7bd3ff;
  --ring: rgba(94,160,255,.35);
}

*{ box-sizing: border-box; }
html,body{ height:100%; }
body{
  margin:0;
  font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, "Helvetica Neue", Arial, "Noto Sans", "Liberation Sans", sans-serif;
  color: var(--ink);
  background: radial-gradient(1200px 600px at 70% -10%, #16254b 0%, var(--bg) 55%) fixed;
  line-height: 1.55;
}

.container{
  width:min(1100px, 92vw);
  margin: 28px auto 64px;
}

.page-title{
  font-size: clamp(1.6rem, 2.4vw, 2.2rem);
  margin: 18px 0 6px;
}
.lede{ color: var(--muted); max-width: 70ch; }

/* ========== Header & Nav ========== */
.site-header{
  position: sticky; top:0; z-index: 50;
  background: color-mix(in oklab, var(--panel) 86%, black 14%);
  border-bottom: 1px solid #1e2b47;
  backdrop-filter: blur(6px);
}
.site-header .brand{
  font-weight: 700; letter-spacing:.3px; padding: 14px 0 4px;
  width:min(1100px, 92vw); margin:0 auto; color:#fff;
}
.site-nav{
  width:min(1100px, 92vw); margin: 0 auto 10px;
  display:flex; flex-wrap: wrap; gap:10px;
}
.site-nav a{
  color: var(--muted); text-decoration:none; padding:8px 12px; border-radius: 10px;
  transition: .2s ease;
}
.site-nav a:hover{ color:#fff; background: #16254b; }
.site-nav a.active{ color:#fff; background: linear-gradient(90deg, #213667, #1a2b53); }

/* ========== Figures (images + captions) ========== */
figure{ margin: 22px 0; }
figure img{
  max-width:100%; height:auto; display:block;
  border-radius: 12px; border:1px solid #1f2d4d;
  cursor: zoom-in; box-shadow: 0 10px 30px rgba(0,0,0,.35);
}
figcaption{
  color: var(--muted);
  font-size: .95rem;
  margin-top: 8px;
  text-wrap: balance;
}

/* ========== Lightbox (click to enlarge) ========== */
.lightbox{
  position: fixed; inset:0; display:none; place-items:center;
  background: rgba(5,8,16,.82); z-index: 1000; padding: 24px;
}
.lightbox.open{ display:grid; animation: fadeIn .18s ease-out; }
.lightbox img{
  max-width: min(1200px, 92vw);
  max-height: 84vh;
  border-radius: 14px; border:1px solid #293a66;
  box-shadow: 0 12px 38px rgba(0,0,0,.55);
}
.lightbox .lb-caption{
  margin-top: 10px; color:#dfe7ff; font-size: .98rem; text-align:center;
}
.lightbox .lb-close{
  position:absolute; top:14px; right:16px; border:0; border-radius:10px;
  background:#1b2a4d; color:#fff; padding:8px 10px; cursor:pointer;
  box-shadow: 0 0 0 2px var(--ring);
}
@keyframes fadeIn{ from{opacity:0} to{opacity:1} }

/* ========== Timeline ========== */
.timeline-wrap{
  margin-top: 24px;
  background: color-mix(in oklab, var(--panel) 90%, black 10%);
  border: 1px solid #1f2d4d;
  border-radius: 16px;
  padding: 18px 10px;
}

.timeline-track{
  display:flex; gap:14px; padding: 6px 8px 12px;
  overflow-x: auto; overscroll-behavior-x: contain;
  scroll-snap-type: x mandatory;
}
.tl-item{
  min-width: clamp(240px, 38vw, 320px);
  scroll-snap-align: start;
  background: #0f1830;
  border: 1px solid #22325a;
  border-radius: 16px;
  padding: 16px 14px;
  box-shadow: 0 10px 22px rgba(0,0,0,.28);
  opacity:.88; transform: translateY(6px);
  transition: .25s ease;
}
.tl-item:hover{ opacity:1; transform: translateY(0); box-shadow: 0 14px 28px rgba(0,0,0,.36); }
.tl-year{
  margin: 0 0 6px;
  font-size: 1.1rem;
  color: color-mix(in oklab, var(--accent) 60%, white 20%);
}
.tl-item p{ margin:0; color:var(--ink); }

/* ========== Footer ========== */
.site-footer{
  border-top: 1px solid #1e2b47;
  background: #0d162b;
  margin-top: 48px;
  padding: 22px;
  text-align:center;
  color: var(--muted);
}

/* Small utilities */
.source-note{ color: var(--muted); font-size:.95rem; margin-top:14px; }
a{ color: var(--accent-2); }
a:hover{ color:#fff; }
