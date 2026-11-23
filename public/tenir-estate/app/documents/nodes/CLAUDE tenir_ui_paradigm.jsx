import { useState, useEffect, useRef, useCallback } from "react";
import { LineChart, Line, XAxis, YAxis, ReferenceLine, ResponsiveContainer, Area, AreaChart, Tooltip } from "recharts";

// ─── THEME ──────────────────────────────────────────────────────────────────
const T = {
  bg: "#0d0c0b",
  bgSurface: "#141311",
  bgCard: "#1a1815",
  border: "#2a2724",
  borderFaint: "#1f1d1b",
  red: "#c0392b",
  redFaint: "rgba(192,57,43,0.12)",
  redGlow: "rgba(192,57,43,0.25)",
  amber: "#d4a845",
  amberFaint: "rgba(212,168,69,0.1)",
  green: "#4a7c59",
  text: "#e8e3db",
  textMid: "#9a9288",
  textDim: "#5a554f",
  mono: "'Space Mono', monospace",
  serif: "'Playfair Display', Georgia, serif",
  sans: "'DM Sans', sans-serif",
};

// ─── CONSTANTS ───────────────────────────────────────────────────────────────
const MODES = {
  SHADOW_PASSIVE: {
    id: "SHADOW_PASSIVE",
    label: "SHADOW·PASSIVE",
    desc: "Observe without friction. Membrane invisible.",
    color: T.textDim,
    intensity: 0.2,
  },
  SHADOW_CRITICAL: {
    id: "SHADOW_CRITICAL",
    label: "SHADOW·CRITICAL",
    desc: "Flag critical crossings. Membrane surfaces under pressure.",
    color: T.amber,
    intensity: 0.6,
  },
  FULL_FAIL_CLOSE: {
    id: "FULL_FAIL_CLOSE",
    label: "FAIL·CLOSE",
    desc: "Sovereignty enforced. No action passes TAU.",
    color: T.red,
    intensity: 1.0,
  },
};

const TAU = 0.42; // invariant threshold
const EPSILON = 0.08;

// S = K / (P × V + ε)
function computeS(K, P, V) {
  return Math.max(0, Math.min(1, K / (P * V + EPSILON)));
}

function generateTrace(length = 80, seed = 0) {
  const pts = [];
  let K = 0.72, P = 0.38, V = 0.45;
  for (let i = 0; i < length; i++) {
    const t = i / length;
    const noise = (Math.sin(i * 0.7 + seed) * 0.08 + Math.sin(i * 0.23 + seed * 2) * 0.05);
    K = Math.max(0.1, Math.min(0.95, K + noise * 0.3 - 0.002));
    P = Math.max(0.1, Math.min(0.95, P + noise * 0.4 + (t > 0.6 ? 0.006 : 0)));
    V = Math.max(0.1, Math.min(0.95, V + noise * 0.35 + (t > 0.7 ? 0.005 : 0)));
    const S = computeS(K, P, V);
    pts.push({ t: i, S: +S.toFixed(3), K: +K.toFixed(3), P: +P.toFixed(3), V: +V.toFixed(3) });
  }
  return pts;
}

// ─── MINI COMPONENTS ─────────────────────────────────────────────────────────
function Mono({ children, style = {} }) {
  return <span style={{ fontFamily: T.mono, ...style }}>{children}</span>;
}

function Label({ children, style = {} }) {
  return (
    <div style={{
      fontFamily: T.mono, fontSize: 9, letterSpacing: "0.18em",
      textTransform: "uppercase", color: T.textDim, ...style
    }}>
      {children}
    </div>
  );
}

function Tag({ children, color = T.textDim }) {
  return (
    <span style={{
      fontFamily: T.mono, fontSize: 9, letterSpacing: "0.14em",
      textTransform: "uppercase", color,
      border: `0.5px solid ${color}`,
      borderRadius: 2, padding: "2px 6px",
      background: `${color}14`,
    }}>
      {children}
    </span>
  );
}

function Separator({ style = {} }) {
  return <div style={{ height: 1, background: T.border, ...style }} />;
}

// ─── TRAJECTORY INDICATOR ─────────────────────────────────────────────────────
function TauDistance({ S, mode }) {
  const dist = S - TAU;
  const pct = Math.max(0, Math.min(1, dist / (1 - TAU)));
  const crossing = S < TAU;
  const modeColor = MODES[mode].color;

  return (
    <div style={{ padding: "1.2rem 1.4rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "0.6rem" }}>
        <Label>Distance to TAU</Label>
        <Mono style={{ fontSize: 10, color: crossing ? T.red : modeColor }}>
          {crossing ? "CROSSED" : `+${(dist * 100).toFixed(1)}%`}
        </Mono>
      </div>
      <div style={{ position: "relative", height: 3, background: T.border, borderRadius: 2, overflow: "hidden" }}>
        <div style={{
          position: "absolute", left: 0, top: 0, height: "100%",
          width: `${pct * 100}%`,
          background: crossing ? T.red : modeColor,
          borderRadius: 2,
          transition: "width 0.6s ease, background 0.4s ease",
          boxShadow: `0 0 8px ${crossing ? T.redGlow : modeColor + "40"}`,
        }} />
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: "0.35rem" }}>
        <Mono style={{ fontSize: 8, color: T.textDim }}>TAU={TAU}</Mono>
        <Mono style={{ fontSize: 8, color: T.textDim }}>S={S.toFixed(3)}</Mono>
      </div>
    </div>
  );
}

// ─── SLOPE INDICATOR ──────────────────────────────────────────────────────────
function SlopeArrow({ slope }) {
  const deg = Math.max(-60, Math.min(60, slope * 800));
  const color = slope < -0.003 ? T.red : slope < 0 ? T.amber : T.green;
  return (
    <span style={{
      display: "inline-block", transform: `rotate(${-deg}deg)`,
      color, fontSize: 14, transition: "transform 0.5s ease, color 0.4s ease",
      marginLeft: 4,
    }}>→</span>
  );
}

// ─── VARIABLE ROW ─────────────────────────────────────────────────────────────
function VarRow({ name, value, max = 1, accent, onChange, desc }) {
  return (
    <div style={{ marginBottom: "0.85rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.3rem" }}>
        <Mono style={{ fontSize: 11, color: accent, letterSpacing: "0.08em" }}>{name}</Mono>
        <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
          <span style={{ fontFamily: T.mono, fontSize: 10, color: T.text }}>{value.toFixed(2)}</span>
          {desc && <span style={{ fontFamily: T.sans, fontSize: 9, color: T.textDim }}>{desc}</span>}
        </div>
      </div>
      <div style={{ position: "relative", height: 2, background: T.border, borderRadius: 2, cursor: "pointer" }}
        onClick={e => {
          const rect = e.currentTarget.getBoundingClientRect();
          const v = Math.max(0.05, Math.min(0.95, (e.clientX - rect.left) / rect.width));
          onChange(v);
        }}
      >
        <div style={{
          position: "absolute", left: 0, top: 0, height: "100%",
          width: `${(value / max) * 100}%`,
          background: accent,
          borderRadius: 2,
          transition: "width 0.2s ease",
        }} />
        <div style={{
          position: "absolute", top: -4, left: `${(value / max) * 100}%`,
          transform: "translateX(-50%)",
          width: 10, height: 10, borderRadius: "50%",
          background: T.bg, border: `1.5px solid ${accent}`,
          cursor: "ew-resize",
        }} />
      </div>
    </div>
  );
}

// ─── MODE SELECTOR ───────────────────────────────────────────────────────────
function ModeSelector({ mode, setMode }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6, padding: "1.2rem 1.4rem" }}>
      <Label style={{ marginBottom: "0.5rem" }}>Proxy Mode</Label>
      {Object.values(MODES).map(m => {
        const active = mode === m.id;
        return (
          <button key={m.id} onClick={() => setMode(m.id)} style={{
            background: active ? `${m.color}18` : "transparent",
            border: `0.5px solid ${active ? m.color : T.border}`,
            borderRadius: 4, padding: "0.6rem 0.8rem",
            display: "flex", flexDirection: "column", gap: 2,
            cursor: "pointer", transition: "all 0.2s ease",
            textAlign: "left",
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <Mono style={{ fontSize: 9, color: active ? m.color : T.textMid, letterSpacing: "0.12em" }}>
                {m.label}
              </Mono>
              {active && <div style={{ width: 5, height: 5, borderRadius: "50%", background: m.color, boxShadow: `0 0 6px ${m.color}` }} />}
            </div>
            {active && (
              <div style={{ fontFamily: T.sans, fontSize: 9, color: T.textDim, lineHeight: 1.5, marginTop: 1 }}>
                {m.desc}
              </div>
            )}
          </button>
        );
      })}
    </div>
  );
}

// ─── CUSTOM TOOLTIP ──────────────────────────────────────────────────────────
function CustomTooltip({ active, payload }) {
  if (!active || !payload?.length) return null;
  const d = payload[0].payload;
  return (
    <div style={{
      background: T.bgCard, border: `0.5px solid ${T.border}`,
      borderRadius: 4, padding: "0.6rem 0.8rem",
      fontFamily: T.mono, fontSize: 9, lineHeight: 1.8,
    }}>
      <div style={{ color: T.textDim }}>t={d.t}</div>
      <div style={{ color: d.S < TAU ? T.red : T.text }}>S={d.S}</div>
      <div style={{ color: T.amber }}>K={d.K}</div>
      <div style={{ color: "#7a8fa8" }}>P={d.P} · V={d.V}</div>
    </div>
  );
}

// ─── SEISMOGRAPH ─────────────────────────────────────────────────────────────
function Seismograph({ data, mode, holding }) {
  const modeColor = MODES[mode].color;
  const crossings = data.filter(d => d.S < TAU).length;

  return (
    <div style={{ padding: "1.2rem 1.4rem 0.4rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.8rem" }}>
        <Label>S = K / (P × V + ε) · Trajectory</Label>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          {crossings > 0 && <Tag color={T.red}>{crossings} BREACH{crossings > 1 ? "ES" : ""}</Tag>}
          {holding && <Tag color={modeColor}>HOLDING</Tag>}
          <Tag color={T.textDim}>T={data.length}</Tag>
        </div>
      </div>
      <div style={{ position: "relative" }}>
        {holding && (
          <div style={{
            position: "absolute", inset: 0, zIndex: 10,
            background: "transparent",
            border: `1px solid ${modeColor}30`,
            borderRadius: 4,
            animation: "breathe 2.5s ease-in-out infinite",
            pointerEvents: "none",
          }} />
        )}
        <ResponsiveContainer width="100%" height={160}>
          <AreaChart data={data} margin={{ top: 8, right: 4, left: -32, bottom: 0 }}>
            <defs>
              <linearGradient id="sGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={modeColor} stopOpacity={0.15} />
                <stop offset="100%" stopColor={modeColor} stopOpacity={0} />
              </linearGradient>
              <linearGradient id="dangerGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={T.red} stopOpacity={0.25} />
                <stop offset="100%" stopColor={T.red} stopOpacity={0.05} />
              </linearGradient>
            </defs>
            <XAxis dataKey="t" hide />
            <YAxis domain={[0, 1]} hide />
            <ReferenceLine y={TAU} stroke={T.red} strokeDasharray="3 4" strokeWidth={0.8} />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone" dataKey="S"
              stroke={modeColor}
              strokeWidth={1.2}
              fill="url(#sGrad)"
              dot={false}
              animationDuration={400}
            />
          </AreaChart>
        </ResponsiveContainer>
        <div style={{
          position: "absolute", right: 4, top: "50%", transform: "translateY(-50%)",
          display: "flex", alignItems: "center", gap: 2,
        }}>
          <Mono style={{ fontSize: 8, color: T.red }}>τ</Mono>
        </div>
      </div>
    </div>
  );
}

// ─── LIVE EVENT FEED ─────────────────────────────────────────────────────────
function EventFeed({ events, mode }) {
  const modeColor = MODES[mode].color;
  const ref = useRef(null);
  useEffect(() => {
    if (ref.current) ref.current.scrollTop = ref.current.scrollHeight;
  }, [events]);

  return (
    <div style={{ padding: "0 1.4rem 1.2rem" }}>
      <Label style={{ marginBottom: "0.5rem" }}>Event Ledger</Label>
      <div ref={ref} style={{
        height: 96, overflowY: "auto", display: "flex", flexDirection: "column", gap: 3,
        scrollbarWidth: "none",
      }}>
        {events.slice(-18).map((ev, i) => (
          <div key={i} style={{
            display: "flex", gap: 8, alignItems: "baseline",
            opacity: 0.4 + (i / events.slice(-18).length) * 0.6,
          }}>
            <Mono style={{ fontSize: 8, color: T.textDim, flexShrink: 0 }}>
              {String(ev.t).padStart(4, "0")}
            </Mono>
            <Mono style={{ fontSize: 8, color: ev.blocked ? T.red : ev.flagged ? T.amber : T.textMid }}>
              {ev.blocked ? "■ BLOCK" : ev.flagged ? "◆ FLAG " : "· PASS "}
            </Mono>
            <Mono style={{ fontSize: 8, color: T.textDim }}>
              S={ev.S.toFixed(3)}
            </Mono>
            <span style={{ fontFamily: T.sans, fontSize: 8, color: T.textDim, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
              {ev.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── HOLDING PANEL ───────────────────────────────────────────────────────────
function HoldingPanel({ S, mode, onResume, onClose }) {
  const modeColor = MODES[mode].color;
  return (
    <div style={{
      position: "absolute", inset: 0, zIndex: 50,
      background: `${T.bg}f2`,
      backdropFilter: "blur(4px)",
      display: "flex", alignItems: "center", justifyContent: "center",
      flexDirection: "column", gap: "1.2rem",
      animation: "fadeIn 0.3s ease",
    }}>
      <div style={{
        width: 52, height: 52, borderRadius: "50%",
        border: `1.5px solid ${modeColor}`,
        display: "flex", alignItems: "center", justifyContent: "center",
        animation: "pulse 2.5s ease-in-out infinite",
      }}>
        <Mono style={{ fontSize: 16, color: modeColor }}>⊙</Mono>
      </div>
      <div style={{ textAlign: "center" }}>
        <div style={{ fontFamily: T.serif, fontSize: 18, color: T.text, marginBottom: "0.3rem", letterSpacing: "0.02em" }}>
          HOLDING
        </div>
        <div style={{ fontFamily: T.sans, fontSize: 11, color: T.textDim, maxWidth: 260, lineHeight: 1.6 }}>
          S = {S.toFixed(3)} · TAU proximity critical.<br />
          System is absorbing pressure without transmitting.
        </div>
      </div>
      <div style={{ display: "flex", gap: 8 }}>
        <button onClick={onResume} style={{
          fontFamily: T.mono, fontSize: 9, letterSpacing: "0.12em",
          background: "transparent", border: `0.5px solid ${modeColor}`,
          borderRadius: 3, padding: "0.45rem 0.9rem",
          color: modeColor, cursor: "pointer",
        }}>RESUME SHADOW</button>
        <button onClick={onClose} style={{
          fontFamily: T.mono, fontSize: 9, letterSpacing: "0.12em",
          background: T.redFaint, border: `0.5px solid ${T.red}`,
          borderRadius: 3, padding: "0.45rem 0.9rem",
          color: T.red, cursor: "pointer",
        }}>CLOSE THE GLASS</button>
      </div>
    </div>
  );
}

// ─── MAIN ─────────────────────────────────────────────────────────────────────
export default function TenirMembrane() {
  const [mode, setMode] = useState("SHADOW_PASSIVE");
  const [K, setK] = useState(0.72);
  const [P, setP] = useState(0.38);
  const [V, setV] = useState(0.45);
  const [trace, setTrace] = useState(() => generateTrace(60));
  const [events, setEvents] = useState([]);
  const [holding, setHolding] = useState(false);
  const [tick, setTick] = useState(60);
  const [running, setRunning] = useState(true);
  const tickRef = useRef(tick);
  tickRef.current = tick;

  const S = computeS(K, P, V);
  const slope = trace.length > 3
    ? (trace[trace.length - 1].S - trace[trace.length - 4].S) / 3
    : 0;

  const modeConfig = MODES[mode];
  const modeColor = modeConfig.color;

  // Auto advance trace
  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => {
      const noise = (Math.random() - 0.5) * 0.04;
      const newK = Math.max(0.08, Math.min(0.95, K + noise * 0.6));
      const newP = Math.max(0.08, Math.min(0.95, P + noise * 0.5));
      const newV = Math.max(0.08, Math.min(0.95, V + noise * 0.45));
      const newS = computeS(newK, newP, newV);
      const t = tickRef.current + 1;

      // Determine event
      const blocked = mode === "FULL_FAIL_CLOSE" && newS < TAU;
      const flagged = mode === "SHADOW_CRITICAL" && newS < TAU;
      const labels = ["inference.run", "agent.execute", "proxy.observe", "ledger.write", "sync.check", "embed.call"];
      const label = labels[Math.floor(Math.random() * labels.length)];

      setTrace(prev => [...prev.slice(-79), { t, S: +newS.toFixed(3), K: +newK.toFixed(3), P: +newP.toFixed(3), V: +newV.toFixed(3) }]);
      setEvents(prev => [...prev.slice(-99), { t, S: newS, blocked, flagged, label }]);
      setTick(t);

      // Auto-hold if S drops critically in fail-close or shadow-critical
      if ((mode === "FULL_FAIL_CLOSE" || mode === "SHADOW_CRITICAL") && newS < TAU * 0.85) {
        setHolding(true);
      }
    }, 800);
    return () => clearInterval(id);
  }, [running, K, P, V, mode]);

  // Stats
  const crossings = trace.filter(d => d.S < TAU).length;
  const avgS = (trace.reduce((s, d) => s + d.S, 0) / trace.length).toFixed(3);

  return (
    <div style={{
      background: T.bg,
      minHeight: "100vh",
      fontFamily: T.sans,
      color: T.text,
      display: "flex",
      flexDirection: "column",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;1,400&family=DM+Sans:wght@300;400;500&family=Space+Mono:ital@0;1&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { display: none; }
        button { outline: none; }
        @keyframes pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.6;transform:scale(0.96)} }
        @keyframes breathe { 0%,100%{box-shadow:0 0 0 0 transparent} 50%{box-shadow:0 0 12px 2px ${T.redGlow}} }
        @keyframes fadeIn { from{opacity:0} to{opacity:1} }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0.3} }
      `}</style>

      {/* ── HEADER ── */}
      <div style={{
        padding: "1rem 1.6rem",
        borderBottom: `0.5px solid ${T.border}`,
        display: "flex", justifyContent: "space-between", alignItems: "center",
        background: T.bgSurface,
      }}>
        <div style={{ display: "flex", gap: "1.2rem", alignItems: "baseline" }}>
          <div style={{ fontFamily: T.serif, fontSize: 15, letterSpacing: "0.04em", color: T.text }}>
            TENIR<span style={{ color: T.textDim }}>/</span>TAU
          </div>
          <Mono style={{ fontSize: 9, color: T.textDim }}>v4 · Governance Membrane</Mono>
        </div>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <div style={{
            width: 5, height: 5, borderRadius: "50%",
            background: running ? modeColor : T.textDim,
            boxShadow: running ? `0 0 5px ${modeColor}` : "none",
            animation: running ? "blink 2s ease infinite" : "none",
          }} />
          <Tag color={modeColor}>{modeConfig.label}</Tag>
          <button
            onClick={() => setRunning(r => !r)}
            style={{
              fontFamily: T.mono, fontSize: 8, letterSpacing: "0.14em",
              background: "transparent", border: `0.5px solid ${T.border}`,
              borderRadius: 3, padding: "0.3rem 0.6rem", color: T.textMid, cursor: "pointer",
            }}
          >
            {running ? "PAUSE" : "RESUME"}
          </button>
        </div>
      </div>

      {/* ── MAIN GRID ── */}
      <div style={{ flex: 1, display: "grid", gridTemplateColumns: "1fr 300px", overflow: "auto" }}>

        {/* ── LEFT PANEL ── */}
        <div style={{ borderRight: `0.5px solid ${T.border}`, position: "relative", overflow: "hidden" }}>

          {/* S FORMULA HERO */}
          <div style={{
            padding: "1.6rem 1.4rem 1.2rem",
            borderBottom: `0.5px solid ${T.border}`,
            background: T.bgSurface,
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <div>
                <Label style={{ marginBottom: "0.5rem" }}>Stability Index</Label>
                <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
                  <div style={{
                    fontFamily: T.serif, fontSize: 42, fontWeight: 400,
                    color: S < TAU ? T.red : S < 0.6 ? T.amber : T.text,
                    transition: "color 0.5s ease",
                    letterSpacing: "-0.02em", lineHeight: 1,
                  }}>
                    {S.toFixed(3)}
                  </div>
                  <SlopeArrow slope={slope} />
                </div>
                <div style={{ marginTop: "0.5rem", display: "flex", gap: 6, flexWrap: "wrap" }}>
                  <Mono style={{ fontSize: 10, color: T.amber }}>K={K.toFixed(2)}</Mono>
                  <Mono style={{ fontSize: 10, color: "#7a8fa8" }}>P={P.toFixed(2)}</Mono>
                  <Mono style={{ fontSize: 10, color: "#8fa87a" }}>V={V.toFixed(2)}</Mono>
                  <Mono style={{ fontSize: 10, color: T.textDim }}>S=K÷(P×V+ε)</Mono>
                </div>
              </div>
              <div style={{ textAlign: "right" }}>
                <Label style={{ marginBottom: "0.3rem" }}>Session</Label>
                <Mono style={{ fontSize: 10, color: T.textMid }}>t={tick}</Mono>
                <div style={{ marginTop: "0.3rem" }}>
                  <Mono style={{ fontSize: 10, color: T.textMid }}>avg={avgS}</Mono>
                </div>
                {crossings > 0 && (
                  <div style={{ marginTop: "0.3rem" }}>
                    <Mono style={{ fontSize: 10, color: T.red }}>{crossings} breach{crossings > 1 ? "es" : ""}</Mono>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* TAU DISTANCE */}
          <div style={{ borderBottom: `0.5px solid ${T.border}` }}>
            <TauDistance S={S} mode={mode} />
          </div>

          {/* SEISMOGRAPH */}
          <div style={{ borderBottom: `0.5px solid ${T.border}` }}>
            <Seismograph data={trace} mode={mode} holding={holding} />
          </div>

          {/* VARIABLE CONTROLS */}
          <div style={{ padding: "1.2rem 1.4rem", borderBottom: `0.5px solid ${T.border}` }}>
            <Label style={{ marginBottom: "0.85rem" }}>Pressure Inputs · Click bar to adjust</Label>
            <VarRow name="K · Epistemic Capacity" value={K} accent={T.amber}
              onChange={setK} desc="knowledge quality" />
            <VarRow name="P · Systemic Pressure" value={P} accent="#7a8fa8"
              onChange={setP} desc="force magnitude" />
            <VarRow name="V · Velocity" value={V} accent="#8fa87a"
              onChange={setV} desc="decision speed" />
          </div>

          {/* EVENT FEED */}
          <div>
            <EventFeed events={events} mode={mode} />
          </div>

          {/* HOLDING OVERLAY */}
          {holding && (
            <HoldingPanel
              S={S} mode={mode}
              onResume={() => setHolding(false)}
              onClose={() => { setHolding(false); setRunning(false); }}
            />
          )}
        </div>

        {/* ── RIGHT PANEL ── */}
        <div style={{ display: "flex", flexDirection: "column", background: T.bgSurface }}>

          {/* MODE SELECTOR */}
          <div style={{ borderBottom: `0.5px solid ${T.border}` }}>
            <ModeSelector mode={mode} setMode={(m) => { setMode(m); setHolding(false); }} />
          </div>

          {/* INVARIANT STATUS */}
          <div style={{ padding: "1.2rem 1.4rem", borderBottom: `0.5px solid ${T.border}` }}>
            <Label style={{ marginBottom: "0.7rem" }}>Invariant Watch</Label>
            {[
              { label: "TAU preserved", ok: S >= TAU },
              { label: "Epistemic coverage", ok: K > 0.5 },
              { label: "Velocity bounded", ok: V < 0.75 },
              { label: "Membrane active", ok: mode !== "SHADOW_PASSIVE" || true },
              { label: "Ledger coherent", ok: true },
            ].map((item, i) => (
              <div key={i} style={{
                display: "flex", justifyContent: "space-between",
                padding: "0.35rem 0", borderBottom: i < 4 ? `0.5px solid ${T.borderFaint}` : "none",
              }}>
                <span style={{ fontFamily: T.sans, fontSize: 10, color: T.textDim }}>{item.label}</span>
                <Mono style={{ fontSize: 9, color: item.ok ? T.green : T.red }}>
                  {item.ok ? "OK" : "FAIL"}
                </Mono>
              </div>
            ))}
          </div>

          {/* DOCTRINE NOTE */}
          <div style={{ padding: "1.2rem 1.4rem", borderBottom: `0.5px solid ${T.border}` }}>
            <Label style={{ marginBottom: "0.6rem" }}>Active Doctrine</Label>
            <div style={{
              fontFamily: T.serif, fontSize: 11, fontStyle: "italic",
              color: T.textDim, lineHeight: 1.75,
            }}>
              {mode === "SHADOW_PASSIVE" && '"Observe without disturbing. The membrane is present but invisible. Trust is being calibrated."'}
              {mode === "SHADOW_CRITICAL" && '"Flag the approach to the threshold. Do not yet block. Surface what the dashboard cannot see."'}
              {mode === "FULL_FAIL_CLOSE" && '"No action passes TAU. The sovereign posture is not control—it is the refusal to let capability become legitimacy."'}
            </div>
          </div>

          {/* HOLDING TRIGGER */}
          <div style={{ padding: "1.2rem 1.4rem", marginTop: "auto" }}>
            <Label style={{ marginBottom: "0.6rem" }}>Manual Override</Label>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <button
                onClick={() => setHolding(true)}
                disabled={holding}
                style={{
                  fontFamily: T.mono, fontSize: 8, letterSpacing: "0.14em",
                  background: "transparent",
                  border: `0.5px solid ${holding ? T.textDim : modeColor}`,
                  borderRadius: 3, padding: "0.45rem",
                  color: holding ? T.textDim : modeColor,
                  cursor: holding ? "default" : "pointer",
                }}
              >
                TRIGGER HOLD
              </button>
              <button
                onClick={() => {
                  setTrace(generateTrace(60, Math.random() * 100));
                  setTick(60);
                  setEvents([]);
                  setHolding(false);
                }}
                style={{
                  fontFamily: T.mono, fontSize: 8, letterSpacing: "0.14em",
                  background: "transparent",
                  border: `0.5px solid ${T.border}`,
                  borderRadius: 3, padding: "0.45rem",
                  color: T.textDim, cursor: "pointer",
                }}
              >
                RESET SESSION
              </button>
            </div>
          </div>

          {/* FOOTER */}
          <div style={{
            padding: "0.8rem 1.4rem",
            borderTop: `0.5px solid ${T.border}`,
            display: "flex", justifyContent: "space-between", alignItems: "center",
          }}>
            <Mono style={{ fontSize: 8, color: T.textDim }}>TENIR v4 · RC</Mono>
            <Mono style={{ fontSize: 8, color: T.textDim }}>A. Skiredj · 2026</Mono>
          </div>
        </div>
      </div>
    </div>
  );
}
