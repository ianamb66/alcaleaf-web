import React, { useEffect, useMemo, useState } from "react";
import {
  ArrowRight,
  ChevronRight,
  Leaf,
  Menu,
  MessageCircle,
  Moon,
  Sun,
  X,
} from "lucide-react";

// --- CONFIGURACIÓN GLOBAL ---
const WHATSAPP_NUMBER = "5211234567890"; // TODO: Reemplazar con el número real
const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  "Hola, me gustaría obtener más información sobre los productos alca leaf."
)}`;

type NavPage = "inicio" | "nosotros" | "productos" | "beneficios" | "blog";
type ThemeMode = "light" | "dark";

function setHtmlTheme(mode: ThemeMode) {
  const root = document.documentElement;
  if (mode === "dark") root.classList.add("dark");
  else root.classList.remove("dark");
}

function getInitialTheme(): ThemeMode {
  try {
    const saved = localStorage.getItem("theme") as ThemeMode | null;
    if (saved === "light" || saved === "dark") return saved;
  } catch {
    // ignore
  }
  return window.matchMedia?.("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function Brand({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2 font-mono ${className}`}>
      <Leaf className="h-5 w-5 text-alca-700 dark:text-alca-300" />
      <span className="text-lg tracking-tight text-stone-900 dark:text-stone-100">
        alca leaf
      </span>
    </div>
  );
}

function PillButton({
  children,
  href,
  onClick,
  variant = "primary",
  className = "",
}: {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "ghost";
  className?: string;
}) {
  const base =
    "inline-flex items-center justify-center rounded-full px-5 py-2 text-sm font-medium transition-colors";
  const variants: Record<string, string> = {
    primary:
      "bg-alca-300/80 text-stone-950 hover:bg-alca-300 dark:bg-alca-300/90 dark:text-stone-950",
    ghost:
      "bg-stone-200/60 text-stone-900 hover:bg-stone-200 dark:bg-white/10 dark:text-stone-100 dark:hover:bg-white/15",
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

function Card({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-card border border-stone-200 bg-white p-6 shadow-soft dark:border-white/10 dark:bg-[#0f1110] ${className}`}
    >
      {children}
    </div>
  );
}

function ThemeToggle({
  theme,
  setTheme,
}: {
  theme: ThemeMode;
  setTheme: (t: ThemeMode) => void;
}) {
  const isDark = theme === "dark";
  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-stone-200/60 text-stone-900 transition-colors hover:bg-stone-200 dark:bg-white/10 dark:text-stone-100 dark:hover:bg-white/15"
      aria-label={isDark ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
      title={isDark ? "Modo claro" : "Modo oscuro"}
    >
      {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
    </button>
  );
}

function Nav({
  currentPage,
  onNav,
  theme,
  setTheme,
}: {
  currentPage: NavPage;
  onNav: (id: NavPage) => void;
  theme: ThemeMode;
  setTheme: (t: ThemeMode) => void;
}) {
  const [open, setOpen] = useState(false);
  const links: Array<{ id: NavPage; label: string }> = useMemo(
    () => [
      { id: "inicio", label: "Inicio" },
      { id: "nosotros", label: "Nosotros" },
      { id: "productos", label: "Productos" },
      { id: "beneficios", label: "Beneficios" },
      { id: "blog", label: "Blog" },
    ],
    []
  );

  const NavBtn = ({ id, label }: { id: NavPage; label: string }) => (
    <button
      onClick={() => {
        onNav(id);
        setOpen(false);
      }}
      className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
        currentPage === id
          ? "bg-stone-900 text-white dark:bg-white dark:text-stone-950"
          : "text-stone-700 hover:bg-stone-200/70 dark:text-stone-200 dark:hover:bg-white/10"
      }`}
    >
      {label}
    </button>
  );

  return (
    <header className="sticky top-0 z-50 border-b border-stone-200/70 bg-stone-100/80 backdrop-blur-md dark:border-white/10 dark:bg-[#0b0d0c]/70">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
        <button onClick={() => onNav("inicio")} aria-label="Ir a inicio">
          <Brand />
        </button>

        <div className="hidden items-center gap-2 md:flex">
          <nav className="flex items-center gap-1 rounded-full bg-white/70 p-1 shadow-sm dark:bg-white/5">
            {links.map((l) => (
              <NavBtn key={l.id} id={l.id} label={l.label} />
            ))}
          </nav>
          <ThemeToggle theme={theme} setTheme={setTheme} />
          <PillButton href={WHATSAPP_LINK} variant="primary" className="ml-1">
            WhatsApp
            <ChevronRight className="ml-2 h-4 w-4" />
          </PillButton>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle theme={theme} setTheme={setTheme} />
          <button
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/70 text-stone-900 shadow-sm dark:bg-white/5 dark:text-stone-100"
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open ? (
        <div className="border-t border-stone-200/70 bg-stone-100/90 px-4 py-3 dark:border-white/10 dark:bg-[#0b0d0c]/90 md:hidden">
          <div className="flex flex-wrap gap-2">
            {links.map((l) => (
              <button
                key={l.id}
                onClick={() => {
                  onNav(l.id);
                  setOpen(false);
                }}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  currentPage === l.id
                    ? "bg-stone-900 text-white dark:bg-white dark:text-stone-950"
                    : "bg-white/70 text-stone-800 dark:bg-white/5 dark:text-stone-100"
                }`}
              >
                {l.label}
              </button>
            ))}
            <PillButton href={WHATSAPP_LINK} variant="primary" className="w-full">
              Hablar por WhatsApp
              <ChevronRight className="ml-2 h-4 w-4" />
            </PillButton>
          </div>
        </div>
      ) : null}
    </header>
  );
}

function HeroBento({ onShop }: { onShop: () => void }) {
  return (
    <section className="bg-stone-100 py-10 dark:bg-[#0b0d0c]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="rounded-[34px] bg-stone-900 p-6 dark:bg-black">
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
            {/* Big hero */}
            <div className="lg:col-span-8">
              <div className="relative overflow-hidden rounded-[28px] bg-white p-10">
                <div className="absolute inset-y-0 right-0 w-[40%] bg-gradient-to-l from-stone-100 to-transparent" />
                <div className="relative max-w-xl">
                  <h1 className="font-mono text-4xl leading-tight text-stone-950 sm:text-5xl">
                    Bring Nature Home
                  </h1>
                  <p className="mt-4 max-w-lg font-mono text-sm leading-relaxed text-stone-700">
                    Descubre suplementos naturales y rutinas simples para sentirte
                    mejor. Rápido, claro y sin humo.
                  </p>
                  <div className="mt-6 flex flex-wrap gap-3">
                    <PillButton onClick={onShop} variant="primary">
                      Ver catálogo
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </PillButton>
                    <PillButton href={WHATSAPP_LINK} variant="ghost">
                      Asesoría
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </PillButton>
                  </div>
                </div>
              </div>
            </div>

            {/* Right top */}
            <div className="lg:col-span-4">
              <div className="grid h-full grid-rows-2 gap-4">
                <div className="overflow-hidden rounded-[28px] bg-stone-100 p-8">
                  <div className="flex items-center justify-between">
                    <div className="font-mono text-sm text-stone-600">
                      Explore
                      <div className="text-xl font-semibold text-stone-950">
                        Top Sellers
                      </div>
                    </div>
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-sm">
                      <ArrowRight className="h-5 w-5 text-stone-900" />
                    </div>
                  </div>
                  <div className="mt-6 flex items-center justify-center">
                    <img
                      className="h-24 w-24 object-contain"
                      alt="Producto"
                      loading="lazy"
                      src="https://images.unsplash.com/photo-1615486511484-92e172fc34ea?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
                    />
                  </div>
                </div>

                <div className="overflow-hidden rounded-[28px] bg-white p-8">
                  <div className="font-mono text-sm text-stone-600">
                    Indoor Bloom
                    <div className="mt-2 text-sm leading-relaxed text-stone-700">
                      Tips y guías rápidas para elegir bien.
                    </div>
                  </div>
                  <div className="mt-6 flex items-center justify-between">
                    <PillButton onClick={onShop} variant="ghost">
                      Learn more
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </PillButton>
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-alca-300/70">
                      <ArrowRight className="h-4 w-4 text-stone-900" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom row */}
            <div className="lg:col-span-3">
              <div className="rounded-[28px] bg-white p-8">
                <div className="font-mono text-sm text-stone-600">
                  Scan to chat
                </div>
                <div className="mt-4 flex items-center justify-center">
                  <div className="h-40 w-40 rounded-2xl border border-stone-200 bg-stone-50" />
                </div>
                <div className="mt-4 font-mono text-xs text-stone-600">
                  (aquí podemos poner QR real a WhatsApp)
                </div>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="rounded-[28px] bg-stone-100 p-8">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <div className="font-mono text-2xl font-semibold text-stone-950">
                      Simple.
                    </div>
                    <div className="font-mono text-2xl font-semibold text-stone-950">
                      Fresh vibes.
                    </div>
                    <p className="mt-3 max-w-md font-mono text-sm text-stone-700">
                      Catálogo por objetivo (digestión, sueño, energía) y
                      recomendaciones claras.
                    </p>
                  </div>
                  <div className="overflow-hidden rounded-2xl bg-white">
                    <img
                      src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                      alt="Naturaleza"
                      loading="lazy"
                      className="h-48 w-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-3">
              <div className="rounded-[28px] bg-alca-300/80 p-8">
                <div className="font-mono text-sm text-stone-900">Objetivos</div>
                <ul className="mt-3 space-y-2 font-mono text-sm text-stone-900">
                  {["Digestión", "Energía", "Sueño", "Inmunidad"].map((t) => (
                    <li key={t} className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-stone-900" />
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function SectionTitle({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="mb-8">
      {subtitle ? (
        <div className="font-mono text-xs uppercase tracking-widest text-stone-500 dark:text-stone-400">
          {subtitle}
        </div>
      ) : null}
      <h2 className="mt-2 font-mono text-2xl font-semibold text-stone-950 dark:text-stone-100">
        {title}
      </h2>
    </div>
  );
}

function Productos() {
  const products = useMemo(
    () => [
      {
        name: "Cúrcuma + Pimienta Negra",
        desc: "Apoyo antiinflamatorio y antioxidante.",
      },
      { name: "Magnesio (citrato)", desc: "Rutina de sueño y relajación." },
      { name: "Jengibre", desc: "Digestión e inmunidad." },
      { name: "Omega 3", desc: "Corazón y enfoque." },
    ],
    []
  );

  return (
    <section className="bg-stone-100 py-14 dark:bg-[#0b0d0c]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionTitle title="Top Sellers" subtitle="Productos" />
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {products.map((p) => (
            <Card key={p.name} className="p-6">
              <div className="font-mono text-lg font-semibold text-stone-950 dark:text-stone-100">
                {p.name}
              </div>
              <div className="mt-2 font-mono text-sm text-stone-600 dark:text-stone-300">
                {p.desc}
              </div>
              <div className="mt-6">
                <PillButton href={WHATSAPP_LINK} variant="ghost" className="w-full">
                  Pedir info
                  <ChevronRight className="ml-2 h-4 w-4" />
                </PillButton>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-stone-100 py-14 dark:bg-[#0b0d0c]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="rounded-[34px] border border-stone-200 bg-white p-8 dark:border-white/10 dark:bg-[#0f1110]">
          <div className="flex flex-col justify-between gap-8 md:flex-row">
            <div>
              <Brand />
              <p className="mt-3 max-w-sm font-mono text-sm text-stone-600 dark:text-stone-300">
                Catálogo curado + asesoría rápida por WhatsApp.
              </p>
            </div>
            <div className="flex flex-col gap-2 font-mono text-sm text-stone-700 dark:text-stone-200">
              <a className="hover:underline" href={WHATSAPP_LINK} target="_blank" rel="noreferrer">
                WhatsApp
              </a>
              <span className="text-stone-500 dark:text-stone-400">Lun–Vie 9:00–18:00</span>
              <span className="text-stone-500 dark:text-stone-400">info@alcaleaf.com</span>
            </div>
          </div>
          <div className="mt-10 border-t border-stone-200 pt-6 text-center font-mono text-xs text-stone-500 dark:border-white/10 dark:text-stone-400">
            &copy; {new Date().getFullYear()} alca leaf.
          </div>
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  const [currentPage, setCurrentPage] = useState<NavPage>("inicio");
  const [theme, setTheme] = useState<ThemeMode>(() => getInitialTheme());

  useEffect(() => {
    setHtmlTheme(theme);
    try {
      localStorage.setItem("theme", theme);
    } catch {
      // ignore
    }
    // Keep native form controls consistent
    document.documentElement.style.colorScheme = theme;
  }, [theme]);

  const onNav = (id: NavPage) => {
    setCurrentPage(id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const page = useMemo(() => {
    switch (currentPage) {
      case "inicio":
        return (
          <>
            <HeroBento onShop={() => onNav("productos")} />
            <Productos />
          </>
        );
      default:
        return (
          <>
            <HeroBento onShop={() => onNav("productos")} />
            <Productos />
          </>
        );
    }
  }, [currentPage]);

  return (
    <div className="min-h-screen bg-stone-100 text-stone-900 dark:bg-[#0b0d0c] dark:text-stone-100">
      <Nav
        currentPage={currentPage}
        onNav={onNav}
        theme={theme}
        setTheme={setTheme}
      />

      <main>{page}</main>
      <Footer />

      <a
        href={WHATSAPP_LINK}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 rounded-full bg-[#25D366] p-4 text-white shadow-soft transition-transform hover:scale-[1.05]"
        aria-label="Contactar por WhatsApp"
      >
        <MessageCircle className="h-7 w-7" />
      </a>
    </div>
  );
}
