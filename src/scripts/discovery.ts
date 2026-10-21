type RegSource = {
  source_id: string;
  name: string;
  source_kind: string;
  authority_uri: string;
};
type ReportSource = RegSource & { section: string; source_version: string };
type RegFinding = {
  finding_id: string;
  title: string;
  assumption_id: string;
  assessment: 'open_question' | 'conditional' | 'structural_conflict';
  relationship: string;
  failure_path: string;
  clarifying_question: string;
  candidate_invariants: { id: string; condition: string }[];
  source_refs: { source_id: string; section: string }[];
};
type RegReport = {
  report_id: string;
  catalog_version: string;
  mode: 'exploratory' | 'contextualized';
  selected_sources: ReportSource[];
  behavior: null | { claim: string; scope: string };
  findings: RegFinding[];
};
type RegProjection = {
  projection_version: string;
  catalog_version: string;
  catalog_sha256: string;
  sources: RegSource[];
  exploratory_reports: Record<string, RegReport>;
  fictional_demo: { label: string; report: RegReport };
};

const node = <T extends HTMLElement>(tag: string, name?: string, value?: string): T => {
  const el = document.createElement(tag) as T;
  if (name) el.className = name;
  if (value !== undefined) el.textContent = value;
  return el;
};

function isProjection(data: unknown): data is RegProjection {
  if (!data || typeof data !== 'object') return false;
  const x = data as Record<string, unknown>;
  return x.projection_version === 'discovery-presentation-v0.1.0'
    && Array.isArray(x.sources) && x.sources.length === 5
    && typeof x.catalog_sha256 === 'string' && /^[a-f0-9]{64}$/.test(x.catalog_sha256)
    && typeof x.exploratory_reports === 'object' && !!x.exploratory_reports
    && typeof x.fictional_demo === 'object' && !!x.fictional_demo;
}

document.querySelectorAll<HTMLElement>('[data-reg-discovery]').forEach(async (root) => {
  const fr = root.dataset.locale !== 'en';
  const label = (f: string, e: string) => fr ? f : e;
  const cards = root.querySelector<HTMLElement>('[data-reg-cards]');
  const load = root.querySelector<HTMLElement>('[data-reg-load]');
  const generate = root.querySelector<HTMLButtonElement>('[data-reg-generate]');
  const example = root.querySelector<HTMLButtonElement>('[data-reg-example]');
  const output = root.querySelector<HTMLElement>('[data-reg-output]');
  const findings = root.querySelector<HTMLElement>('[data-reg-findings]');
  const intro = root.querySelector<HTMLElement>('[data-reg-intro]');
  const reportTitle = root.querySelector<HTMLElement>('[data-reg-report-title]');
  const metadata = root.querySelector<HTMLElement>('[data-reg-metadata]');
  if (!cards || !load || !generate || !example || !output || !findings || !intro || !reportTitle || !metadata) return;

  let projection: RegProjection;
  try {
    const response = await fetch('/discovery/projection-v0.1.json', { cache: 'no-store' });
    if (!response.ok) throw new Error(String(response.status));
    const data: unknown = await response.json();
    if (!isProjection(data)) throw new Error('Invalid projection contract');
    projection = data;
  } catch {
    load.textContent = label('Prévisualisation indisponible pour le moment. Vous pouvez demander un Challenge par e-mail.',
      'Preview temporarily unavailable. You can still request a Challenge by email.');
    return;
  }

  const sourceNames: Record<string, [string, string]> = {
    binding_law: ['Loi · applicabilité non évaluée', 'Law · applicability not assessed'],
    voluntary_framework: ['Cadre volontaire', 'Voluntary framework'],
    management_standard: ['Norme de management', 'Management standard'],
    recommendation: ['Recommandation', 'Recommendation'],
    draft: ['Projet', 'Draft'],
  };

  for (const source of projection.sources) {
    const card = node<HTMLLabelElement>('label', 'reg-source');
    const input = node<HTMLInputElement>('input');
    input.type = 'checkbox';
    input.value = source.source_id;
    input.setAttribute('aria-label', source.name);
    card.append(input,
      node<HTMLSpanElement>('span', 'reg-source-name', source.name),
      node<HTMLSpanElement>('span', 'reg-source-kind', (sourceNames[source.source_kind] ?? [source.source_kind, source.source_kind])[fr ? 0 : 1]));
    cards.append(card);
    input.addEventListener('change', () => {
      const count = cards.querySelectorAll('input:checked').length;
      generate.disabled = count === 0;
      load.textContent = label(`${count} référentiel(s) sélectionné(s)`, `${count} framework(s) selected`);
    });
  }
  load.textContent = label('Catalogue chargé : sélectionnez un ou plusieurs référentiels.',
    'Catalogue loaded: select one or more frameworks.');
  example.disabled = false;

  let activeReport: RegReport | null = null;
  const show = (report: RegReport, fictional: boolean) => {
    activeReport = report;
    findings.replaceChildren();
    reportTitle.textContent = fictional
      ? label('PayFlow — scénario fictif', 'PayFlow — fictional scenario')
      : label('Les hypothèses à challenger', 'Assumptions worth challenging');
    intro.textContent = report.behavior?.claim ?? label(
      'Sans comportement déclaré, REG présente des questions exploratoires, pas un diagnostic du système.',
      'Without a declared system behavior, REG offers exploratory questions, not a system assessment.');
    const conflicts = report.findings.filter(f => f.assessment === 'structural_conflict').length;
    metadata.textContent = `${report.catalog_version} · ${report.findings.length} ${label('questions', 'findings')} · ${conflicts} ${label('contradictions entre prémisses déclarées', 'declared-premise contradictions')} · SHA ${projection.catalog_sha256.slice(0, 12)}`;

    for (const finding of report.findings) {
      const article = node<HTMLElement>('article', 'reg-finding');
      const state = finding.assessment === 'structural_conflict'
        ? label('CONTRADICTION DANS LES PRÉMISSES DÉCLARÉES', 'CONFLICT IN DECLARED PREMISES')
        : finding.assessment === 'conditional'
          ? label('CONDITIONNEL', 'CONDITIONAL')
          : label('QUESTION OUVERTE', 'OPEN QUESTION');
      article.append(
        node<HTMLDivElement>('div', `reg-tag${finding.assessment === 'structural_conflict' ? ' reg-conflict' : ''}`, `${finding.assumption_id} · ${state}`),
        node<HTMLHeadingElement>('h4', '', finding.title),
        node<HTMLParagraphElement>('p', '', finding.failure_path),
        node<HTMLParagraphElement>('p', 'reg-question', finding.clarifying_question));
      if (finding.candidate_invariants.length) {
        article.append(node<HTMLParagraphElement>('p', 'reg-tag',
          label('Invariants candidats — non démontrés', 'Candidate invariants — not demonstrated')));
        const ul = node<HTMLUListElement>('ul');
        for (const invariant of finding.candidate_invariants) {
          ul.append(node<HTMLLIElement>('li', '', invariant.condition));
        }
        article.append(ul);
      }
      const refs = node<HTMLDivElement>('div', 'reg-references');
      for (const ref of finding.source_refs) {
        const known = report.selected_sources.find(s => s.source_id === ref.source_id);
        if (!known) continue;
        try {
          const destination = new URL(known.authority_uri);
          if (destination.protocol !== 'https:') continue;
          const anchor = node<HTMLAnchorElement>('a', '', `${ref.source_id} · ${ref.section}`);
          anchor.href = destination.href;
          anchor.rel = 'noopener noreferrer';
          anchor.target = '_blank';
          refs.append(anchor);
        } catch { /* malformed sources are excluded */ }
      }
      article.append(refs);
      findings.append(article);
    }
    output.hidden = false;
    output.scrollIntoView({ block: 'start', behavior: 'smooth' });
  };

  const selection = () => [...cards.querySelectorAll<HTMLInputElement>('input:checked')]
    .map(x => x.value).sort();
  generate.addEventListener('click', () => {
    const ids = selection();
    if (!ids.length) return;
    const report = projection.exploratory_reports[ids.join('+')];
    if (!report || report.mode !== 'exploratory') {
      load.textContent = label('Rapport non disponible pour cette sélection.', 'No report available for this selection.');
      return;
    }
    show(report, false);
  });
  example.addEventListener('click', () => {
    const report = projection.fictional_demo?.report;
    if (report && report.mode === 'contextualized') show(report, true);
  });
  root.querySelector('[data-reg-print]')?.addEventListener('click', () => window.print());
  root.querySelector('[data-reg-export]')?.addEventListener('click', () => {
    if (!activeReport) return;
    const json = JSON.stringify(activeReport, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const anchor = node<HTMLAnchorElement>('a');
    anchor.href = url;
    anchor.download = activeReport.report_id + '.json';
    anchor.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  });
});
