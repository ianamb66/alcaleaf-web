import React, { useEffect, useMemo, useState } from "react";
import {
  Award,
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  Leaf,
  Menu,
  MessageCircle,
  ShieldCheck,
  Sparkles,
  UserCheck,
  X,
} from "lucide-react";

// --- CONFIGURACIÓN GLOBAL ---
const WHATSAPP_NUMBER = "5211234567890"; // TODO: Reemplazar con el número real
const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  "Hola, me gustaría obtener más información sobre los productos alca leaf."
)}`;

type NavPage = "inicio" | "nosotros" | "productos" | "beneficios" | "blog";

// --- UI REUTILIZABLE ---
function LogoDark({ className = "" }: { className?: string }) {
  return (
    <div
      className={`flex flex-col items-start leading-none font-serif text-white ${className}`}
    >
      <div className="flex items-end">
        <span className="text-2xl font-bold tracking-tight">a</span>
        <div className="mx-0.5 flex flex-col items-center">
          <Leaf
            className="-mb-1 h-5 w-5 -rotate-12 transform text-green-400"
            fill="currentColor"
          />
          <span className="text-xl font-bold tracking-tight">l</span>
        </div>
        <span className="text-2xl font-bold tracking-tight">ca</span>
      </div>
      <span className="ml-5 text-2xl font-bold tracking-tight">eaf</span>
    </div>
  );
}

function Button({
  children,
  variant = "primary",
  className = "",
  href,
  onClick,
}: {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "outline" | "soft";
  className?: string;
  href?: string;
  onClick?: () => void;
}) {
  const base =
    "inline-flex items-center justify-center rounded-full px-6 py-3 font-medium transition-colors duration-200";
  const variants: Record<string, string> = {
    primary:
      "bg-alca-600 text-white hover:bg-alca-500 shadow-sm hover:shadow-md",
    secondary:
      "bg-white/10 text-white hover:bg-white/15 border border-white/15 backdrop-blur-sm",
    outline:
      "border-2 border-alca-800 text-alca-800 hover:bg-alca-800 hover:text-white",
    soft:
      "bg-alca-50 text-alca-900 hover:bg-alca-100 border border-alca-100",
  };

  const Comp: any = href ? "a" : "button";
  return (
    <Comp
      href={href}
      onClick={onClick}
      target={href ? "_blank" : undefined}
      rel={href ? "noopener noreferrer" : undefined}
      className={`${base} ${variants[variant]} ${className}`}
    >
      {children}
    </Comp>
  );
}

function SectionTitle({
  title,
  subtitle,
  light,
}: {
  title: string;
  subtitle?: string;
  light?: boolean;
}) {
  return (
    <div className="mb-12 text-center">
      {subtitle ? (
        <span className="mb-3 block text-sm font-medium uppercase tracking-wider text-green-600">
          {subtitle}
        </span>
      ) : null}
      <h2
        className={`font-serif text-4xl md:text-5xl ${
          light ? "text-white" : "text-stone-800"
        }`}
      >
        {title}
      </h2>
    </div>
  );
}

// --- SECCIONES ---
function PromoBar() {
  return (
    <div className="w-full bg-alca-950 text-white">
      <div className="mx-auto flex max-w-7xl items-center justify-center gap-2 px-4 py-2 text-center text-xs sm:text-sm">
        <Sparkles className="h-4 w-4 text-green-400" />
        Envíos a todo México · Atención Lun–Vie 9:00–18:00 · Pide asesoría por WhatsApp
      </div>
    </div>
  );
}

function Hero({ setCurrentPage }: { setCurrentPage: (p: NavPage) => void }) {
  return (
    <section className="relative flex min-h-[92vh] items-center justify-center overflow-hidden bg-alca-950">
      {/* Liquid-glass vibe (cheap): gradients + subtle noise */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(1200px_600px_at_20%_10%,rgba(16,185,129,0.22),transparent_60%),radial-gradient(900px_600px_at_80%_30%,rgba(34,197,94,0.14),transparent_55%),linear-gradient(to_bottom,rgba(0,0,0,0.25),rgba(0,0,0,0.55))]" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.10] mix-blend-overlay [background-image:url('data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22140%22 height=%22140%22%3E%3Cfilter id=%22n%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%222%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22140%22 height=%22140%22 filter=%22url(%23n)%22 opacity=%220.45%22/%3E%3C/svg%3E')]" />

      <div className="relative mx-auto w-full max-w-5xl px-4 pt-28 text-center">
        <div className="inline-flex animate-fade-in-up items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm text-stone-100 backdrop-blur-sm">
          <Award className="h-4 w-4 text-green-400" />
          Inspirado en “Liquid Glass” · optimizado (sin animaciones pesadas)
        </div>

        <h1 className="mt-7 animate-fade-in-up font-serif text-5xl leading-tight text-white [animation-delay:120ms] md:text-7xl">
          Naturaleza que eleva tu bienestar
          <span className="block text-green-400/95 italic">sin complicarte</span>
        </h1>

        <p className="mx-auto mt-6 max-w-2xl animate-fade-in-up text-lg text-stone-200 [animation-delay:180ms] md:text-xl">
          Suplementos naturales y asesoría clara. Elige por objetivo (digestión,
          energía, foco, descanso) y te guiamos con recomendaciones prácticas.
        </p>

        <div className="mt-10 flex animate-fade-in-up flex-col justify-center gap-4 [animation-delay:240ms] sm:flex-row">
          <Button onClick={() => setCurrentPage("productos")} className="group">
            Explorar catálogo
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Button>
          <Button variant="secondary" href={WHATSAPP_LINK}>
            Asesoría por WhatsApp
          </Button>
        </div>

        {/* Trust row (inspirado en Supernaturista: métodos/beneficios) */}
        <div className="mx-auto mt-12 grid max-w-4xl grid-cols-1 gap-3 rounded-3xl border border-white/10 bg-white/5 p-4 text-left text-sm text-stone-200 backdrop-blur-sm sm:grid-cols-3">
          <div className="flex items-start gap-3 rounded-2xl bg-white/5 p-4">
            <ShieldCheck className="mt-0.5 h-5 w-5 text-green-400" />
            <div>
              <div className="font-medium text-white">Calidad & trazabilidad</div>
              <div className="text-stone-300">Ingredientes y procesos claros.</div>
            </div>
          </div>
          <div className="flex items-start gap-3 rounded-2xl bg-white/5 p-4">
            <CheckCircle2 className="mt-0.5 h-5 w-5 text-green-400" />
            <div>
              <div className="font-medium text-white">Guía rápida por objetivo</div>
              <div className="text-stone-300">Te decimos qué sí y qué no.</div>
            </div>
          </div>
          <div className="flex items-start gap-3 rounded-2xl bg-white/5 p-4">
            <UserCheck className="mt-0.5 h-5 w-5 text-green-400" />
            <div>
              <div className="font-medium text-white">Atención humana</div>
              <div className="text-stone-300">Resolvemos dudas por WhatsApp.</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Nosotros() {
  return (
    <section className="bg-stone-50 py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionTitle title="Nuestra Esencia" subtitle="Sobre alca leaf" />

        <div className="grid grid-cols-1 items-center gap-14 md:grid-cols-2">
          <div className="space-y-6 text-lg leading-relaxed text-stone-600">
            <p>
              En <strong className="text-alca-800">alca leaf</strong> creemos en
              un bienestar práctico: hábitos + productos con intención.
            </p>
            <p>
              Este sitio está diseñado para que la experiencia sea rápida y clara
              (como los e-commerce buenos): catálogo por objetivos, beneficios
              directos y contacto inmediato.
            </p>

            <div className="grid grid-cols-1 gap-6 pt-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-stone-100 bg-white p-6 shadow-sm">
                <ShieldCheck className="mb-3 h-8 w-8 text-alca-600" />
                <h4 className="mb-2 font-serif text-xl text-stone-800">Misión</h4>
                <p className="text-sm">
                  Proveer alternativas naturales eficaces y asesoría clara.
                </p>
              </div>
              <div className="rounded-2xl border border-stone-100 bg-white p-6 shadow-sm">
                <Sparkles className="mb-3 h-8 w-8 text-alca-600" />
                <h4 className="mb-2 font-serif text-xl text-stone-800">Visión</h4>
                <p className="text-sm">
                  Ser un referente confiable de bienestar integral.
                </p>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="overflow-hidden rounded-3xl shadow-xl">
              <img
                src="https://images.unsplash.com/photo-1556040220-4096d522378d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1400&q=80"
                alt="Bienestar"
                className="h-full w-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 max-w-xs rounded-2xl bg-alca-800 p-6 text-white shadow-glass">
              <LogoDark className="mb-2 opacity-90" />
              <p className="text-sm text-stone-100/90">
                Bienestar integral respaldado por la naturaleza.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

type Product = {
  name: string;
  desc: string;
  image: string;
  tags: string[];
  highlight?: string;
};

function Productos() {
  const products: Product[] = useMemo(
    () => [
      {
        name: "Cúrcuma + Pimienta Negra",
        desc: "Apoyo antiinflamatorio y antioxidante. Ideal para rutina diaria.",
        image:
          "https://images.unsplash.com/photo-1615486511484-92e172fc34ea?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
        tags: ["Articulaciones", "Antioxidante"],
        highlight: "Top",
      },
      {
        name: "Magnesio (citrato)",
        desc: "Relajación muscular, descanso y soporte general.",
        image:
          "https://images.unsplash.com/photo-1611078816827-0c75ce552d00?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
        tags: ["Sueño", "Estrés"],
      },
      {
        name: "Jengibre",
        desc: "Digestión, náuseas y apoyo inmunológico.",
        image:
          "https://images.unsplash.com/photo-1599940824399-b87987ceb72a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
        tags: ["Digestión", "Inmunidad"],
      },
      {
        name: "Omega 3",
        desc: "Soporte cardiovascular y salud cerebral.",
        image:
          "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
        tags: ["Corazón", "Cerebro"],
      },
    ],
    []
  );

  return (
    <section className="bg-[#f8f9f6] py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionTitle title="Catálogo Natural" subtitle="Productos" />

        {/* Objetivos rápidos (inspirado en ecomm: accesos por categoría) */}
        <div className="mb-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {["Digestión", "Energía", "Sueño", "Inmunidad"].map((k) => (
            <div
              key={k}
              className="rounded-2xl border border-alca-100 bg-white px-4 py-3 text-sm font-medium text-stone-700 shadow-sm"
            >
              {k}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {products.map((p) => (
            <div
              key={p.name}
              className="group overflow-hidden rounded-3xl bg-white shadow-sm transition-shadow duration-300 hover:shadow-xl"
            >
              <div className="relative aspect-[4/5] overflow-hidden">
                <img
                  src={p.image}
                  alt={p.name}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  loading="lazy"
                />
                <div className="absolute left-4 top-4 flex flex-col gap-2">
                  {p.highlight ? (
                    <span className="rounded-full bg-alca-800 px-3 py-1 text-xs font-semibold text-white">
                      {p.highlight}
                    </span>
                  ) : null}
                  {p.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-alca-900 backdrop-blur"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-6">
                <h3 className="mb-2 font-serif text-xl text-stone-800">
                  {p.name}
                </h3>
                <p className="mb-6 line-clamp-2 text-sm text-stone-500">
                  {p.desc}
                </p>
                <Button
                  href={WHATSAPP_LINK}
                  variant="soft"
                  className="w-full py-2 text-sm"
                >
                  Solicitar info
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Beneficios() {
  return (
    <section className="bg-alca-950 py-24 text-white">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionTitle
          title="El Poder de lo Natural"
          subtitle="Beneficios integrales"
          light
        />

        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
          {
            [
              {
                icon: <CheckCircle2 className="h-10 w-10 text-green-400" />,
                title: "Claridad y foco",
                desc: "Apoyo cognitivo y hábitos para reducir la niebla mental.",
              },
              {
                icon: <UserCheck className="h-10 w-10 text-green-400" />,
                title: "Soporte digestivo",
                desc: "Mejora absorción de nutrientes y equilibrio intestinal.",
              },
              {
                icon: <Sparkles className="h-10 w-10 text-green-400" />,
                title: "Vitalidad diaria",
                desc: "Rutinas simples para energía sostenida y manejo del estrés.",
              },
            ].map((b) => (
              <div
                key={b.title}
                className="rounded-3xl border border-white/10 bg-white/5 p-8 text-center backdrop-blur-sm transition-colors hover:bg-white/10"
              >
                <div className="mb-6 flex justify-center">{b.icon}</div>
                <h3 className="mb-4 font-serif text-2xl">{b.title}</h3>
                <p className="text-stone-300">{b.desc}</p>
              </div>
            ))
          }
        </div>

        <div className="mt-20 flex flex-col items-center gap-10 rounded-3xl border border-green-900/40 bg-green-900/20 p-10 md:flex-row">
          <div className="aspect-square w-full max-w-[240px] overflow-hidden rounded-full border-4 border-green-700/40">
            <img
              src="https://images.unsplash.com/photo-1599940824399-b87987ceb72a?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&q=80"
              alt="Jengibre"
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </div>
          <div className="w-full">
            <span className="mb-2 block text-sm font-medium uppercase tracking-wider text-green-300">
              Ingrediente destacado
            </span>
            <h3 className="mb-4 font-serif text-4xl">El poder del jengibre</h3>
            <p className="mb-6 text-lg leading-relaxed text-stone-200">
              Un clásico por algo: digestión, soporte inmune y una base excelente
              para una rutina constante.
            </p>
            <ul className="grid grid-cols-1 gap-3 text-stone-100 sm:grid-cols-2">
              {[
                "Reduce inflamación",
                "Mejora digestión",
                "Alivia náuseas",
                "Apoya metabolismo",
              ].map((t) => (
                <li key={t} className="flex items-center gap-2">
                  <Leaf className="h-4 w-4 text-green-400" /> {t}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

function Blog() {
  const posts = useMemo(
    () => [
      {
        title: "5 pasos para un estilo de vida saludable",
        img: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
        cat: "Hábitos",
      },
      {
        title: "Sueño: rutina simple para descansar mejor",
        img: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
        cat: "Descanso",
      },
      {
        title: "Energía sin picos: qué sí funciona",
        img: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
        cat: "Nutrición",
      },
    ],
    []
  );

  return (
    <section className="bg-stone-100 py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionTitle title="Consejos de salud" subtitle="Blog" />

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {posts.map((post) => (
            <article key={post.title} className="group cursor-pointer">
              <div className="relative mb-4 aspect-square overflow-hidden rounded-2xl">
                <img
                  src={post.img}
                  alt={post.title}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  loading="lazy"
                />
                <div className="absolute left-4 top-4 rounded-full bg-alca-800 px-3 py-1 text-xs uppercase tracking-wider text-white">
                  {post.cat}
                </div>
              </div>
              <h3 className="font-serif text-2xl text-stone-800 transition-colors group-hover:text-alca-700">
                {post.title}
              </h3>
              <p className="mt-2 flex items-center gap-1 text-sm font-medium text-stone-500">
                Leer artículo <ChevronRight className="h-4 w-4" />
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Newsletter() {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-10 rounded-3xl border border-stone-100 bg-stone-50 p-10 md:grid-cols-2">
          <div>
            <h3 className="font-serif text-3xl text-stone-800">
              Boletín de ofertas
            </h3>
            <p className="mt-2 text-stone-600">
              Recibe promos y recomendaciones (sin spam). Puedes darte de baja en
              cualquier momento.
            </p>
          </div>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex flex-col gap-3 sm:flex-row"
          >
            <input
              type="email"
              required
              placeholder="Tu email"
              className="w-full rounded-full border-stone-200 bg-white px-4 py-3 text-sm"
            />
            <Button className="whitespace-nowrap px-6 py-3">
              Suscribirme
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default function App() {
  const [currentPage, setCurrentPage] = useState<NavPage>("inicio");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks: Array<{ id: NavPage; label: string }> = useMemo(
    () => [
      { id: "inicio", label: "Inicio" },
      { id: "nosotros", label: "Nosotros" },
      { id: "productos", label: "Productos" },
      { id: "beneficios", label: "Beneficios" },
      { id: "blog", label: "Blog" },
    ],
    []
  );

  const handleNavClick = (id: NavPage) => {
    setCurrentPage(id);
    setIsMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const page = useMemo(() => {
    switch (currentPage) {
      case "inicio":
        return (
          <>
            <Hero setCurrentPage={setCurrentPage} />
            <Productos />
            <Beneficios />
            <Blog />
            <Newsletter />
          </>
        );
      case "nosotros":
        return <Nosotros />;
      case "productos":
        return (
          <>
            <Productos />
            <Newsletter />
          </>
        );
      case "beneficios":
        return (
          <>
            <Beneficios />
            <Newsletter />
          </>
        );
      case "blog":
        return (
          <>
            <Blog />
            <Newsletter />
          </>
        );
      default:
        return <Hero setCurrentPage={setCurrentPage} />;
    }
  }, [currentPage]);

  return (
    <div className="font-sans antialiased selection:bg-green-200">
      <PromoBar />

      {/* NAV */}
      <nav
        className={`fixed left-0 right-0 top-0 z-50 transition-colors duration-200 ${
          scrolled || currentPage !== "inicio"
            ? "bg-alca-950/90 backdrop-blur-sm shadow-sm"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <button
            onClick={() => handleNavClick("inicio")}
            className="focus:outline-none"
            aria-label="Ir a inicio"
          >
            <LogoDark />
          </button>

          <div className="hidden items-center space-x-8 md:flex">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`text-sm font-medium tracking-wide transition-colors ${
                  currentPage === link.id
                    ? "text-green-300"
                    : "text-stone-200 hover:text-white"
                }`}
              >
                {link.label}
              </button>
            ))}
            <Button href={WHATSAPP_LINK} className="px-5 py-2 text-sm">
              Contacto
            </Button>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen((v) => !v)}
              className="text-white"
              aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {isMenuOpen ? (
          <div className="border-t border-white/10 bg-alca-950 md:hidden">
            <div className="flex flex-col space-y-3 px-4 pb-6 pt-4">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`py-2 text-left text-lg ${
                    currentPage === link.id ? "text-green-300" : "text-stone-200"
                  }`}
                >
                  {link.label}
                </button>
              ))}
              <Button href={WHATSAPP_LINK} className="w-full justify-center">
                Hablar por WhatsApp
              </Button>
            </div>
          </div>
        ) : null}
      </nav>

      <main className="min-h-screen pt-12">{page}</main>

      <footer className="border-t border-white/10 bg-[#121A15] py-16 text-stone-400">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 px-4 sm:px-6 lg:px-8 md:grid-cols-4">
          <div className="md:col-span-2">
            <LogoDark className="mb-6 opacity-80" />
            <p className="mb-6 max-w-xs text-sm">
              Bienestar integral respaldado por la naturaleza.
            </p>
            <div className="flex space-x-3">
              {["in", "fb", "ig"].map((s) => (
                <div
                  key={s}
                  className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-white/5 transition-colors hover:bg-alca-700"
                >
                  {s}
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="mb-4 font-serif text-lg text-white">Enlaces</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button onClick={() => handleNavClick("inicio")} className="hover:text-green-300">
                  Inicio
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick("productos")}
                  className="hover:text-green-300"
                >
                  Catálogo
                </button>
              </li>
              <li>
                <button onClick={() => handleNavClick("blog")} className="hover:text-green-300">
                  Blog
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 font-serif text-lg text-white">Contacto</h4>
            <ul className="space-y-2 text-sm">
              <li>Lun a Vie: 9am – 6pm</li>
              <li>info@alcaleaf.com</li>
              <li>
                <a href={WHATSAPP_LINK} className="text-green-300 hover:underline">
                  Chat vía WhatsApp
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mx-auto mt-12 max-w-6xl border-t border-white/10 px-4 pt-8 text-center text-xs">
          &copy; {new Date().getFullYear()} alca leaf. Todos los derechos
          reservados.
        </div>
      </footer>

      {/* WhatsApp floating button (no bounce) */}
      <a
        href={WHATSAPP_LINK}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 rounded-full bg-[#25D366] p-4 text-white shadow-xl transition-transform hover:scale-[1.05] focus:scale-[1.05]"
        aria-label="Contactar por WhatsApp"
      >
        <MessageCircle className="h-7 w-7" />
      </a>
    </div>
  );
}
