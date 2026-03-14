export type Locale = "en" | "es";

type BuildCard = {
  icon: string;
  title: string;
  body: string;
};

type Translation = {
  meta: {
    title: string;
    description: string;
  };
  hero: {
    role: string;
    name: string;
    tagline: string;
    cta: {
      blog: string;
      github: string;
      linkedin: string;
    };
  };
  build: {
    label: string;
    title: string;
    description: string;
    cards: BuildCard[];
  };
  stack: {
    label: string;
    title: string;
    description: string;
    infraLabel: string;
    aiLabel: string;
    botLabel: string;
    tags: {
      infra: string;
      ai: string;
      multiAgent: string;
      topics: string;
    };
  };
  about: {
    label: string;
    title: string;
    description: string;
    storyPoints: string[];
    differentiatorLabel: string;
    differentiatorText: string;
  };
  footer: {
    builtWith: string;
    posts: string;
  };
  redirect: {
    title: string;
    description: string;
    label: string;
    heading: string;
    bodyPrefix: string;
    linkText: string;
  };
};

export const translations = {
  en: {
    meta: {
      title: "Alejandro Cabrera Martínez — acabreram.me",
      description:
        "Copilot Solution Engineer at Microsoft Spain, 2024 MVP, professor, speaker, and homelab builder exploring AI agents, cloud, and self-hosted infrastructure."
    },
    hero: {
      role: "Copilot Solution Engineer @ Microsoft · 2024 MVP · Professor",
      name: "Alejandro (Alex) Cabrera Martínez",
      tagline: "Building AI adoption by day, training dragons by night.",
      cta: {
        blog: "Blog",
        github: "GitHub",
        linkedin: "LinkedIn"
      }
    },
    build: {
      label: "What I Build",
      title: "Systems with a pulse.",
      description: "Enterprise AI, personal infrastructure, and the layer where automation becomes habit.",
      cards: [
        {
          icon: "☁️",
          title: "AI & Cloud",
          body: "Copilot Solution Engineer at Microsoft Spain. Helping enterprises adopt AI — and building my own agents on the side."
        },
        {
          icon: "🏠",
          title: "Homelab",
          body: "Self-hosted monitoring, media automation, and networking on a UGREEN NAS + Mac Mini. Docker Compose, Prometheus, Alertmanager, Uptime Kuma — everything as code."
        },
        {
          icon: "🤖",
          title: "AI Agents",
          body: "Local LLMs with Ollama, multi-agent orchestration with OpenClaw, and a Telegram bot that manages my infrastructure while I sleep."
        }
      ]
    },
    stack: {
      label: "The Stack",
      title: "A homelab with two brains and one dragon handler.",
      description:
        "Infrastructure lives on the NAS. Local inference and orchestration run on the Mac Mini. Telegram is the interface that ties it together.",
      infraLabel: "Infra node",
      aiLabel: "AI node",
      botLabel: "Telegram Bot",
      tags: {
        infra: "LAN · Docker",
        ai: "macOS · Metal GPU",
        multiAgent: "Multi-agent",
        topics: "4 topics"
      }
    },
    about: {
      label: "About",
      title: "From Law school to Cloud Engineering — the scenic route through tech.",
      description:
        "By day, I help CIOs and CISOs adopt AI governance at scale. By night, I build my own AI agents on a NAS and a Mac Mini. It's not theory — it's practice.",
      storyPoints: [
        "Copilot Solution Engineer @ Microsoft Spain",
        "2024 Microsoft MVP",
        "Professor @ The Valley Business & Tech School",
        "Career path: Law (UC3M) → Call center → IT Support → M365 Dev → Tech Lead (Sogeti) → Microsoft",
        "Speaker & mentor in tech communities",
        "Gaming culture: Twitch (Destiny), Pokémon, WoW",
        "By night: homelab builder, AI agent tinkerer"
      ],
      differentiatorLabel: "Differentiator",
      differentiatorText:
        "By day, I help CIOs and CISOs adopt AI governance at scale. By night, I build my own AI agents on a NAS and a Mac Mini. It's not theory — it's practice."
    },
    footer: {
      builtWith: "Built with Astro · Hosted on Cloudflare",
      posts: "Posts drafted with AI agents, shipped by a human."
    },
    redirect: {
      title: "About — Alejandro Cabrera Martínez",
      description: "Redirecting to the about section on the homepage.",
      label: "Redirecting",
      heading: "Taking you to the full story.",
      bodyPrefix: "If the redirect does not happen automatically, continue to the",
      linkText: "about section"
    }
  },
  es: {
    meta: {
      title: "Alejandro Cabrera Martínez — acabreram.me",
      description:
        "Copilot Solution Engineer en Microsoft Spain, MVP 2024, profesor, speaker y constructor de homelab explorando agentes IA, cloud e infraestructura self-hosted."
    },
    hero: {
      role: "Copilot Solution Engineer @ Microsoft · 2024 MVP · Professor",
      name: "Alejandro (Alex) Cabrera Martínez",
      tagline: "Construyendo adopción de IA de día, entrenando dragones de noche.",
      cta: {
        blog: "Blog",
        github: "GitHub",
        linkedin: "LinkedIn"
      }
    },
    build: {
      label: "Lo Que Construyo",
      title: "Sistemas con pulso.",
      description: "IA empresarial, infraestructura personal y la capa donde la automatización se convierte en hábito.",
      cards: [
        {
          icon: "☁️",
          title: "IA & Cloud",
          body: "Copilot Solution Engineer en Microsoft Spain. Ayudo a empresas a adoptar IA — y mientras tanto construyo mis propios agentes."
        },
        {
          icon: "🏠",
          title: "Homelab",
          body: "Monitorización self-hosted, automatización multimedia y redes sobre un UGREEN NAS + Mac Mini. Docker Compose, Prometheus, Alertmanager, Uptime Kuma — todo como código."
        },
        {
          icon: "🤖",
          title: "Agentes IA",
          body: "LLMs locales con Ollama, orquestación multiagente con OpenClaw y un bot de Telegram que gestiona mi infraestructura mientras duermo."
        }
      ]
    },
    stack: {
      label: "El Stack",
      title: "Un homelab con dos cerebros y un domador de dragones.",
      description:
        "La infraestructura vive en el NAS. La inferencia local y la orquestación corren en el Mac Mini. Telegram es la interfaz que lo une todo.",
      infraLabel: "Nodo infra",
      aiLabel: "Nodo IA",
      botLabel: "Telegram Bot",
      tags: {
        infra: "LAN · Docker",
        ai: "macOS · Metal GPU",
        multiAgent: "Multi-agent",
        topics: "4 topics"
      }
    },
    about: {
      label: "Sobre mí",
      title: "De Derecho a Cloud Engineering — la ruta panorámica por la tecnología.",
      description:
        "De día, ayudo a CIOs y CISOs a adoptar gobernanza de IA a escala. De noche, construyo mis propios agentes de IA en un NAS y un Mac Mini. No es teoría — es práctica.",
      storyPoints: [
        "Copilot Solution Engineer @ Microsoft Spain",
        "Microsoft MVP 2024",
        "Profesor @ The Valley Business & Tech School",
        "Trayectoria: Derecho (UC3M) → Call center → Soporte IT → Desarrollador M365 → Tech Lead (Sogeti) → Microsoft",
        "Speaker y mentor en comunidades tech",
        "Cultura gaming: Twitch (Destiny), Pokémon, WoW",
        "Por la noche: constructor de homelab, experimentador con agentes IA"
      ],
      differentiatorLabel: "Diferenciador",
      differentiatorText:
        "De día, ayudo a CIOs y CISOs a adoptar gobernanza de IA a escala. De noche, construyo mis propios agentes de IA en un NAS y un Mac Mini. No es teoría — es práctica."
    },
    footer: {
      builtWith: "Hecho con Astro · Alojado en Cloudflare",
      posts: "Posts escritos con agentes IA, publicados por un humano."
    },
    redirect: {
      title: "Sobre mí — Alejandro Cabrera Martínez",
      description: "Redirigiendo a la sección sobre mí de la página principal.",
      label: "Redirigiendo",
      heading: "Te llevo a la historia completa.",
      bodyPrefix: "Si la redirección no ocurre automáticamente, continúa a la",
      linkText: "sección sobre mí"
    }
  }
} satisfies Record<Locale, Translation>;
