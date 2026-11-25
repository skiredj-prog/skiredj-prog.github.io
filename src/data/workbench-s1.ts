// Illustrative readings for the public TENIR Workbench (S1).
// Every figure is a drawing on this page. Nothing here is the scoring kernel.

export type Locale = "fr" | "en";
export type ChoiceId = "hold" | "ease" | "buffer";
export type StressBand = "calm" | "marked" | "high";

export interface Reading {
  pressure: number;
  capacity: number;
  variance: number;
  options: number;
}

export const DEFAULT_READING: Reading = {
  pressure: 55,
  capacity: 75,
  variance: 25,
  options: 60,
};

/** Constants drawn on the frozen v5.0.0 interface. Not a policy read. */
export const DRAWING_MARKS = { tau: 0.42, block: 0.75, alert: 0.9 } as const;

export const GAUGE = { cx: 100, cy: 98, r: 70 } as const;

export const syntheticLabel: Record<Locale, string> = {
  fr: "Illustratif / synthétique",
  en: "Illustrative / synthetic",
};

export const disclaimer: Record<Locale, string> = {
  fr: "Ceci est un concept de communication interactif, et non le noyau de score TENIR, un système physique mesuré, ou une adjudication de politique réelle.",
  en: "This is an interactive communication concept, not the TENIR scoring kernel, a measured physical system, or an actual policy adjudication.",
};

const CHOICES: readonly ChoiceId[] = ["hold", "ease", "buffer"];

export function isChoice(value: string): value is ChoiceId {
  return (CHOICES as readonly string[]).includes(value);
}

function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n));
}

export function clampPct(n: number) {
  return clamp(Math.round(n), 0, 100);
}

export function normalize(raw: Reading): Reading {
  return {
    pressure: clampPct(raw.pressure),
    capacity: clampPct(raw.capacity),
    variance: clampPct(raw.variance),
    options: clampPct(raw.options),
  };
}

export function marginPoints(reading: Reading) {
  return reading.capacity - reading.pressure;
}

/** Higher means less illustrated room. Not a kernel score. */
export function illustrativeStress(reading: Reading) {
  const pressure = reading.pressure / 100;
  const capacity = Math.max(reading.capacity / 100, 0.05);
  const variance = reading.variance / 100;
  const options = reading.options / 100;
  const raw = (pressure / capacity) * (0.72 + 0.28 * variance) * (1.05 - 0.2 * options);
  return Math.round(clamp(raw, 0, 1) * 1000) / 1000;
}

export type PostureId = "wide" | "reduced" | "thin" | "beyond";

export function postureId(margin: number): PostureId {
  if (margin < 0) return "beyond";
  if (margin < 15) return "thin";
  if (margin < 40) return "reduced";
  return "wide";
}

export function stressBand(stress: number): StressBand {
  if (stress < DRAWING_MARKS.tau) return "calm";
  if (stress < DRAWING_MARKS.block) return "marked";
  return "high";
}

function localeTag(locale: Locale) {
  return locale === "fr" ? "fr-FR" : "en-GB";
}

export function formatInt(locale: Locale, n: number) {
  return Math.round(n).toLocaleString(localeTag(locale));
}

export function formatFixed(locale: Locale, n: number, digits = 2) {
  return n.toLocaleString(localeTag(locale), {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  });
}

function round1(n: number) {
  return Math.round(n * 10) / 10;
}

export function gaugePoint(t: number, radius = GAUGE.r) {
  const theta = Math.PI * (1 - clamp(t, 0, 1));
  return {
    x: round1(GAUGE.cx + radius * Math.cos(theta)),
    y: round1(GAUGE.cy - radius * Math.sin(theta)),
  };
}

export function gaugeGeometry(stress: number) {
  const start = gaugePoint(0);
  const end = gaugePoint(1);
  const tip = gaugePoint(stress);
  const length = Math.PI * GAUGE.r;
  return {
    track: `M ${start.x} ${start.y} A ${GAUGE.r} ${GAUGE.r} 0 0 1 ${end.x} ${end.y}`,
    dash: clamp(stress, 0, 1) * length,
    length,
    tip,
  };
}

export function gaugeTicks() {
  return [DRAWING_MARKS.tau, DRAWING_MARKS.block, DRAWING_MARKS.alert].map((t) => {
    const inner = gaugePoint(t, GAUGE.r - 8);
    const outer = gaugePoint(t, GAUGE.r + 7);
    return { t, x1: inner.x, y1: inner.y, x2: outer.x, y2: outer.y };
  });
}

/** A smooth illustrated approach into the current reading. The last point is that reading. */
export function approachSeries(end: Reading, n = 18): Reading[] {
  const start = { pressure: 30, capacity: 90, variance: 10, options: 78 };
  const points: Reading[] = [];
  for (let i = 0; i < n; i += 1) {
    if (i === n - 1) {
      points.push(end);
      break;
    }
    const u = (i / (n - 1)) ** 1.4;
    points.push({
      pressure: start.pressure + (end.pressure - start.pressure) * u,
      capacity: start.capacity + (end.capacity - start.capacity) * u,
      variance: start.variance + (end.variance - start.variance) * u,
      options: start.options + (end.options - start.options) * u,
    });
  }
  return points;
}

export function seriesPoints(values: number[], width = 300, height = 112) {
  const left = 6;
  const right = 6;
  const top = 10;
  const bottom = 14;
  const innerW = width - left - right;
  const innerH = height - top - bottom;
  return values
    .map((value, index) => {
      const x = left + (values.length === 1 ? innerW / 2 : (index / (values.length - 1)) * innerW);
      const y = top + (1 - clamp(value, 0, 100) / 100) * innerH;
      return `${round1(x)},${round1(y)}`;
    })
    .join(" ");
}

export interface IllustratedStep {
  after: Reading;
  applied: boolean;
  kind: "flat" | "eased" | "buffered" | "buffer-unavailable";
}

/** Story step on this page only. Fifteen and ten are narrative deltas, not a physical model. */
export function illustratedStep(before: Reading, choice: ChoiceId): IllustratedStep {
  if (choice === "hold") return { after: before, applied: true, kind: "flat" };
  if (choice === "ease") {
    return { after: normalize({ ...before, pressure: before.pressure - 15 }), applied: true, kind: "eased" };
  }
  if (before.options <= 30) return { after: before, applied: false, kind: "buffer-unavailable" };
  return {
    after: normalize({ ...before, capacity: before.capacity + 10, options: before.options - 15 }),
    applied: true,
    kind: "buffered",
  };
}

const postureName: Record<Locale, Record<PostureId, string>> = {
  fr: {
    wide: "Marge large",
    reduced: "Marge réduite",
    thin: "Marge mince",
    beyond: "Hors de l’enveloppe illustrative",
  },
  en: {
    wide: "Wide margin",
    reduced: "Reduced margin",
    thin: "Thin margin",
    beyond: "Outside the illustrative envelope",
  },
};

const choiceName: Record<Locale, Record<ChoiceId, string>> = {
  fr: { hold: "Tenir le régime", ease: "Relâcher la charge", buffer: "Ouvrir un tampon temporaire" },
  en: { hold: "Hold the rate", ease: "Ease the load", buffer: "Open a temporary buffer" },
};

function sentenceFor(locale: Locale, reading: Reading, margin: number) {
  const posture = postureId(margin);
  const highVariance = reading.variance >= 55;
  const fewOptions = reading.options <= 20;
  if (locale === "fr") {
    if (posture === "reduced" && !highVariance && !fewOptions) {
      return "Le système reste dans l’enveloppe illustrative, mais sa capacité à absorber de nouvelles perturbations est réduite.";
    }
    if (posture === "reduced") {
      const extra = [
        highVariance ? "La variance dessinée est haute : la même marge encaisse moins." : "",
        fewOptions ? "La page dessine peu d’options restantes." : "",
      ].filter(Boolean).join(" ");
      return `Le système reste dans l’enveloppe illustrative, mais sa capacité à absorber de nouvelles perturbations est réduite. ${extra}`;
    }
    if (posture === "wide") {
      return "La marge illustrative peut encore encaisser une perturbation modérée sur ce dessin. Rien n’est mesuré.";
    }
    if (posture === "thin") {
      return "La marge illustrative est presque épuisée. Une pression plus haute ou une capacité plus basse sortirait de l’enveloppe de cette page.";
    }
    return "Sur l’échelle de cette page, la pression dépasse la capacité. Le dessin ne montre plus de marge. Il n’adjuge aucun système réel.";
  }
  if (posture === "reduced" && !highVariance && !fewOptions) {
    return "The system remains within the illustrative envelope, but its ability to absorb further disturbances is reduced.";
  }
  if (posture === "reduced") {
    const extra = [
      highVariance ? "The drawn variance is high, so the same margin absorbs less." : "",
      fewOptions ? "The page draws few remaining options." : "",
    ].filter(Boolean).join(" ");
    return `The system remains within the illustrative envelope, but its ability to absorb further disturbances is reduced. ${extra}`;
  }
  if (posture === "wide") {
    return "The illustrative margin can still absorb a moderate disturbance on this drawing. Nothing here is measured.";
  }
  if (posture === "thin") {
    return "The illustrative margin is nearly spent. Higher pressure or lower capacity would leave the envelope used on this page.";
  }
  return "On this page’s scale, pressure exceeds capacity. The drawing shows no remaining margin. It does not adjudicate a real system.";
}

function stressMark(locale: Locale, stress: number) {
  const { tau, block, alert } = DRAWING_MARKS;
  if (locale === "fr") {
    if (stress < tau) return "Sous la marque τ du dessin (0,42).";
    if (stress < block) return "Entre les marques τ (0,42) et blocage (0,75) du dessin.";
    if (stress < alert) return "Entre les marques blocage (0,75) et alerte (0,90) du dessin.";
    return "Au-delà de la marque alerte (0,90) du dessin.";
  }
  if (stress < tau) return "Below the drawing’s τ mark (0.42).";
  if (stress < block) return "Between the drawing’s τ (0.42) and block (0.75) marks.";
  if (stress < alert) return "Between the drawing’s block (0.75) and alert (0.90) marks.";
  return "Past the drawing’s alert mark (0.90).";
}

function transitionText(locale: Locale, kind: IllustratedStep["kind"]) {
  const fr = locale === "fr";
  if (kind === "flat") {
    return fr
      ? "Le pas illustré est plat : tenir le régime ne rend pas de marge. Avant et après sont la même lecture. Ce n’est pas une transition de mode."
      : "The illustrated step is flat: holding the rate does not restore margin. Before and after are the same reading. This is not a mode transition.";
  }
  if (kind === "eased") {
    return fr
      ? "Le pas illustré baisse la pression de 15 points sur cette page. La marge dessinée augmente d’autant, sans descendre sous zéro. Aucun procédé n’est touché. Ce n’est pas une transition de mode."
      : "The illustrated step lowers pressure by 15 points on this page. The drawn margin rises by the same amount, and pressure does not go below zero. No process is touched. This is not a mode transition.";
  }
  if (kind === "buffered") {
    return fr
      ? "Le pas illustré ajoute 10 points de capacité et retire 15 points d’options. C’est un récit, pas une ressource obtenue. Ce n’est pas une transition de mode."
      : "The illustrated step adds 10 points of capacity and removes 15 points of options. It is a story step, not a resource obtained. This is not a mode transition.";
  }
  return fr
    ? "Le pas tampon n’est pas dessiné : les options illustratives sont à 30 % ou moins. Aucune commande n’est émise. Le choix reste lisible, il ne change pas les chiffres."
    : "The buffer step is not drawn: illustrative options are at or below 30%. No command is sent. The choice can still be read, and it does not change the figures.";
}

function correctionText(locale: Locale, after: Reading) {
  const fr = locale === "fr";
  const margin = marginPoints(after);
  if (after.options >= 50) {
    return fr
      ? `La page dessine encore plusieurs suites (options ${formatInt(locale, after.options)} %, marge ${formatInt(locale, margin)} pts). Corriger resterait possible dans ce dessin. Cela ne prouve pas qu’un système réel puisse être corrigé.`
      : `The page still draws several next steps (options ${formatInt(locale, after.options)}%, margin ${formatInt(locale, margin)} pts). Correction would remain possible in this drawing. That does not prove a real system can be corrected.`;
  }
  if (after.options >= 20) {
    return fr
      ? `La page dessine une suite, avec moins de choix (options ${formatInt(locale, after.options)} %, marge ${formatInt(locale, margin)} pts).`
      : `The page draws a next step, with less room to choose (options ${formatInt(locale, after.options)}%, margin ${formatInt(locale, margin)} pts).`;
  }
  return fr
    ? `La page dessine peu de choix restants (options ${formatInt(locale, after.options)} %). Cela ne prouve pas qu’une correction réelle soit impossible.`
    : `The page draws little room left to choose (options ${formatInt(locale, after.options)}%). That does not prove a real correction is impossible.`;
}

export interface WorkbenchView {
  pressure: string;
  capacity: string;
  variance: string;
  options: string;
  optionUnit: string;
  margin: string;
  posture: string;
  sentence: string;
  stress: string;
  stressBand: StressBand;
  stressMark: string;
  envelope: string;
  delta: string;
  bufferStatus: string;
  decision: string;
  keeps: string;
  costs: string;
  uncertainty: string;
  transition: string;
  afterPressure: string;
  afterCapacity: string;
  afterMargin: string;
  afterOptions: string;
  afterPosture: string;
  evidence: string;
  unknowns: [string, string, string];
  correct: string;
  lines: { p: string; k: string; v: string; s: string };
  summary: string;
}

const keeps: Record<Locale, Record<ChoiceId, string>> = {
  fr: {
    hold: "Le débit prévu du récit reste en place.",
    ease: "La marge dessinée se reconstitue un peu.",
    buffer: "Une réserve temporaire est racontée, si les options illustratives le permettent.",
  },
  en: {
    hold: "The story’s planned throughput stays in place.",
    ease: "The drawn margin recovers a little.",
    buffer: "A temporary reserve is narrated, if the illustrative options allow it.",
  },
};

const costs: Record<Locale, Record<ChoiceId, string>> = {
  fr: {
    hold: "La capacité à encaisser une perturbation de plus est ce que ce choix dépense.",
    ease: "Le volume prévu du récit est ce que ce choix abandonne.",
    buffer: "Le temps, la coordination, et 15 points d’options illustratives sont ce que ce choix dépense.",
  },
  en: {
    hold: "What this choice spends is the ability to absorb one more disturbance.",
    ease: "What this choice gives up is the story’s planned volume.",
    buffer: "What this choice spends is time, coordination, and 15 points of illustrative options.",
  },
};

const choiceUncertainty: Record<Locale, Record<ChoiceId, string>> = {
  fr: {
    hold: "La taille de la prochaine perturbation n’est pas dans le dessin.",
    ease: "Le récit ne dit pas si le régime relâché sert encore le but choisi.",
    buffer: "Le tampon n’est pas une pièce. Rien n’établit qu’il arriverait à temps.",
  },
  en: {
    hold: "The size of the next disturbance is not in the drawing.",
    ease: "The story does not say whether the eased rate still serves the chosen purpose.",
    buffer: "The buffer is not evidence. Nothing establishes that it would arrive in time.",
  },
};

export function viewModel(
  locale: Locale,
  current: Reading,
  choice: ChoiceId,
  previous: Reading | null,
  series: Reading[],
): WorkbenchView {
  const reading = normalize(current);
  const margin = marginPoints(reading);
  const posture = postureId(margin);
  const stress = illustrativeStress(reading);
  const step = illustratedStep(reading, choice);
  const after = step.after;
  const afterMargin = marginPoints(after);
  const fr = locale === "fr";
  let delta = fr ? "Pas encore de mouvement sur cette page." : "No adjustment on this page yet.";
  if (previous) {
    const before = normalize(previous);
    const dMargin = margin - marginPoints(before);
    const dStress = stress - illustrativeStress(before);
    const signInt = (n: number) => `${n > 0 ? "+" : ""}${formatInt(locale, n)}`;
    const signFixed = (n: number) => `${n > 0 ? "+" : ""}${formatFixed(locale, n, 2)}`;
    delta = dMargin === 0 && dStress === 0
      ? (fr ? "Même lecture que l’ouverture de la page." : "Same reading as when the page opened.")
      : (fr
        ? `Depuis l’ouverture : marge ${signInt(dMargin)} pts, tension ${signFixed(dStress)}.`
        : `Since the page opened: margin ${signInt(dMargin)} pts, tension ${signFixed(dStress)}.`);
  }
  const sentence = sentenceFor(locale, reading, margin);
  const decision = choiceName[locale][choice];
  const envelope = margin >= 0
    ? (fr ? "Dans l’enveloppe illustrative" : "Inside the illustrative envelope")
    : (fr ? "Hors de l’enveloppe illustrative" : "Outside the illustrative envelope");
  const bufferStatus = reading.options <= 30
    ? (fr
      ? "Pas dessiné à ce niveau d’options (30 % ou moins)."
      : "Not drawn at this level of options (30% or below).")
    : (fr
      ? "Dessinable : le récit ajouterait 10 pts de capacité."
      : "Drawable: the story would add 10 pts of capacity.");
  const evidence = fr
    ? `La page détient seulement les curseurs : pression ${formatInt(locale, reading.pressure)} %, capacité ${formatInt(locale, reading.capacity)} %, variance ${formatInt(locale, reading.variance)} %, options ${formatInt(locale, reading.options)} %. Elle ne détient ni capteur, ni écriture de journal, ni signature, ni effet mesuré. Aucune empreinte n’est calculée.`
    : `The page holds only the sliders: pressure ${formatInt(locale, reading.pressure)}%, capacity ${formatInt(locale, reading.capacity)}%, variance ${formatInt(locale, reading.variance)}%, options ${formatInt(locale, reading.options)}%. It holds no sensor, no ledger write, no signature and no measured effect. No fingerprint is computed.`;
  const unknowns: [string, string, string] = [
    fr
      ? "La prochaine perturbation n’a pas de taille dans ce dessin."
      : "The next disturbance has no size in this drawing.",
    fr
      ? "La capacité est un curseur, pas une mesure qui pourrait être en retard ou fausse."
      : "Capacity is a slider, not a measurement that could be late or wrong.",
    step.kind === "buffer-unavailable"
      ? (fr
        ? "Le tampon choisi n’a pas été dessiné, faute d’options illustratives."
        : "The chosen buffer was not drawn, for lack of illustrative options.")
      : margin < 0
        ? (fr
          ? "La comparaison d’enveloppe est déjà dépassée. Le pas illustré peut ne pas la ramener."
          : "The envelope comparison is already past. The illustrated step may not bring it back.")
        : (fr
          ? "Le pas illustré n’établit pas que le but choisi est atteint."
          : "The illustrated step does not establish that the chosen purpose is met."),
  ];
  return {
    pressure: formatInt(locale, reading.pressure),
    capacity: formatInt(locale, reading.capacity),
    variance: formatInt(locale, reading.variance),
    options: formatInt(locale, reading.options),
    optionUnit: formatFixed(locale, reading.options / 100, 2),
    margin: formatInt(locale, margin),
    posture: postureName[locale][posture],
    sentence,
    stress: formatFixed(locale, stress, 2),
    stressBand: stressBand(stress),
    stressMark: stressMark(locale, stress),
    envelope,
    delta,
    bufferStatus,
    decision,
    keeps: keeps[locale][choice],
    costs: costs[locale][choice],
    uncertainty: choiceUncertainty[locale][choice],
    transition: transitionText(locale, step.kind),
    afterPressure: formatInt(locale, after.pressure),
    afterCapacity: formatInt(locale, after.capacity),
    afterMargin: formatInt(locale, afterMargin),
    afterOptions: formatInt(locale, after.options),
    afterPosture: postureName[locale][postureId(afterMargin)],
    evidence,
    unknowns,
    correct: correctionText(locale, after),
    lines: {
      p: seriesPoints(series.map((point) => point.pressure)),
      k: seriesPoints(series.map((point) => point.capacity)),
      v: seriesPoints(series.map((point) => point.variance)),
      s: seriesPoints(series.map((point) => illustrativeStress(point) * 100)),
    },
    summary: fr
      ? `Marge illustrative ${formatInt(locale, margin)} points. Posture : ${postureName[locale][posture]}. ${sentence}`
      : `Illustrative margin ${formatInt(locale, margin)} points. Posture: ${postureName[locale][posture]}. ${sentence}`,
  };
}
