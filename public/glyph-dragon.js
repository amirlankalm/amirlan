/*
 * glyph-dragon.js - kanji-square ryu (Japanese dragon), animated background. Smooth edition: 11px grid (4x the cells).
 * Self-contained, no dependencies. Original code.
 *
 * A full-screen fixed canvas behind your content. An autonomous ryu swims in
 * slow serpentine loops. Its body is a mosaic of squares, each square carrying
 * a kanji knocked out in the page colour; the head carries 龍, the eye 目.
 * Antlers, whiskers, mane and claws are drawn as fine small squares.
 * Honors prefers-reduced-motion (renders one still frame).
 *
 * Usage:
 *   <script src="/glyph-dragon.js"></script>
 *   (optionally set window.GLYPH_DRAGON = { ...options } before the script)
 */
(function (root) {
  'use strict';

  var DEFAULTS = {
    cell: 11,                    // px per mosaic square (the resolution knob: smaller = finer, smoother)
    bg: '#fbfaf6',               // page background (also the kanji knockout colour)
    ink: '#1a1a1a',
    jade: '#2f7d6a',             // body
    azure: '#2b6f8f',            // body variation (scale feel)
    darkJade: '#1d4d40',         // head block, limbs
    gold: '#b98a1d',             // horns, claws, eye
    paleGold: '#d9b45c',         // belly
    red: '#c0392b',              // mane, whiskers, tail flame
    deepRed: '#8e2418',          // eye kanji
    headKanji: '\u9F8D',         // 龍
    eyeKanji: '\u76EE',          // 目
    bodyKanji: '\u96F2\u98A8\u96F7\u96FB\u6C34\u706B\u5C71\u5929\u5149\u6708\u661F\u6C23\u795E\u529B\u9053\u5DDD\u96E8\u82B1',
    effects: true,               // drifting faint kanji + mist cloud bands behind the dragon
    moteDensity: 0.008,          // drifting kanji per grid cell
    moteTint: 0.075,             // base tint strength of drifting kanji (0..1 toward colour)
    cloudTint: 0.075,             // peak tint strength of the cloud bands
    speed: 7.6,                  // head speed, cells per second (~84 px/s at the default 11px grid)
    segLen: 0.62,                 // spine segment length, cells
    segs: 140,                   // spine segments
    fontFamily: '"Noto Serif JP","Noto Serif SC","Hiragino Mincho ProN","Yu Mincho","Songti SC",serif'
  };

  function hash2(x, y) {
    var h = (x * 73856093) ^ (y * 19349663);
    h = (h ^ (h >>> 13)) >>> 0;
    return h;
  }

  function hexRGB(h) {
    return [parseInt(h.slice(1, 3), 16), parseInt(h.slice(3, 5), 16), parseInt(h.slice(5, 7), 16)];
  }
  function mix(hexA, hexB, t) {
    var a = hexRGB(hexA), b = hexRGB(hexB);
    var r = Math.round(a[0] + (b[0] - a[0]) * t);
    var g = Math.round(a[1] + (b[1] - a[1]) * t);
    var bl = Math.round(a[2] + (b[2] - a[2]) * t);
    return '#' + ((1 << 24) + (r << 16) + (g << 8) + bl).toString(16).slice(1);
  }

  // ---- Backdrop: faint drifting kanji + slow mist-cloud bands, all on the same grid ----
  function Backdrop(W, H, opts) {
    this.opts = opts; this.W = W; this.H = H; this.t = 0;
    this.cloudSeedX = 0;
    var n = Math.max(8, Math.round(W * H * opts.moteDensity));
    this.motes = [];
    for (var i = 0; i < n; i++) {
      var h = hash2(i * 7 + 1, i * 13 + 5);
      this.motes.push({
        x: (h % 1000) / 1000 * W,
        y: ((h >>> 10) % 1000) / 1000 * H,
        v: 0.7 + ((h >>> 20) % 100) / 100 * 1.5,   // cells per second, drifting right
        ph: (h % 628) / 100,                          // pulse phase
        w: 0.35 + ((h >>> 8) % 100) / 100 * 0.5,      // pulse speed
        ch: opts.bodyKanji[h % opts.bodyKanji.length],
        ink: (h % 5 === 0)                            // some motes tinted toward ink, most toward jade
      });
    }
  }
  Backdrop.prototype.step = function (dt) {
    this.t += dt;
    this.cloudSeedX += dt * 0.3;                      // clouds drift slowly
    for (var i = 0; i < this.motes.length; i++) {
      var m = this.motes[i];
      m.x += m.v * dt;
      m.y += Math.sin(this.t * 0.5 + m.ph) * 0.24 * dt;
      if (m.x > this.W + 1) { m.x = -1; m.y = (m.y + this.H * 0.37) % this.H; }
    }
  };
  Backdrop.prototype.rasterize = function () {
    var o = this.opts, out = [], W = this.W, H = this.H, t = this.t;
    // mist cloud bands: two soft horizontal unkai bands, irregular broken edges
    var bands = [
      { y: H * 0.26, th: 4.8, wl: 26, amp: 1.8, col: o.jade,  k: o.cloudTint },
      { y: H * 0.74, th: 5.6, wl: 34, amp: 2.2, col: o.azure, k: o.cloudTint * 0.85 }
    ];
    for (var bi = 0; bi < bands.length; bi++) {
      var b = bands[bi];
      for (var x = 0; x < W; x++) {
        var cy = b.y + Math.sin((x + this.cloudSeedX * 3) / b.wl * Math.PI * 2 + bi * 2.1) * b.amp;
        // slow coverage wave so the band breaks into cloud puffs
        var cover = 0.5 + 0.5 * Math.sin((x - this.cloudSeedX * 2) / (b.wl * 0.8) * Math.PI * 2 + bi);
        if (cover < 0.35) continue;
        for (var y = Math.floor(cy - b.th); y <= Math.ceil(cy + b.th); y++) {
          if (y < 0 || y >= H) continue;
          var d = Math.abs(y - cy) / b.th;
          if (d > 1) continue;
          var hh = hash2(x * 3 + bi * 71, y * 7 + bi * 13) % 100 / 100;
          if (hh > (1 - d) * cover) continue;         // ragged cloud edges
          var s = b.k * (1 - d) * (0.5 + 0.5 * cover);
          out.push({ x: x, y: y, bg: mix(o.bg, b.col, s), fg: null, ch: null, size: 1.0, pr: 0 });
        }
      }
    }
    // drifting faint kanji
    for (var i = 0; i < this.motes.length; i++) {
      var m = this.motes[i];
      var k = o.moteTint * (0.55 + 0.45 * Math.sin(t * m.w + m.ph));
      if (k < 0.012) continue;
      out.push({
        x: Math.round(m.x), y: Math.round(m.y),
        bg: null, fg: mix(o.bg, m.ink ? o.ink : o.jade, k), ch: m.ch, size: 0.94, pr: 0
      });
    }
    return out;
  };

  function Dragon(W, H, opts) {
    this.opts = opts;
    this.W = W; this.H = H;
    this.t = 0;
    var n = opts.segs;
    this.spine = [];
    var x0 = W / 2, y0 = H / 2;
    for (var i = 0; i < n; i++) this.spine.push({ x: x0 - i * opts.segLen, y: y0 });
    this.rp = []; this.tan = []; this.dors = [];
    for (i = 0; i < n; i++) { this.rp.push({ x: 0, y: 0 }); this.tan.push({ x: 1, y: 0 }); this.dors.push({ x: 0, y: -1 }); }
    this.backdrop = opts.effects ? new Backdrop(W, H, opts) : null;
  }

  // autonomous looping swim path (wide horizontal lissajous, stays on screen)
  Dragon.prototype.path = function (t) {
    var W = this.W, H = this.H;
    return {
      x: W / 2 + (W * 0.40) * Math.sin(0.09 * t),
      y: H / 2 + (H * 0.22) * Math.sin(0.16 * t + 1.7)
    };
  };

  Dragon.prototype.step = function (dt) {
    var o = this.opts, n = o.segs;
    this.t += dt;
    if (this.backdrop) this.backdrop.step(dt);
    var p0 = this.path(this.t), p1 = this.path(this.t + 0.05);
    var vx = (p1.x - p0.x) / 0.05, vy = (p1.y - p0.y) / 0.05;
    var vlen = Math.hypot(vx, vy) || 1;
    var hx = this.spine[0].x + (vx / vlen) * o.speed * dt;
    var hy = this.spine[0].y + (vy / vlen) * o.speed * dt;
    hx += (p0.x - hx) * Math.min(1, dt * 1.6);
    hy += (p0.y - hy) * Math.min(1, dt * 1.6);
    this.spine[0].x = hx; this.spine[0].y = hy;
    for (var i = 1; i < n; i++) {
      var a = this.spine[i - 1], b = this.spine[i];
      var dx = b.x - a.x, dy = b.y - a.y;
      var d = Math.hypot(dx, dy) || 1e-6;
      var f = o.segLen / d - 1;
      b.x += dx * f; b.y += dy * f;
    }
    var k = 0.19, w = 2.1;
    for (i = 0; i < n; i++) {
      var u = i / (n - 1);
      var amp = 0.6 + 4.0 * u;              // head steady, tail swings
      var s = i * o.segLen;
      var off = amp * Math.sin(k * s - w * this.t);
      var tx, ty;
      if (i === 0) { tx = this.spine[0].x - this.spine[1].x; ty = this.spine[0].y - this.spine[1].y; }
      else if (i === n - 1) { tx = this.spine[n - 2].x - this.spine[n - 1].x; ty = this.spine[n - 2].y - this.spine[n - 1].y; }
      else { tx = this.spine[i - 1].x - this.spine[i + 1].x; ty = this.spine[i - 1].y - this.spine[i + 1].y; }
      var tl = Math.hypot(tx, ty) || 1e-6; tx /= tl; ty /= tl;
      var nx = -ty, ny = tx;
      this.rp[i].x = this.spine[i].x + nx * off;
      this.rp[i].y = this.spine[i].y + ny * off;
      this.tan[i].x = tx; this.tan[i].y = ty;
      var upx = 0, upy = -1;
      var dot = upx * tx + upy * ty;
      var ddx = upx - dot * tx, ddy = upy - dot * ty;
      var dl = Math.hypot(ddx, ddy);
      if (dl < 0.25) { ddx = this.dors[i].x; ddy = this.dors[i].y; dl = Math.hypot(ddx, ddy) || 1; }
      this.dors[i].x = ddx / dl; this.dors[i].y = ddy / dl;
    }
  };

  // body half-width profile in cells: slim serpent with a chest bulge
  Dragon.prototype.widthAt = function (u) {
    var w;
    if (u < 0.03) w = 5.2;                                // skull
    else if (u < 0.1) w = 5.2 - (u - 0.03) / 0.07 * 1.4;  // cheeks to neck
    else if (u < 0.2) w = 3.8 + (u - 0.1) / 0.1 * 0.8;    // chest
    else {
      var v = (u - 0.2) / 0.8;                            // long taper to tail
      w = 4.0 * (1 - v * v * (3 - 2 * v));
    }
    var floor = 1.1 * (1 - u) + 0.3;                      // tail stays visible
    return Math.max(w, floor);
  };

  Dragon.prototype.rasterize = function () {
    var o = this.opts, n = o.segs, cells = {};
    function put(x, y, bg, fg, ch, size, pr) {
      x = Math.round(x); y = Math.round(y);
      var k = x + ',' + y;
      var c = cells[k];
      if (!c || pr >= c.pr) cells[k] = { x: x, y: y, bg: bg, fg: fg, ch: ch, size: size, pr: pr };
    }
    function line(x0, y0, x1, y1, step, fn) {
      var dx = x1 - x0, dy = y1 - y0, len = Math.hypot(dx, dy) || 1e-6;
      var cnt = Math.max(1, Math.ceil(len / step));
      for (var j = 0; j <= cnt; j++) fn(x0 + dx * j / cnt, y0 + dy * j / cnt);
    }
    var K = o.bodyKanji;
    function bodyCh(x, y) { return K[hash2(x, y) % K.length]; }

    // ---- legs (behind body) ----
    var legUs = [0.14, 0.46];
    for (var li = 0; li < legUs.length; li++) {
      var idx = Math.round(legUs[li] * (n - 1));
      var P = this.rp[idx], D = this.dors[idx], T = this.tan[idx];
      var w = this.widthAt(legUs[li]);
      var vx = -D.x, vy = -D.y;
      var hipx = P.x + vx * (w * 0.3), hipy = P.y + vy * (w * 0.3);
      var kneex = hipx + vx * 3.0 + T.x * 1.2, kneey = hipy + vy * 3.0 + T.y * 1.2;
      var footx = kneex + vx * 2.4 + T.x * 1.4, footy = kneey + vy * 2.4 + T.y * 1.4;
      line(hipx, hipy, kneex, kneey, 0.22, function (x, y) { put(x, y, o.darkJade, null, null, 0.95, 1); });
      line(kneex, kneey, footx, footy, 0.22, function (x, y) { put(x, y, o.darkJade, null, null, 0.9, 1); });
      var fan = [[2.8, 0.3], [2.2, 1.8], [0.9, 3.0]];
      for (var ci = 0; ci < fan.length; ci++) {
        line(footx, footy, footx + T.x * fan[ci][0] + vx * fan[ci][1], footy + T.y * fan[ci][0] + vy * fan[ci][1], 0.22,
          function (x, y) { put(x, y, o.gold, null, null, 0.7, 1); });
      }
    }

    // ---- body mosaic ----
    for (var i = 0; i < n; i++) {
      var u = i / (n - 1);
      var P = this.rp[i], w = this.widthAt(u), D = this.dors[i];
      var r = Math.ceil(w);
      for (var ax = -r; ax <= r; ax++) for (var ay = -r; ay <= r; ay++) {
        var cx = Math.round(P.x + ax), cy = Math.round(P.y + ay);
        var ox = cx - P.x, oy = cy - P.y;
        if (ox * ox + oy * oy > w * w) continue;
        var belly = u > 0.04 && u < 0.7 && (ox * -D.x + oy * -D.y) > Math.max(0.55 * w, 1.0);
        if (belly) put(cx, cy, o.paleGold, o.bg, bodyCh(cx, cy), 0.94, 3);
        else if (u < 0.05) put(cx, cy, o.darkJade, o.bg, bodyCh(cx, cy), 0.94, 2);
        else {
          var bgc = (hash2(cx, cy) % 7 === 0) ? o.azure : o.jade;
          put(cx, cy, bgc, o.bg, bodyCh(cx, cy), 0.94, 2);
        }
      }
      // dorsal spikes: red near the head, jade toward the tail
      var jag = (Math.sin(i * 2.2) + 1) / 2;
      if (u < 0.25) {
        if (jag > 0.6) put(P.x + D.x * (w + 1.1), P.y + D.y * (w + 1.1), o.red, null, null, 0.8, 4);
      } else if (u < 0.8) {
        if (jag > 0.45) put(P.x + D.x * (w + 1.0), P.y + D.y * (w + 1.0), o.darkJade, null, null, 0.65, 4);
      }
    }
    // tail flame
    var tip = this.rp[n - 1], tD = this.dors[n - 1], tT = this.tan[n - 1];
    var flames = [[0.8, 3.6], [-0.6, -3.2], [-2.0, 2.0], [-2.2, -1.4], [-3.0, 0.2]];
    for (var fi = 0; fi < flames.length; fi++) {
      line(tip.x - tT.x * 0.8, tip.y - tT.y * 0.8,
        tip.x + tT.x * flames[fi][0] + tD.x * flames[fi][1], tip.y + tT.y * flames[fi][0] + tD.y * flames[fi][1], 0.22,
        function (x, y) { put(x, y, o.red, null, null, 0.8, 4); });
    }

    // ---- head features, anchored to spine nodes (rotate with the body) ----
    function lp(i, a, b) {
      var P = this.rp[i], F = this.tan[i], D = this.dors[i];
      return { x: P.x + F.x * a + D.x * b, y: P.y + F.y * a + D.y * b };
    }
    function lput(i, a, b, bg, fg, ch, size, pr) { var q = lp.call(this, i, a, b); put(q.x, q.y, bg, fg, ch, size, pr); }
    var self = this;

    // elongated snout ahead of the skull
    [[4.8, 2.2], [6.4, 2.0], [8.0, 1.7], [9.4, 1.4]].forEach(function (c) { lput.call(self, 0, c[0], c[1], o.darkJade, o.bg, o.bodyKanji[7], 0.92, 5); });
    [[4.8, -2.0], [6.2, -1.9], [7.6, -1.6]].forEach(function (c) { lput.call(self, 0, c[0], c[1], o.darkJade, o.bg, o.bodyKanji[9], 0.92, 5); });
    // open mouth + gold fangs
    lput.call(self, 0, 5.6, -0.1, o.red, null, null, 0.9, 6);
    lput.call(self, 0, 6.9, -0.4, o.red, null, null, 0.7, 6);
    lput.call(self, 0, 6.2, 0.8, o.gold, null, null, 0.55, 7);
    lput.call(self, 0, 6.5, -1.3, o.gold, null, null, 0.5, 7);
    // nose horn
    lput.call(self, 0, 9.6, 2.8, o.gold, null, null, 0.65, 7);
    // eye: gold square, red 目, dark brow
    lput.call(self, 2, 1.0, 3.0, o.gold, o.deepRed, o.eyeKanji, 1.6, 8);
    lput.call(self, 2, 1.0, 4.6, o.darkJade, null, null, 0.7, 6);
    // 龍 on the skull
    lput.call(self, 2, -2.2, 0.2, o.darkJade, o.gold, o.headKanji, 2.0, 8);
    // antlers: two tall gold antlers sweeping back-up
    var antler1 = [
      [[0, 4.8], [-1.8, 6.6], [-3.8, 8.2], [-5.8, 9.4]],          // main beam sweeping back-up
      [[-1.8, 6.6], [-2.2, 8.8], [-0.2, 7.8]],                     // front tine
      [[-3.8, 8.2], [-5.0, 11.0], [-7.2, 10.2]]                    // rear tine
    ];
    var antler2 = [
      [[2.2, 5.0], [0.8, 7.2], [-0.8, 9.0]],                       // second antler
      [[0.8, 7.2], [1.6, 9.2]]
    ];
    [antler1, antler2].forEach(function (branches, ai) {
      branches.forEach(function (pts) {
        for (var pi = 0; pi < pts.length - 1; pi++) {
          var qa = lp.call(self, 4, pts[pi][0], pts[pi][1]), qb = lp.call(self, 4, pts[pi + 1][0], pts[pi + 1][1]);
          line(qa.x, qa.y, qb.x, qb.y, 0.25, function (x, y) { put(x, y, o.gold, null, null, ai === 0 ? 0.9 : 0.82, 7); });
        }
      });
    });
    // mane tufts behind the skull
    var tufts = [[-4.0, 4.4], [-5.8, 2.6], [-6.6, 0.4], [-5.0, -2.4]];
    tufts.forEach(function (c) {
      var qa = lp.call(self, 4, c[0], c[1]), qb = lp.call(self, 4, c[0] * 1.22 - 0.6, c[1] * 1.3);
      line(qa.x, qa.y, qb.x, qb.y, 0.25, function (x, y) { put(x, y, o.red, null, null, 0.85, 6); });
    });
    // beard under the chin
    [[1.2, -4.6], [-0.6, -5.4], [-2.2, -5.0]].forEach(function (c) { lput.call(self, 2, c[0], c[1], o.red, null, null, 0.7, 6); });
    // whiskers: chunky gold arc trailing back under the jaw (tips sway)
    var wt = this.t;
    var sway = Math.sin(wt * 2.2) * 1.0;
    var whisk = [[7.8, -3.2], [5.6, -4.8], [3.0, -5.8 + sway * 0.4], [0.4, -6.2 + sway], [-2.0, -5.8 + sway]];
    for (var ws = 0; ws < whisk.length - 1; ws++) {
      var wa = lp.call(this, 0, whisk[ws][0], whisk[ws][1]), wb = lp.call(this, 0, whisk[ws + 1][0], whisk[ws + 1][1]);
      line(wa.x, wa.y, wb.x, wb.y, 0.25, function (x, y) { put(x, y, o.gold, null, null, 0.65, 7); });
    }

    var out = [];
    for (var key in cells) out.push(cells[key]);
    if (this.backdrop) {
      var bcells = this.backdrop.rasterize();
      for (var bi = 0; bi < bcells.length; bi++) {
        var bc = bcells[bi];
        if (!cells[bc.x + ',' + bc.y]) out.push(bc);   // dragon always wins its squares
      }
    }
    return out;
  };

  var API = { Dragon: Dragon, DEFAULTS: DEFAULTS };
  if (typeof module !== 'undefined' && module.exports) module.exports = API;

  // ---------------- browser bootstrap ----------------
  function init() {
    if (typeof window === "undefined" || !window.document || !document.body) return;
    var existing = document.getElementById("glyph-dragon-canvas");
    if (existing && existing.__dragon_active) return;

    var canvas = existing;
    if (!canvas) {
      canvas = document.createElement("canvas");
      canvas.id = "glyph-dragon-canvas";
      canvas.style.cssText = "position:fixed!important;top:0!important;left:0!important;width:100vw!important;height:100vh!important;z-index:0!important;pointer-events:none!important;display:block!important;margin:0!important;padding:0!important;border:none!important;";
      document.body.prepend(canvas);
    } else {
      canvas.style.cssText = "position:fixed!important;top:0!important;left:0!important;width:100vw!important;height:100vh!important;z-index:0!important;pointer-events:none!important;display:block!important;margin:0!important;padding:0!important;border:none!important;";
    }

    canvas.__dragon_active = true;

    var opts = Object.assign({}, DEFAULTS, root.GLYPH_DRAGON || {});
    var ctx = canvas.getContext("2d");
    var dpr = Math.min(2, window.devicePixelRatio || 1);
    var W, H, dragon;
    function resize() {
      W = Math.ceil(window.innerWidth / opts.cell);
      H = Math.ceil(window.innerHeight / opts.cell);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (!dragon) dragon = new Dragon(W, H, opts);
      else { dragon.W = W; dragon.H = H; }
    }
    window.addEventListener("resize", resize);
    resize();

    function draw(cells) {
      var c = opts.cell, gap = c * 0.1;
      ctx.fillStyle = opts.bg;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.textAlign = "center"; ctx.textBaseline = "middle";
      for (var i = 0; i < cells.length; i++) {
        var cl = cells[i];
        var s = c * cl.size;
        var x = cl.x * c + (c - s) / 2, y = cl.y * c + (c - s) / 2;
        if (cl.bg) {
          ctx.fillStyle = cl.bg;
          ctx.fillRect(x, y, s, s);
        }
        if (cl.ch && cl.fg) {
          ctx.fillStyle = cl.fg;
          ctx.font = "600 " + Math.round(s * 0.72) + "px " + opts.fontFamily;
          ctx.fillText(cl.ch, cl.x * c + c / 2, cl.y * c + c / 2 + s * 0.04);
        }
      }
    }

    var still = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (still) {
      for (var wu = 0; wu < 240; wu++) dragon.step(1 / 30);
      draw(dragon.rasterize());
      return;
    }
    var last = performance.now();
    (function frame(now) {
      var dt = Math.min(0.05, (now - last) / 1000); last = now;
      dragon.step(dt);
      draw(dragon.rasterize());
      requestAnimationFrame(frame);
    })(last);
  }

  root.initGlyphDragon = init;

  if (typeof window !== "undefined" && window.document) {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", init);
    } else {
      init();
    }
  }
})(typeof self !== "undefined" ? self : this);
