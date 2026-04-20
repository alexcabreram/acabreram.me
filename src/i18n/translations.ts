export type Locale = "en" | "es";

type BuildCard = {
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
    cloudLabel: string;
    tags: {
      infra: string;
      ai: string;
      multiAgent: string;
      topics: string;
      cloud: string;
    };
  };
  about: {
    label: string;
    fullName: string;
    title: string;
    description: string;
    storyPoints: string[];
    careerPath: string;
    certsLabel: string;
  };
  footer: {
    builtWith: string;
    posts: string;
    closing: string;
    ctaBlog: string;
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
      title: "Alex Cabrera — acabreram.com",
      description:
        "Alex Cabrera Martínez, also known as Alejandro Cabrera Martínez, is a Copilot Solution Engineer at Microsoft Spain, Microsoft MVP Alumni, professor, speaker, and homelab builder exploring AI agents, cloud, and self-hosted infrastructure."
    },
    hero: {
      role: "Copilot Solution Engineer @ Microsoft · AI Agents · Governance · Microsoft MVP Alumni",
      name: "Alex Cabrera",
      tagline: "Deploying AI at enterprise scale by day. Training dragons on a homelab by night.",
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
          title: "AI & Cloud",
          body: "Copilot Solution Engineer at Microsoft Spain. Helping enterprises adopt AI — and building my own agents on the side."
        },
        {
          title: "Homelab",
          body: "Self-hosted monitoring, media automation, and networking on a UGREEN NAS + Mac Mini. Docker Compose, Prometheus, Alertmanager, Uptime Kuma — everything as code."
        },
        {
          title: "AI Agents",
          body: "Local LLMs with Ollama, multi-agent orchestration with OpenClaw, and a Telegram bot that manages my infrastructure while I sleep."
        }
      ]
    },
    stack: {
      label: "The Stack",
      title: "A homelab with two brains, one dragon handler, and an Azure lifeline.",
      description:
        "Infrastructure lives on the NAS. Local inference and orchestration run on the Mac Mini. Telegram is the interface that ties it together. And when local models aren't enough, Azure fills the gap.",
      infraLabel: "The NAS",
      aiLabel: "The Brain",
      botLabel: "The Interface",
      cloudLabel: "The Cloud",
      tags: {
        infra: "LAN · Docker",
        ai: "macOS · Metal GPU",
        multiAgent: "Multi-agent",
        topics: "4 topics",
        cloud: "Azure · GitHub"
      }
    },
    about: {
      label: "About",
      fullName: "Alejandro Cabrera Martínez",
      title: "From Law school to Cloud Engineering — the scenic route through tech.",
      description:
        "By day, I help CIOs and CISOs adopt AI governance at scale. By night, I build my own AI agents on a NAS and a Mac Mini. It's not theory — it's practice.",
      storyPoints: [
        "Copilot Solution Engineer @ Microsoft Spain",
        "Microsoft MVP Alumni",
        "Professor @ The Valley Business & Tech School",
        "Speaker & mentor in tech communities"
      ],
      careerPath:
        "I started studying Law, worked in a call center, pivoted to IT support, then became an M365 developer and Tech Lead at Sogeti. Now I'm at Microsoft, helping enterprises adopt AI. The scenic route shaped Alejandro Cabrera Martínez every step of the way.",
      certsLabel: "Certifications"
    },
    footer: {
      builtWith: "Built with Astro · Hosted on Cloudflare",
      posts: "Posts drafted with AI agents, shipped by a human.",
      closing: "It's not theory — it's practice.",
      ctaBlog: "Read the blog"
    },
    redirect: {
      title: "About — Alex Cabrera",
      description: "Redirecting to the about section on the homepage.",
      label: "Redirecting",
      heading: "Taking you to the full story.",
      bodyPrefix: "If the redirect does not happen automatically, continue to the",
      linkText: "about section"
    }
  },
  es: {
    meta: {
      title: "Alex Cabrera — acabreram.com",
      description:
        "Alex Cabrera Martínez, también conocido como Alejandro Cabrera Martínez, es Copilot Solution Engineer en Microsoft Spain, Microsoft MVP Alumni, profesor, speaker y constructor de homelab explorando agentes IA, cloud e infraestructura self-hosted."
    },
    hero: {
      role: "Copilot Solution Engineer @ Microsoft · AI Agents · Governance · Microsoft MVP Alumni",
      name: "Alex Cabrera",
      tagline: "Desplegando IA a escala empresarial de día. Entrenando dragones en un homelab de noche.",
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
          title: "IA & Cloud",
          body: "Copilot Solution Engineer en Microsoft Spain. Ayudo a empresas a adoptar IA — y mientras tanto construyo mis propios agentes."
        },
        {
          title: "Homelab",
          body: "Monitorización self-hosted, automatización multimedia y redes sobre un UGREEN NAS + Mac Mini. Docker Compose, Prometheus, Alertmanager, Uptime Kuma — todo como código."
        },
        {
          title: "Agentes IA",
          body: "LLMs locales con Ollama, orquestación multiagente con OpenClaw y un bot de Telegram que gestiona mi infraestructura mientras duermo."
        }
      ]
    },
    stack: {
      label: "El Stack",
      title: "Un homelab con dos cerebros, un domador de dragones y una línea directa con Azure.",
      description:
        "La infraestructura vive en el NAS. La inferencia local y la orquestación corren en el Mac Mini. Telegram es la interfaz que lo une todo. Y cuando los modelos locales no llegan, Azure cubre la diferencia.",
      infraLabel: "El NAS",
      aiLabel: "El Cerebro",
      botLabel: "La Interfaz",
      cloudLabel: "La Nube",
      tags: {
        infra: "LAN · Docker",
        ai: "macOS · Metal GPU",
        multiAgent: "Multi-agent",
        topics: "4 topics",
        cloud: "Azure · GitHub"
      }
    },
    about: {
      label: "Sobre mí",
      fullName: "Alejandro Cabrera Martínez",
      title: "De Derecho a Cloud Engineering — la ruta panorámica por la tecnología.",
      description:
        "De día, ayudo a CIOs y CISOs a adoptar gobernanza de IA a escala. De noche, construyo mis propios agentes de IA en un NAS y un Mac Mini. No es teoría — es práctica.",
      storyPoints: [
        "Copilot Solution Engineer @ Microsoft Spain",
        "Microsoft MVP Alumni",
        "Profesor @ The Valley Business & Tech School",
        "Speaker y mentor en comunidades tech"
      ],
      careerPath:
        "Empecé estudiando Derecho, trabajé en un call center, pivoté a soporte IT, después fui desarrollador M365 y Tech Lead en Sogeti. Ahora estoy en Microsoft, ayudando a empresas a adoptar IA. La ruta panorámica fue construyendo a Alejandro Cabrera Martínez en cada parada.",
      certsLabel: "Certificaciones"
    },
    footer: {
      builtWith: "Hecho con Astro · Alojado en Cloudflare",
      posts: "Posts escritos con agentes IA, publicados por un humano.",
      closing: "No es teoría — es práctica.",
      ctaBlog: "Lee el blog"
    },
    redirect: {
      title: "Sobre mí — Alex Cabrera",
      description: "Redirigiendo a la sección sobre mí de la página principal.",
      label: "Redirigiendo",
      heading: "Te llevo a la historia completa.",
      bodyPrefix: "Si la redirección no ocurre automáticamente, continúa a la",
      linkText: "sección sobre mí"
    }
  }
} satisfies Record<Locale, Translation>;
