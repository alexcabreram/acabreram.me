// Public subset of Seiryū (Atlas V0) shown on the home page.
// States are declared, never derived: on = En marcha, mid = Construyendo,
// off = Idea, core = Salem, empty = intentionally unassigned (Suzaku).
// Concepts only: no hosts, IPs, channels or service internals. Palillo is private.

export type NodeState = "on" | "mid" | "off" | "core" | "empty";
export type Ring = 0 | 1 | 2 | "g";

export interface SeiryuNode {
  id: string;
  name: string;
  kanji?: string;
  ring: Ring;
  /** Compass direction in degrees for guardians (0 = East, 90 = South, 180 = West, 270 = North). */
  dir?: number;
  st: NodeState;
  kind: { es: string; en: string };
  d: { es: string; en: string };
}

export const NODES: SeiryuNode[] = [
  { id: "salem", name: "Salem", ring: 0, st: "core", kind: { es: "Núcleo", en: "Core" }, d: { es: "La perla que sostiene el dragón. Recuerda, entiende la intención y coordina a los demás agentes.", en: "The pearl the dragon holds. It remembers, understands intent and coordinates the other agents." } },
  { id: "genbu", name: "Genbu", kanji: "玄", ring: "g", dir: 270, st: "mid", kind: { es: "Guardián · Norte", en: "Guardian · North" }, d: { es: "Política firmada y ejecutores tipados. El único camino desde una aprobación hasta un efecto real.", en: "Signed policy and typed executors. The only path from an approval to a real effect." } },
  { id: "seiryu", name: "Seiryū", kanji: "青", ring: "g", dir: 0, st: "on", kind: { es: "Guardián · Este", en: "Guardian · East" }, d: { es: "El ecosistema entero: la plataforma donde viven Salem, los agentes y las capacidades.", en: "The whole ecosystem: the platform where Salem, the agents and the capabilities live." } },
  { id: "byakko", name: "Byakko", kanji: "白", ring: "g", dir: 180, st: "mid", kind: { es: "Guardián · Oeste", en: "Guardian · West" }, d: { es: "Revisión independiente con derecho a veto antes de las operaciones de riesgo.", en: "Independent review with a veto before risky operations." } },
  { id: "suzaku", name: "Suzaku", kanji: "朱", ring: "g", dir: 90, st: "empty", kind: { es: "Sur · sin asignar", en: "South · unassigned" }, d: { es: "Vacío a propósito. No se crea un guardián solo por simetría.", en: "Empty on purpose. A guardian isn't created just for symmetry." } },
  { id: "roar", name: "Roar", ring: 1, st: "on", kind: { es: "Agente", en: "Agent" }, d: { es: "Editorial: convierte ideas en borradores de blog y LinkedIn. Un humano decide qué se publica.", en: "Editorial: turns ideas into blog and LinkedIn drafts. A human decides what gets published." } },
  { id: "ideas", name: "Ideas", ring: 1, st: "on", kind: { es: "Agente", en: "Agent" }, d: { es: "Captura enlaces e ideas al vuelo y los resume para que no se pierdan.", en: "Captures links and ideas on the fly and summarises them so they don't get lost." } },
  { id: "lore", name: "Lore", ring: 1, st: "on", kind: { es: "Agente", en: "Agent" }, d: { es: "Segundo cerebro: lo que leo y aprendo, ordenado y consultable.", en: "Second brain: what I read and learn, organised and searchable." } },
  { id: "monitor", name: "Monitor", ring: 1, st: "on", kind: { es: "Agente", en: "Agent" }, d: { es: "Vigila la salud del sistema y avisa solo cuando importa.", en: "Watches the system's health and only speaks up when it matters." } },
  { id: "devops", name: "DevOps", ring: 1, st: "on", kind: { es: "Agente", en: "Agent" }, d: { es: "Ayuda con contenedores, despliegues e infraestructura, siempre con revisión.", en: "Helps with containers, deployments and infrastructure, always with review." } },
  { id: "concierge", name: "Concierge", ring: 2, st: "mid", kind: { es: "Capacidad", en: "Capability" }, d: { es: "Mándale algo a Salem por mensaje y que acabe ordenado y consultable.", en: "Send Salem anything by message and it ends up organised and searchable." } },
  { id: "housing", name: "Housing", ring: 2, st: "on", kind: { es: "Capacidad", en: "Capability" }, d: { es: "Busca pisos y los puntúa con visión artificial.", en: "Finds flats and scores them with computer vision." } },
  { id: "builder", name: "Builder", ring: 2, st: "mid", kind: { es: "Capacidad", en: "Capability" }, d: { es: "De una tarea a un PR revisado: delegar desarrollo con trazabilidad.", en: "From a task to a reviewed PR: delegating development with traceability." } },
  { id: "voice", name: "Voice", ring: 2, st: "off", kind: { es: "Capacidad", en: "Capability" }, d: { es: "Hablar con Salem con notas de voz, en los dos sentidos.", en: "Talking to Salem with voice notes, both ways." } },
  { id: "salud", name: "Salud", ring: 2, st: "off", kind: { es: "Vertical", en: "Vertical" }, d: { es: "Datos de salud en solo lectura para entender hábitos.", en: "Read-only health data to understand habits." } },
  { id: "finanzas", name: "Finanzas", ring: 2, st: "off", kind: { es: "Vertical", en: "Vertical" }, d: { es: "Finanzas personales en solo lectura, sin mover dinero.", en: "Read-only personal finances, never moving money." } },
];

/** Example agent log for the "Ahora" console. Illustrative, labelled as an example on the page. */
export const LOG_LINES: { who: string; es: string; en: string }[] = [
  { who: "roar", es: "borrador listo para revisión humana", en: "draft ready for human review" },
  { who: "ideas", es: "3 enlaces capturados y resumidos", en: "3 links captured and summarised" },
  { who: "salem", es: "pidió permiso antes de actuar", en: "asked for permission before acting" },
  { who: "genbu", es: "operación permitida y firmada", en: "operation allowed and signed" },
  { who: "monitor", es: "todo en orden", en: "all good" },
  { who: "housing", es: "2 pisos nuevos puntuados", en: "2 new flats scored" },
  { who: "lore", es: "nota enlazada con 4 relacionadas", en: "note linked to 4 related ones" },
];
