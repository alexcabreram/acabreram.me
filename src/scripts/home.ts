// Home v2 interactions, ported from the approved prototype (vanilla, no framework).
// Everything degrades to a complete static page: no JS → all content visible.

type State = "on" | "mid" | "off" | "core" | "empty";
interface HomeNode { id: string; name: string; kanji?: string; ring: 0 | 1 | 2 | "g"; dir?: number; st: State; kind: string; d: string }
interface HomeData {
  lang: "es" | "en";
  states: Record<State, string>;
  clock: { inMadrid: string; day: string; night: string; now: string };
  tagline: [string, string];
  swarm: { split: string; join: string };
  menu: { open: string; close: string };
  nodes: HomeNode[];
  log: [string, string][];
  example: string;
  running: string;
  portrait: string;
}

const dataEl = document.getElementById("home-data");
if (dataEl) init(JSON.parse(dataEl.textContent ?? "{}") as HomeData);

function init(D: HomeData) {
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const fine = matchMedia("(hover: hover) and (pointer: fine)").matches;
  const narrow = () => innerWidth < 901;
  const NODES = D.nodes;
  const by = (r: HomeNode["ring"]) => NODES.filter((n) => n.ring === r);
  const $ = <T extends HTMLElement = HTMLElement>(id: string) => document.getElementById(id) as T | null;
  const watch = (el: Element, start: () => void, stop: () => void, threshold = 0) =>
    new IntersectionObserver(([e]) => (e.isIntersecting ? start() : stop()), { threshold }).observe(el);
  const esc = (s: string) => s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]!);

  // ---------- clock, tagline "ahora", menu ----------
  const madrid = () => {
    const now = new Date();
    const f = (o: Intl.DateTimeFormatOptions) => +new Intl.DateTimeFormat("en-GB", { ...o, timeZone: "Europe/Madrid" }).format(now);
    const h = f({ hour: "numeric", hour12: false });
    const m = f({ minute: "numeric" });
    const t = new Intl.DateTimeFormat(D.lang === "es" ? "es-ES" : "en-GB", { hour: "2-digit", minute: "2-digit", timeZone: "Europe/Madrid" }).format(now);
    return { h, m, t, day: h >= 8 && h < 20 };
  };
  const paintTag = () => {
    const c = madrid();
    const now = `<span class="now">${esc(D.clock.now)}</span>`;
    document.querySelectorAll<HTMLElement>(".home .tag").forEach((tag) => {
      (tag.children[0] as HTMLElement).innerHTML = esc(D.tagline[0]) + (c.day ? now : "");
      (tag.children[1] as HTMLElement).innerHTML = esc(D.tagline[1]) + (!c.day ? now : "");
    });
    document.querySelectorAll(".home .clk").forEach((e) => (e.textContent = `${c.t} ${D.clock.inMadrid} · ${c.day ? D.clock.day : D.clock.night}`));
  };
  paintTag();
  setInterval(paintTag, 30000);

  const mb = $("menu-btn");
  const sheet = $("sheet");
  if (mb && sheet) {
    const toggleMenu = (v: boolean) => {
      sheet.classList.toggle("open", v);
      mb.setAttribute("aria-expanded", String(v));
      mb.textContent = v ? D.menu.close : D.menu.open;
    };
    mb.addEventListener("click", () => toggleMenu(!sheet.classList.contains("open")));
    sheet.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => toggleMenu(false)));
    addEventListener("keydown", (e) => { if (e.key === "Escape" && sheet.classList.contains("open")) { toggleMenu(false); mb.focus(); } });
  }

  const paths = document.getElementById("emblem-paths")?.innerHTML ?? "";
  const emblemMask = (w: number, h: number) =>
    new Promise<Uint8ClampedArray | null>((res) => {
      const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="37 225 319 307" width="${w}" height="${h}"><g fill="#fff">${paths}</g></svg>`;
      // data: URL (the CSP allows data: images, not blob:).
      const url = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg);
      const img = new Image();
      img.onload = () => {
        const c = document.createElement("canvas");
        c.width = w; c.height = h;
        const x = c.getContext("2d")!;
        x.drawImage(img, 0, 0, w, h);
        res(x.getImageData(0, 0, w, h).data);
      };
      img.onerror = () => res(null);
      img.src = url;
    });

  // ---------- 1 · day/night split hero ----------
  (() => {
    const f = $("hero");
    const btn = $<HTMLButtonElement>("hb");
    if (!f || !btn) return;
    const c = madrid();
    const mins = c.h * 60 + c.m;
    const base = 50 + 32 * Math.cos(((mins - 14 * 60) / 1440) * 2 * Math.PI);
    let x = base, gx = x, v = 0, raf: number | null = null, touched = false, drag = false;
    const apply = () => {
      f.classList.toggle("vert", narrow());
      btn.setAttribute("aria-orientation", narrow() ? "vertical" : "horizontal");
      f.style.setProperty("--x", x.toFixed(2) + "%");
      btn.setAttribute("aria-valuenow", String(Math.round(x)));
      btn.textContent = x > 50 ? "☀" : "☾";
    };
    const step = () => {
      v = (v + (gx - x) * 0.08) * 0.78;
      x = Math.max(0, Math.min(100, x + v));
      apply();
      raf = Math.abs(gx - x) + Math.abs(v) > 0.02 ? requestAnimationFrame(step) : null;
    };
    const go = (val: number) => {
      gx = Math.max(4, Math.min(96, val));
      if (reduce) { x = gx; apply(); } else if (!raf) raf = requestAnimationFrame(step);
    };
    const pos = (e: PointerEvent) => {
      const r = f.getBoundingClientRect();
      return narrow() ? ((e.clientY - r.top) / r.height) * 100 : ((e.clientX - r.left) / r.width) * 100;
    };
    apply();
    addEventListener("resize", apply);
    // Mobile: night falls as you scroll through the hero.
    addEventListener("scroll", () => {
      if (!narrow() || touched) return;
      const r = f.getBoundingClientRect();
      const p = Math.min(1, Math.max(0, -r.top / (r.height * 0.6)));
      go(Math.max(6, base - p * base));
    }, { passive: true });
    f.addEventListener("pointermove", (e) => { if (fine && !narrow()) go(pos(e)); });
    btn.addEventListener("pointerdown", (e) => { drag = true; touched = true; btn.setPointerCapture(e.pointerId); });
    btn.addEventListener("pointermove", (e) => { if (drag) go(pos(e)); });
    btn.addEventListener("pointerup", () => (drag = false));
    btn.addEventListener("keydown", (e) => {
      const k = ({ ArrowLeft: -5, ArrowUp: -5, ArrowRight: 5, ArrowDown: 5 } as Record<string, number>)[e.key];
      if (k) { touched = true; go(gx + k); e.preventDefault(); }
    });
  })();

  const col = (st: State) => (st === "on" ? "46,204,138" : st === "mid" ? "242,153,74" : st === "core" ? "232,201,106" : "91,115,135");

  // ---------- 2 · swarm: the dragon is its agents ----------
  (() => {
    const f = $("enjambre");
    const cv = $<HTMLCanvasElement>("c-swarm");
    const b = $<HTMLButtonElement>("b-swarm");
    if (!f || !cv || !b) return;
    const ctx = cv.getContext("2d")!;
    const groups = [NODES[0], ...by(1), ...by(2)];
    type P = { x: number; y: number; hx: number; hy: number; gx: number; gy: number; vx: number; vy: number; pearl: boolean; rim: boolean };
    type C = HomeNode & { x: number; y: number };
    let W = 0, H = 0, P: P[] = [], Cs: C[] = [], split = false, run = false, raf = 0, cx = 0, cy = 0, eh = 0, labelA = 0, played = false;
    const dpr = Math.min(2, devicePixelRatio || 1);
    const build = async () => {
      const r = cv.getBoundingClientRect();
      W = r.width; H = r.height;
      cv.width = W * dpr; cv.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const n = narrow();
      eh = n ? Math.min(W * 0.62, H * 0.62) : H * 0.72;
      const ew = (eh * 319) / 307;
      cx = n ? W * 0.5 : W * 0.7;
      cy = n ? H * 0.5 : H * 0.52;
      const stepPx = n ? 3.6 : 3.4;
      const gw = Math.round(ew / stepPx), gh = Math.round(eh / stepPx);
      const m = await emblemMask(gw, gh);
      const pts: [number, number, boolean, boolean][] = [];
      if (m) {
        let x0 = gw, x1 = 0, y0 = gh, y1 = 0;
        for (let j = 0; j < gh; j++) for (let i = 0; i < gw; i++) if (m[(j * gw + i) * 4 + 3] > 140) { x0 = Math.min(x0, i); x1 = Math.max(x1, i); y0 = Math.min(y0, j); y1 = Math.max(y1, j); }
        const mx = (x0 + x1) / 2, my = (y0 + y1) / 2, rad = Math.min(x1 - x0, y1 - y0) / 2;
        for (let j = 0; j < gh; j++) for (let i = 0; i < gw; i++) {
          const a = m[(j * gw + i) * 4 + 3], d = Math.hypot(i - mx, j - my);
          const X = cx - ew / 2 + i * stepPx, Y = cy - eh / 2 + j * stepPx;
          // The pearl sits between the claws at ~18% / 66% of the emblem box.
          if (d < rad * 0.96 && a < 90) pts.push([X, Y, Math.hypot(i / gw - 0.18, j / gh - 0.66) < 0.07, false]);
          else if (d > rad * 0.95 && d < rad * 1.02 && (i + j) % 3 === 0) pts.push([X, Y, false, true]);
        }
      }
      const max = n ? 900 : 1800;
      while (pts.length > max) pts.splice((Math.random() * pts.length) | 0, 1);
      const R1 = eh * (n ? 0.36 : 0.3), R2 = eh * (n ? 0.64 : 0.52), sy = n ? 0.82 : 0.9;
      Cs = groups.map((g) => {
        if (g.ring === 0) return { ...g, x: cx, y: cy };
        const list = by(g.ring), i = list.indexOf(g), cnt = list.length;
        const R = g.ring === 1 ? R1 : R2;
        const a = ((-90 + (i * 360) / cnt + (g.ring === 2 ? 30 : 0)) * Math.PI) / 180;
        return { ...g, x: cx + Math.cos(a) * R, y: cy + Math.sin(a) * R * sy };
      });
      P = pts.map(([x, y, pearl, rim], k) => {
        const g = pearl ? 0 : 1 + (k % (Cs.length - 1));
        const ang = Math.random() * 6.283, rr = Math.sqrt(Math.random()) * (g === 0 ? 20 : 13);
        return { x, y, hx: x, hy: y, gx: Cs[g].x + Math.cos(ang) * rr, gy: Cs[g].y + Math.sin(ang) * rr, vx: 0, vy: 0, pearl, rim };
      });
      if (reduce || !run) P.forEach((p) => { p.x = split ? p.gx : p.hx; p.y = split ? p.gy : p.hy; });
    };
    const draw = () => {
      ctx.fillStyle = "rgba(4,8,15,0.34)";
      ctx.fillRect(0, 0, W, H);
      labelA += ((split ? 1 : 0) - labelA) * 0.07;
      if (labelA > 0.02) {
        ctx.lineWidth = 1;
        Cs.slice(1).forEach((c) => { ctx.strokeStyle = `rgba(0,180,215,${labelA * 0.22})`; ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(c.x, c.y); ctx.stroke(); });
      }
      for (const p of P) {
        const tx = split ? p.gx : p.hx, ty = split ? p.gy : p.hy;
        p.vx = (p.vx + (tx - p.x) * 0.045) * 0.84;
        p.vy = (p.vy + (ty - p.y) * 0.045) * 0.84;
        p.x += p.vx; p.y += p.vy;
        ctx.fillStyle = p.pearl ? "rgba(232,201,106,.95)" : p.rim ? `rgba(0,180,215,${0.35 * (1 - labelA) + 0.15})` : "rgba(0,180,215,.9)";
        ctx.fillRect(p.x, p.y, 1.7, 1.7);
      }
      if (labelA > 0.02) {
        ctx.font = '600 10px "JetBrains Mono", monospace';
        ctx.textAlign = "center";
        Cs.forEach((c) => {
          const oy = c.ring === 0 ? 40 : 30;
          ctx.fillStyle = `rgba(${col(c.st)},${labelA})`;
          ctx.beginPath(); ctx.arc(c.x, c.y + oy - 12, 2.6, 0, 6.283); ctx.fill();
          ctx.fillStyle = `rgba(230,237,242,${labelA * 0.85})`;
          ctx.fillText(c.name.toUpperCase(), c.x, c.y + oy);
        });
      }
      if (run) raf = requestAnimationFrame(draw);
    };
    const paintStatic = () => { ctx.fillStyle = "#04080F"; ctx.fillRect(0, 0, W, H); draw(); };
    const set = (v: boolean) => {
      split = v;
      b.textContent = v ? D.swarm.join : D.swarm.split;
      if (reduce) { P.forEach((p) => { p.x = v ? p.gx : p.hx; p.y = v ? p.gy : p.hy; }); labelA = v ? 1 : 0; paintStatic(); }
    };
    build().then(() => {
      paintStatic();
      if (!reduce)
        watch(cv, () => {
          if (!run) { run = true; raf = requestAnimationFrame(draw); }
          if (!played) { played = true; setTimeout(() => set(true), 1200); setTimeout(() => set(false), 5200); }
        }, () => { run = false; cancelAnimationFrame(raf); }, 0.45);
    });
    b.addEventListener("click", () => set(!split));
    cv.addEventListener("click", () => set(!split));
    if (fine) {
      f.addEventListener("pointermove", (e) => {
        if (narrow()) return;
        const r = cv.getBoundingClientRect();
        if (Math.hypot(e.clientX - r.left - cx, e.clientY - r.top - cy) < eh * 0.42 && !split) set(true);
      });
      f.addEventListener("pointerleave", () => set(false));
    }
    let rt: ReturnType<typeof setTimeout>;
    addEventListener("resize", () => { clearTimeout(rt); rt = setTimeout(() => build().then(() => { if (!run) paintStatic(); }), 150); });
  })();

  // ---------- 3 · orbit map ----------
  (() => {
    const sec = $("mapa"), scene = $("scene");
    const dK = $("d-k"), dN = $("d-n"), dS = $("d-s"), dT = $("d-t");
    if (!sec || !scene || !dK || !dN || !dS || !dT) return;
    const show = (n: HomeNode, el: HTMLElement) => {
      dK.textContent = n.kind;
      dN.textContent = n.name + (n.kanji ? " " + n.kanji : "");
      dT.textContent = n.d;
      if (n.st === "empty") dS.hidden = true;
      else { dS.hidden = false; dS.className = "st " + n.st; dS.innerHTML = "<i></i>" + esc(D.states[n.st]); }
      document.querySelectorAll(".home .bill").forEach((b) => b.classList.toggle("sel", b === el));
    };
    // Nodes are server-rendered (complete without JS); here they only get their interactions.
    document.querySelectorAll<HTMLButtonElement>(".home .bill[data-node]").forEach((b) => {
      const n = NODES.find((x) => x.id === b.dataset.node);
      if (!n) return;
      b.addEventListener("click", () => show(n, b));
      b.addEventListener("focus", () => { sec.classList.add("hold"); show(n, b); });
      b.addEventListener("blur", () => sec.classList.remove("hold"));
      if (fine) b.addEventListener("mouseenter", () => show(n, b));
    });
    const stage = sec.querySelector(".stage3d");
    stage?.addEventListener("mouseenter", () => sec.classList.add("hold"));
    stage?.addEventListener("mouseleave", () => sec.classList.remove("hold"));
    let tx = 0, tz = 0, vx = 0, vz = 0, gx = 0, gz = 0, raf: number | null = null;
    const stepS = () => {
      vx = (vx + (gx - tx) * 0.06) * 0.82; vz = (vz + (gz - tz) * 0.06) * 0.82;
      tx += vx; tz += vz;
      scene.style.transform = `rotateX(calc(var(--tilt) + ${tx.toFixed(2)}deg)) rotateZ(${tz.toFixed(2)}deg) scale(var(--sc, 1))`;
      raf = Math.abs(gx - tx) + Math.abs(gz - tz) + Math.abs(vx) + Math.abs(vz) > 0.02 ? requestAnimationFrame(stepS) : null;
    };
    const kick = () => { if (!raf) raf = requestAnimationFrame(stepS); };
    if (!reduce && fine)
      sec.addEventListener("pointermove", (e) => {
        if (narrow()) return;
        const r = sec.getBoundingClientRect();
        gx = -((e.clientY - r.top) / r.height - 0.5) * 9;
        gz = ((e.clientX - r.left) / r.width - 0.5) * 16;
        kick();
      });
    sec.addEventListener("pointerleave", () => { gx = 0; gz = 0; kick(); });
  })();

  // ---------- 4 · "Ahora" console ----------
  (() => {
    // Counts, radar and the first log lines are server-rendered; JS adds timestamps and new lines.
    const log = $("log");
    const box = log?.querySelector(".lines");
    if (!log || !box) return;
    let i = box.children.length;
    const stamp = () => new Intl.DateTimeFormat("es-ES", { hour: "2-digit", minute: "2-digit", second: "2-digit", timeZone: "Europe/Madrid" }).format(new Date());
    // Animated List: newest on top, max 5.
    const push = (animate: boolean) => {
      const [who, what] = D.log[i++ % D.log.length];
      const d = document.createElement("div");
      d.className = "ln" + (animate ? " new" : "");
      d.innerHTML = `<span class="t">${stamp()}</span><span class="who">[${esc(who)}]</span> ${esc(what)}`;
      box.prepend(d);
      while (box.children.length > 5) box.lastElementChild?.remove();
    };
    box.querySelectorAll<HTMLElement>(".t").forEach((el) => (el.textContent = stamp()));
    let timer: ReturnType<typeof setInterval> | null = null;
    watch(log, () => { if (!timer) timer = setInterval(() => push(!reduce), 2600); }, () => { if (timer) clearInterval(timer); timer = null; });
  })();

  // ---------- 6 · about: certifications + ASCII portrait ----------
  (() => {
    const more = $("more-certs");
    // Without JS every certification stays visible; collapse them only once the reveal button works.
    if (more) {
      document.querySelectorAll<HTMLElement>("[data-more-cert]").forEach((el) => (el.hidden = true));
      more.hidden = false;
    }
    more?.addEventListener("click", () => {
      document.querySelectorAll<HTMLElement>("[data-more-cert]").forEach((el) => (el.hidden = false));
      more.remove();
    });

    const box = $("portrait"), cv = $<HTMLCanvasElement>("pc");
    if (!box || !cv) return;
    const ctx = cv.getContext("2d")!;
    const img = new Image();
    img.src = D.portrait;
    const RAMP = " .:-=+*#%@";
    const dpr = Math.min(2, devicePixelRatio || 1), cw = 6, chh = 10;
    let W = 0, H = 0, lum: Float32Array | null = null, cols = 0, rows = 0, mx = -999, my = -999, rev = new Float32Array(0), raf: number | null = null;
    let src: [number, number, number, number] = [0, 0, 1, 1];
    const setup = () => {
      const r = box.getBoundingClientRect();
      W = r.width; H = r.height;
      if (!W || !H || !img.width) return;
      cv.width = W * dpr; cv.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cols = Math.floor(W / cw); rows = Math.floor(H / chh);
      const ar = W / H, iar = img.width / img.height;
      const sw = iar > ar ? img.height * ar : img.width, sh = iar > ar ? img.height : img.width / ar;
      const sx = iar > ar ? (img.width - img.height * ar) / 2 : 0, sy = iar > ar ? 0 : (img.height - sh) * 0.25;
      src = [sx, sy, sw, sh];
      const o = document.createElement("canvas");
      o.width = cols; o.height = rows;
      const ox = o.getContext("2d")!;
      ox.drawImage(img, sx, sy, sw, sh, 0, 0, cols, rows);
      const d = ox.getImageData(0, 0, cols, rows).data;
      lum = new Float32Array(cols * rows);
      for (let k = 0; k < cols * rows; k++) lum[k] = (d[k * 4] * 0.3 + d[k * 4 + 1] * 0.59 + d[k * 4 + 2] * 0.11) / 255;
      let lo = 1, hi = 0;
      for (const v of lum) { lo = Math.min(lo, v); hi = Math.max(hi, v); }
      for (let k = 0; k < lum.length; k++) lum[k] = Math.pow((lum[k] - lo) / Math.max(0.01, hi - lo), 0.8);
      rev = new Float32Array(cols * rows);
    };
    const draw = () => {
      if (!lum) return;
      ctx.fillStyle = "#04080F";
      ctx.fillRect(0, 0, W, H);
      ctx.font = `600 ${chh - 1}px "JetBrains Mono", monospace`;
      ctx.textBaseline = "top";
      let active = false;
      for (let j = 0; j < rows; j++) for (let i = 0; i < cols; i++) {
        const k = j * cols + i, x = i * cw, y = j * chh, d = Math.hypot(x - mx, y - my);
        if (d < 56) rev[k] = Math.min(1, rev[k] + 0.3);
        else if (rev[k] > 0) rev[k] = Math.max(0, rev[k] - (reduce ? 1 : 0.012));
        if (rev[k] > 0) active = true;
        if (rev[k] < 1) {
          const L = lum[k];
          ctx.fillStyle = `rgba(${L > 0.75 ? "230,237,242" : "0,180,215"},${(0.22 + L * 0.78) * (1 - rev[k])})`;
          ctx.fillText(RAMP[Math.min(9, Math.floor(L * 9.9))], x, y);
        }
      }
      if (active) {
        ctx.save(); ctx.beginPath();
        for (let k = 0; k < rev.length; k++) if (rev[k] > 0.05) ctx.rect((k % cols) * cw, Math.floor(k / cols) * chh, cw + 0.5, chh + 0.5);
        ctx.clip();
        ctx.drawImage(img, src[0], src[1], src[2], src[3], 0, 0, cols * cw, rows * chh);
        ctx.restore();
      }
      raf = active || mx > -999 ? requestAnimationFrame(draw) : null;
    };
    const kick = () => { if (!raf) raf = requestAnimationFrame(draw); };
    const start = () => {
      if (raf) cancelAnimationFrame(raf);
      raf = null;
      setup();
      draw();
    };
    if (img.complete && img.width) start(); else img.onload = start;
    const at = (e: PointerEvent) => { const r = box.getBoundingClientRect(); mx = e.clientX - r.left; my = e.clientY - r.top; kick(); };
    box.addEventListener("pointermove", at);
    box.addEventListener("pointerdown", at);
    box.addEventListener("pointerleave", () => { mx = my = -999; kick(); });
    box.addEventListener("pointerup", () => { if (!fine) { mx = my = -999; kick(); } });
    let rt: ReturnType<typeof setTimeout>;
    addEventListener("resize", () => { clearTimeout(rt); rt = setTimeout(start, 150); });
  })();

  // Remember an explicit language choice so the root page stops redirecting.
  document.querySelectorAll<HTMLAnchorElement>(".home a[hreflang]").forEach((a) =>
    a.addEventListener("click", () => { try { localStorage.setItem("acm-lang", a.hreflang); } catch { /* storage blocked */ } }),
  );

  // ---------- Magic UI ports ----------
  document.documentElement.classList.add("js");
  // Number Ticker: spring count-up once in view.
  document.querySelectorAll<HTMLElement>(".home [data-count]").forEach((el) => {
    const to = +(el.dataset.count ?? 0);
    if (reduce) { el.textContent = String(to); return; }
    let x = 0, v = 0;
    const step = () => {
      v = (v + (to - x) * 0.08) * 0.78; x += v;
      el.textContent = String(Math.min(to, Math.max(0, Math.round(x))));
      if (Math.abs(to - x) + Math.abs(v) > 0.01) requestAnimationFrame(step); else el.textContent = String(to);
    };
    // The real value stays visible until the counter scrolls into view.
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { io.disconnect(); el.textContent = "0"; setTimeout(() => requestAnimationFrame(step), 250); } }, { threshold: 0.6 });
    io.observe(el);
  });
  // Magic Card spotlight.
  document.querySelectorAll<HTMLElement>(".home .magic").forEach((el) =>
    el.addEventListener("pointermove", (e) => {
      const r = el.getBoundingClientRect();
      el.style.setProperty("--mx", e.clientX - r.left + "px");
      el.style.setProperty("--my", e.clientY - r.top + "px");
    }),
  );
  // Blur Fade with a short stagger; a safety net makes sure nothing stays hidden.
  const bfo = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); bfo.unobserve(e.target); } }), { threshold: 0.15 });
  document.querySelectorAll<HTMLElement>(".home .bf").forEach((el, i) => { el.style.setProperty("--d", (i % 2) * 70 + "ms"); bfo.observe(el); });
  const reveal = (limit: number) => document.querySelectorAll(".home .bf:not(.in)").forEach((el) => { if (el.getBoundingClientRect().top < innerHeight * limit) el.classList.add("in"); });
  setTimeout(() => reveal(1.2), 1200);
  addEventListener("scroll", () => reveal(0.95), { passive: true });
  // Hyper Text: scramble short mono labels on hover/focus, keeping the accessible name.
  const GLY = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  const hyper = (el: HTMLElement) => {
    if (el.dataset.hyper) return;
    const txt = el.textContent ?? "";
    el.dataset.hyper = "1";
    el.setAttribute("aria-label", txt);
    let busy = false;
    const go = () => {
      if (busy || reduce) return;
      busy = true;
      let f = 0;
      const id = setInterval(() => {
        el.textContent = txt.split("").map((c, i) => (i < f || c === " " || c === "·" ? c : GLY[(Math.random() * GLY.length) | 0])).join("");
        f += 0.5;
        if (f > txt.length) { clearInterval(id); el.textContent = txt; busy = false; }
      }, 26);
    };
    el.addEventListener("mouseenter", go);
    el.addEventListener("focus", go);
  };
  document.querySelectorAll<HTMLElement>(".home .links a, .home .label:not(:has(*))").forEach((el) => {
    if (el.children.length === 0 && (el.textContent ?? "").trim().length < 24) hyper(el);
  });
}
