import React, { useEffect, useMemo, useState } from "react";
import {
  ArrowRight,
  BadgeCheck,
  ChevronRight,
  Leaf,
  Menu,
  MessageCircle,
  Moon,
  ShieldCheck,
  Sparkles,
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
  variant?: "primary" | "ghost" | "dark";
  className?: string;
}) {
  const base =
    "inline-flex items-center justify-center rounded-full px-5 py-2 text-sm font-medium transition-colors";
  const variants: Record<string, string> = {
    primary:
      "bg-alca-300/80 text-stone-950 hover:bg-alca-300 dark:bg-alca-300/90 dark:text-stone-950",
    ghost:
      "bg-stone-200/60 text-stone-900 hover:bg-stone-200 dark:bg-white/10 dark:text-stone-100 dark:hover:bg-white/15",
    dark:
      "bg-stone-900 text-white hover:bg-stone-800 dark:bg-white dark:text-stone-950 dark:hover:bg-stone-100",
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

function SectionTitle({
  title,
  subtitle,
  right,
}: {
  title: string;
  subtitle?: string;
  right?: React.ReactNode;
}) {
  return (
    <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
      <div>
        {subtitle ? (
          <div className="font-mono text-xs uppercase tracking-widest text-stone-500 dark:text-stone-400">
            {subtitle}
          </div>
        ) : null}
        <h2 className="mt-2 font-mono text-2xl font-semibold text-stone-950 dark:text-stone-100">
          {title}
        </h2>
      </div>
      {right ? <div className="flex items-center gap-2">{right}</div> : null}
    </div>
  );
}

function HeroBento({
  onShop,
  onExploreTop,
  onLearn,
}: {
  onShop: () => void;
  onExploreTop: () => void;
  onLearn: () => void;
}) {
  const qrSrc = `https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(
    WHATSAPP_LINK
  )}`;

  return (
    <section className="bg-stone-100 py-10 dark:bg-[#0b0d0c]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="rounded-[34px] bg-stone-900 p-6 dark:bg-black">
          {/* top bar inside frame */}
          <div className="mb-4 flex items-center justify-between">
            <div className="text-white">
              <Brand className="text-white" />
            </div>
            <div className="hidden items-center gap-2 md:flex">
              <PillButton onClick={onLearn} variant="ghost" className="bg-white/10 text-white hover:bg-white/15">
                Login/Sign Up
              </PillButton>
              <PillButton href={WHATSAPP_LINK} variant="dark">
                Download App
              </PillButton>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
            {/* Big hero */}
            <div className="lg:col-span-8">
              <div className="relative overflow-hidden rounded-[28px] bg-white p-10 dark:bg-[#0f1110]">
                <div className="absolute inset-y-0 right-0 w-[40%] bg-gradient-to-l from-stone-100 to-transparent dark:from-[#141716]" />
                <div className="relative max-w-xl">
                  <h1 className="font-mono text-4xl leading-tight text-stone-950 dark:text-stone-100 sm:text-5xl">
                    Bring Nature Home
                  </h1>
                  <p className="mt-4 max-w-lg font-mono text-sm leading-relaxed text-stone-700 dark:text-stone-300">
                    Suplementos naturales y asesoría directa. Catálogo curado por
                    objetivo: digestión, energía, descanso, inmunidad.
                  </p>
                  <div className="mt-6 flex flex-wrap gap-3">
                    <PillButton onClick={onShop} variant="primary">
                      Shop Now
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
                <button
                  onClick={onExploreTop}
                  className="overflow-hidden rounded-[28px] bg-stone-100 p-8 text-left transition-colors hover:bg-stone-200 dark:bg-white/5 dark:hover:bg-white/10"
                >
                  <div className="flex items-center justify-between">
                    <div className="font-mono text-sm text-stone-600 dark:text-stone-300">
                      Explore
                      <div className="text-xl font-semibold text-stone-950 dark:text-stone-100">
                        Top Sellers
                      </div>
                    </div>
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-sm dark:bg-white/10">
                      <ArrowRight className="h-5 w-5 text-stone-900 dark:text-stone-100" />
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
                </button>

                <button
                  onClick={onLearn}
                  className="overflow-hidden rounded-[28px] bg-white p-8 text-left transition-colors hover:bg-stone-50 dark:bg-[#0f1110] dark:hover:bg-[#141716]"
                >
                  <div className="font-mono text-sm text-stone-600 dark:text-stone-300">
                    Indoor Bloom
                    <div className="mt-2 text-sm leading-relaxed text-stone-700 dark:text-stone-300">
                      Guías rápidas y recomendaciones para elegir mejor.
                    </div>
                  </div>
                  <div className="mt-6 flex items-center justify-between">
                    <span className="inline-flex items-center rounded-full bg-stone-200/60 px-4 py-2 font-mono text-sm text-stone-900 dark:bg-white/10 dark:text-stone-100">
                      Learn More
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </span>
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-alca-300/70">
                      <ArrowRight className="h-4 w-4 text-stone-900" />
                    </div>
                  </div>
                </button>
              </div>
            </div>

            {/* Bottom row */}
            <div className="lg:col-span-3">
              <div className="rounded-[28px] bg-white p-8 dark:bg-[#0f1110]">
                <div className="font-mono text-sm text-stone-600 dark:text-stone-300">
                  Scan to chat
                </div>
                <div className="mt-4 flex items-center justify-center">
                  <img
                    src={qrSrc}
                    alt="QR WhatsApp"
                    width={180}
                    height={180}
                    className="h-44 w-44 rounded-2xl border border-stone-200 bg-white object-contain p-2 dark:border-white/10"
                    loading="lazy"
                  />
                </div>
                <div className="mt-4 font-mono text-xs text-stone-600 dark:text-stone-300">
                  Escanea para escribirnos en WhatsApp.
                </div>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="rounded-[28px] bg-stone-100 p-8 dark:bg-white/5">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <div className="font-mono text-2xl font-semibold text-stone-950 dark:text-stone-100">
                      Simple.
                    </div>
                    <div className="font-mono text-2xl font-semibold text-stone-950 dark:text-stone-100">
                      Fresh vibes.
                    </div>
                    <p className="mt-3 max-w-md font-mono text-sm text-stone-700 dark:text-stone-300">
                      Productos + hábitos. Menos ruido, más claridad.
                    </p>
                    <div className="mt-6">
                      <PillButton onClick={onLearn} variant="ghost">
                        Ver guía
                        <ChevronRight className="ml-2 h-4 w-4" />
                      </PillButton>
                    </div>
                  </div>
                  <div className="overflow-hidden rounded-2xl bg-white dark:bg-[#0f1110]">
                    <img
                      src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
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
                <div className="mt-6">
                  <PillButton onClick={onShop} variant="dark" className="w-full">
                    Ver productos
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </PillButton>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

type Product = {
  id: string;
  name: string;
  desc: string;
  price: string;
  tags: string[];
  image: string;
};

function ProductModal({
  product,
  onClose,
}: {
  product: Product;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <button
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
        aria-label="Cerrar"
      />
      <div className="relative w-full max-w-3xl rounded-[34px] border border-stone-200 bg-white p-6 shadow-soft dark:border-white/10 dark:bg-[#0f1110]">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="font-mono text-xs uppercase tracking-widest text-stone-500 dark:text-stone-400">
              Producto
            </div>
            <h3 className="mt-2 font-mono text-2xl font-semibold text-stone-950 dark:text-stone-100">
              {product.name}
            </h3>
            <div className="mt-2 font-mono text-sm text-stone-600 dark:text-stone-300">
              {product.desc}
            </div>
          </div>
          <button
            onClick={onClose}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-stone-200/60 text-stone-900 hover:bg-stone-200 dark:bg-white/10 dark:text-stone-100 dark:hover:bg-white/15"
            aria-label="Cerrar modal"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="overflow-hidden rounded-[28px] bg-stone-100 dark:bg-white/5">
            <img
              src={product.image}
              alt={product.name}
              className="h-64 w-full object-cover"
              loading="lazy"
            />
          </div>
          <div>
            <div className="font-mono text-3xl font-semibold text-stone-950 dark:text-stone-100">
              {product.price}
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {product.tags.map((t) => (
                <span
                  key={t}
                  className="rounded-full bg-stone-200/60 px-3 py-1 font-mono text-xs text-stone-900 dark:bg-white/10 dark:text-stone-100"
                >
                  {t}
                </span>
              ))}
            </div>

            <div className="mt-6 space-y-3 font-mono text-sm text-stone-700 dark:text-stone-200">
              <div className="flex items-start gap-2">
                <BadgeCheck className="mt-0.5 h-4 w-4 text-alca-700 dark:text-alca-300" />
                Recomendación personalizada por WhatsApp.
              </div>
              <div className="flex items-start gap-2">
                <ShieldCheck className="mt-0.5 h-4 w-4 text-alca-700 dark:text-alca-300" />
                Ingredientes y uso explicados sin humo.
              </div>
              <div className="flex items-start gap-2">
                <Sparkles className="mt-0.5 h-4 w-4 text-alca-700 dark:text-alca-300" />
                Rutina sugerida (mañana/noche) según objetivo.
              </div>
            </div>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <PillButton href={WHATSAPP_LINK} variant="primary" className="w-full">
                Pedir por WhatsApp
                <ChevronRight className="ml-2 h-4 w-4" />
              </PillButton>
              <PillButton onClick={onClose} variant="ghost" className="w-full">
                Seguir viendo
              </PillButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Productos({
  onOpen,
}: {
  onOpen: (p: Product) => void;
}) {
  const products: Product[] = useMemo(
    () => [
      {
        id: "curcuma",
        name: "Cúrcuma + Pimienta Negra",
        desc: "Apoyo antiinflamatorio y antioxidante para rutina diaria.",
        price: "$299 MXN",
        tags: ["Articulaciones", "Antioxidante"],
        image:
          "https://images.unsplash.com/photo-1615486511484-92e172fc34ea?ixlib=rb-4.0.3&auto=format&fit=crop&w=1400&q=80",
      },
      {
        id: "magnesio",
        name: "Magnesio (citrato)",
        desc: "Relajación muscular, descanso y soporte general.",
        price: "$349 MXN",
        tags: ["Sueño", "Estrés"],
        image:
          "https://images.unsplash.com/photo-1611078816827-0c75ce552d00?ixlib=rb-4.0.3&auto=format&fit=crop&w=1400&q=80",
      },
      {
        id: "jengibre",
        name: "Jengibre",
        desc: "Digestión, náuseas y apoyo inmunológico.",
        price: "$219 MXN",
        tags: ["Digestión", "Inmunidad"],
        image:
          "https://images.unsplash.com/photo-1599940824399-b87987ceb72a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1400&q=80",
      },
      {
        id: "omega",
        name: "Omega 3",
        desc: "Soporte cardiovascular y salud cerebral.",
        price: "$399 MXN",
        tags: ["Corazón", "Enfoque"],
        image:
          "https://images.unsplash.com/photo-1550572017-edd951aa8f7e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1400&q=80",
      },
      {
        id: "probio",
        name: "Probióticos",
        desc: "Equilibrio intestinal para mejor absorción de nutrientes.",
        price: "$459 MXN",
        tags: ["Microbiota", "Digestión"],
        image:
          "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?ixlib=rb-4.0.3&auto=format&fit=crop&w=1400&q=80",
      },
      {
        id: "melatonina",
        name: "Melatonina",
        desc: "Apoyo para conciliar el sueño y regular el descanso.",
        price: "$289 MXN",
        tags: ["Sueño", "Rutina"],
        image:
          "https://images.unsplash.com/photo-1515895309288-7b73b1b1c3f2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1400&q=80",
      },
      {
        id: "ashwa",
        name: "Ashwagandha",
        desc: "Adaptógeno para estrés y energía estable.",
        price: "$499 MXN",
        tags: ["Estrés", "Energía"],
        image:
          "https://images.unsplash.com/photo-1610210311476-3b016edb44e1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1400&q=80",
      },
      {
        id: "vitd",
        name: "Vitamina D",
        desc: "Soporte inmune y bienestar general.",
        price: "$249 MXN",
        tags: ["Inmunidad", "Huesos"],
        image:
          "https://images.unsplash.com/photo-1583947215259-38e31be8751f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1400&q=80",
      },
    ],
    []
  );

  return (
    <section className="bg-stone-100 py-14 dark:bg-[#0b0d0c]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionTitle
          title="Top Sellers"
          subtitle="Productos"
          right={
            <PillButton href={WHATSAPP_LINK} variant="ghost">
              Hablar con asesor
              <ChevronRight className="ml-2 h-4 w-4" />
            </PillButton>
          }
        />

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {products.map((p) => (
            <Card key={p.id} className="p-0 overflow-hidden">
              <button
                className="block w-full text-left"
                onClick={() => onOpen(p)}
                aria-label={`Ver ${p.name}`}
              >
                <div className="h-44 w-full overflow-hidden bg-stone-100 dark:bg-white/5">
                  <img
                    src={p.image}
                    alt={p.name}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-300 hover:scale-[1.03]"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-start justify-between gap-3">
                    <div className="font-mono text-lg font-semibold text-stone-950 dark:text-stone-100">
                      {p.name}
                    </div>
                    <div className="font-mono text-sm text-stone-700 dark:text-stone-200">
                      {p.price}
                    </div>
                  </div>
                  <div className="mt-2 font-mono text-sm text-stone-600 dark:text-stone-300">
                    {p.desc}
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {p.tags.slice(0, 2).map((t) => (
                      <span
                        key={t}
                        className="rounded-full bg-stone-200/60 px-3 py-1 font-mono text-xs text-stone-900 dark:bg-white/10 dark:text-stone-100"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  <div className="mt-6">
                    <span className="inline-flex w-full items-center justify-center rounded-full bg-stone-200/60 px-5 py-2 font-mono text-sm font-medium text-stone-900 transition-colors hover:bg-stone-200 dark:bg-white/10 dark:text-stone-100 dark:hover:bg-white/15">
                      Ver producto
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </span>
                  </div>
                </div>
              </button>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

function NosotrosPage({ onShop }: { onShop: () => void }) {
  return (
    <section className="bg-stone-100 py-14 dark:bg-[#0b0d0c]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionTitle title="Nosotros" subtitle="Sobre alca leaf" />

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Card className="rounded-[34px]">
              <div className="font-mono text-sm text-stone-600 dark:text-stone-300">
                Somos una marca enfocada en bienestar natural con una idea simple:
                recomendaciones claras, productos confiables y rutinas que sí se
                pueden sostener.
              </div>
              <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div className="rounded-[28px] bg-stone-100 p-6 dark:bg-white/5">
                  <div className="flex items-center gap-2 font-mono text-sm font-semibold text-stone-950 dark:text-stone-100">
                    <ShieldCheck className="h-4 w-4 text-alca-700 dark:text-alca-300" />
                    Calidad
                  </div>
                  <p className="mt-2 font-mono text-sm text-stone-600 dark:text-stone-300">
                    Ingredientes y uso explicados sin exageraciones.
                  </p>
                </div>
                <div className="rounded-[28px] bg-stone-100 p-6 dark:bg-white/5">
                  <div className="flex items-center gap-2 font-mono text-sm font-semibold text-stone-950 dark:text-stone-100">
                    <Sparkles className="h-4 w-4 text-alca-700 dark:text-alca-300" />
                    Simplicidad
                  </div>
                  <p className="mt-2 font-mono text-sm text-stone-600 dark:text-stone-300">
                    Menos opciones, más claridad.
                  </p>
                </div>
              </div>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <PillButton onClick={onShop} variant="primary" className="w-full">
                  Ver catálogo
                  <ChevronRight className="ml-2 h-4 w-4" />
                </PillButton>
                <PillButton href={WHATSAPP_LINK} variant="ghost" className="w-full">
                  Hablar por WhatsApp
                  <ChevronRight className="ml-2 h-4 w-4" />
                </PillButton>
              </div>
            </Card>
          </div>

          <div className="lg:col-span-5">
            <Card className="rounded-[34px] p-0 overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1556040220-4096d522378d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
                alt="Bienestar"
                className="h-72 w-full object-cover"
                loading="lazy"
              />
              <div className="p-6">
                <div className="font-mono text-sm text-stone-600 dark:text-stone-300">
                  Atención Lun–Vie 9:00–18:00 · Respuesta rápida.
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}

function BeneficiosPage({ onShop }: { onShop: () => void }) {
  const items = useMemo(
    () => [
      {
        title: "Digestión",
        desc: "Rutinas simples para sentir ligereza y mejorar hábitos.",
      },
      {
        title: "Energía estable",
        desc: "Sin picos: enfoque en consistencia y soporte diario.",
      },
      {
        title: "Descanso",
        desc: "Apoyo para conciliar el sueño y mejorar recuperación.",
      },
      {
        title: "Inmunidad",
        desc: "Soporte general con hábitos y suplementos clave.",
      },
    ],
    []
  );

  return (
    <section className="bg-stone-100 py-14 dark:bg-[#0b0d0c]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionTitle
          title="Beneficios"
          subtitle="Guía rápida"
          right={
            <PillButton onClick={onShop} variant="primary">
              Ver productos
              <ChevronRight className="ml-2 h-4 w-4" />
            </PillButton>
          }
        />

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Card className="rounded-[34px] p-0 overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1490645935967-10de6ba17061?ixlib=rb-4.0.3&auto=format&fit=crop&w=1400&q=80"
                alt="Hábitos"
                className="h-72 w-full object-cover"
                loading="lazy"
              />
              <div className="p-6">
                <div className="font-mono text-sm text-stone-600 dark:text-stone-300">
                  Lo importante: consistencia. Nosotros te decimos por dónde
                  empezar.
                </div>
              </div>
            </Card>
          </div>

          <div className="lg:col-span-7">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {items.map((b) => (
                <Card key={b.title} className="rounded-[34px]">
                  <div className="flex items-start gap-3">
                    <span className="mt-1 h-3 w-3 rounded-full bg-alca-300" />
                    <div>
                      <div className="font-mono text-lg font-semibold text-stone-950 dark:text-stone-100">
                        {b.title}
                      </div>
                      <div className="mt-2 font-mono text-sm text-stone-600 dark:text-stone-300">
                        {b.desc}
                      </div>
                    </div>
                  </div>
                  <div className="mt-6">
                    <PillButton href={WHATSAPP_LINK} variant="ghost" className="w-full">
                      Preguntar
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </PillButton>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

type Post = { id: string; title: string; cat: string; excerpt: string; img: string };

function BlogPage() {
  const posts: Post[] = useMemo(
    () => [
      {
        id: "habitos",
        title: "5 hábitos simples que sí puedes sostener",
        cat: "Hábitos",
        excerpt:
          "Una lista corta para mejorar energía y digestión sin empezar de cero.",
        img: "https://images.unsplash.com/photo-1524594152303-9fd13543fe6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1400&q=80",
      },
      {
        id: "sueno",
        title: "Rutina nocturna de 10 minutos",
        cat: "Descanso",
        excerpt:
          "Qué hacer (y qué no) antes de dormir para mejorar tu recuperación.",
        img: "https://images.unsplash.com/photo-1525097487452-6278ff080c31?ixlib=rb-4.0.3&auto=format&fit=crop&w=1400&q=80",
      },
      {
        id: "energia",
        title: "Energía estable: sin picos, sin drama",
        cat: "Nutrición",
        excerpt:
          "Cómo elegir suplementos y hábitos que no te revienten a media tarde.",
        img: "https://images.unsplash.com/photo-1505253716362-afaea1d3d1af?ixlib=rb-4.0.3&auto=format&fit=crop&w=1400&q=80",
      },
    ],
    []
  );

  const [openPost, setOpenPost] = useState<Post | null>(null);

  return (
    <section className="bg-stone-100 py-14 dark:bg-[#0b0d0c]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionTitle title="Blog" subtitle="Guías y tips" />

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {posts.map((p) => (
            <Card key={p.id} className="p-0 overflow-hidden">
              <button onClick={() => setOpenPost(p)} className="block w-full text-left">
                <div className="h-44 w-full overflow-hidden bg-stone-100 dark:bg-white/5">
                  <img
                    src={p.img}
                    alt={p.title}
                    loading="lazy"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <div className="font-mono text-xs uppercase tracking-widest text-stone-500 dark:text-stone-400">
                    {p.cat}
                  </div>
                  <div className="mt-2 font-mono text-lg font-semibold text-stone-950 dark:text-stone-100">
                    {p.title}
                  </div>
                  <div className="mt-2 font-mono text-sm text-stone-600 dark:text-stone-300">
                    {p.excerpt}
                  </div>
                  <div className="mt-6">
                    <span className="inline-flex items-center font-mono text-sm font-medium text-stone-900 dark:text-stone-100">
                      Leer
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </span>
                  </div>
                </div>
              </button>
            </Card>
          ))}
        </div>

        {openPost ? (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            <button
              className="absolute inset-0 bg-black/40"
              onClick={() => setOpenPost(null)}
              aria-label="Cerrar"
            />
            <div className="relative w-full max-w-3xl overflow-hidden rounded-[34px] border border-stone-200 bg-white shadow-soft dark:border-white/10 dark:bg-[#0f1110]">
              <div className="flex items-start justify-between gap-3 p-6">
                <div>
                  <div className="font-mono text-xs uppercase tracking-widest text-stone-500 dark:text-stone-400">
                    {openPost.cat}
                  </div>
                  <div className="mt-2 font-mono text-2xl font-semibold text-stone-950 dark:text-stone-100">
                    {openPost.title}
                  </div>
                </div>
                <button
                  onClick={() => setOpenPost(null)}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-stone-200/60 text-stone-900 hover:bg-stone-200 dark:bg-white/10 dark:text-stone-100 dark:hover:bg-white/15"
                  aria-label="Cerrar modal"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="h-64 w-full bg-stone-100 dark:bg-white/5">
                <img
                  src={openPost.img}
                  alt={openPost.title}
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="p-6 font-mono text-sm text-stone-700 dark:text-stone-200">
                <p>
                  (Placeholder) Aquí va el contenido del artículo. Por ahora lo
                  dejamos como layout listo para llenar copy.
                </p>
                <p className="mt-4">
                  Si quieres, hago el copy completo en tono alca leaf y lo
                  dejamos publicado.
                </p>
                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <PillButton href={WHATSAPP_LINK} variant="primary" className="w-full">
                    Pedir recomendación
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </PillButton>
                  <PillButton onClick={() => setOpenPost(null)} variant="ghost" className="w-full">
                    Cerrar
                  </PillButton>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}

function Newsletter() {
  return (
    <section className="bg-stone-100 py-14 dark:bg-[#0b0d0c]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Card className="rounded-[34px]">
          <div className="grid grid-cols-1 items-center gap-6 md:grid-cols-2">
            <div>
              <div className="font-mono text-xs uppercase tracking-widest text-stone-500 dark:text-stone-400">
                Boletín
              </div>
              <div className="mt-2 font-mono text-2xl font-semibold text-stone-950 dark:text-stone-100">
                Promos + guías (sin spam)
              </div>
              <div className="mt-2 font-mono text-sm text-stone-600 dark:text-stone-300">
                Déjanos tu email y te mandamos ofertas y recomendaciones.
              </div>
            </div>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex flex-col gap-3 sm:flex-row"
            >
              <input
                type="email"
                required
                placeholder="Tu email"
                className="w-full rounded-full border-stone-200 bg-white px-4 py-3 font-mono text-sm dark:border-white/10 dark:bg-[#0b0d0c]"
              />
              <PillButton variant="primary" className="whitespace-nowrap">
                Suscribirme
                <ChevronRight className="ml-2 h-4 w-4" />
              </PillButton>
            </form>
          </div>
        </Card>
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

            <div className="grid grid-cols-2 gap-10 font-mono text-sm text-stone-700 dark:text-stone-200">
              <div className="space-y-2">
                <div className="text-xs uppercase tracking-widest text-stone-500 dark:text-stone-400">
                  Sitio
                </div>
                <a className="block hover:underline" href="#">
                  Políticas
                </a>
                <a className="block hover:underline" href="#">
                  Aviso de privacidad
                </a>
                <a className="block hover:underline" href="#">
                  Envíos y devoluciones
                </a>
              </div>
              <div className="space-y-2">
                <div className="text-xs uppercase tracking-widest text-stone-500 dark:text-stone-400">
                  Contacto
                </div>
                <a
                  className="block hover:underline"
                  href={WHATSAPP_LINK}
                  target="_blank"
                  rel="noreferrer"
                >
                  WhatsApp
                </a>
                <span className="block text-stone-500 dark:text-stone-400">
                  Lun–Vie 9:00–18:00
                </span>
                <span className="block text-stone-500 dark:text-stone-400">
                  info@alcaleaf.com
                </span>
              </div>
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
  const [selected, setSelected] = useState<Product | null>(null);

  useEffect(() => {
    setHtmlTheme(theme);
    try {
      localStorage.setItem("theme", theme);
    } catch {
      // ignore
    }
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
            <HeroBento
              onShop={() => onNav("productos")}
              onExploreTop={() => onNav("productos")}
              onLearn={() => onNav("beneficios")}
            />
            <Productos onOpen={(p) => setSelected(p)} />
            <Newsletter />
          </>
        );
      case "nosotros":
        return (
          <>
            <NosotrosPage onShop={() => onNav("productos")} />
            <Newsletter />
          </>
        );
      case "productos":
        return (
          <>
            <Productos onOpen={(p) => setSelected(p)} />
            <Newsletter />
          </>
        );
      case "beneficios":
        return (
          <>
            <BeneficiosPage onShop={() => onNav("productos")} />
            <Productos onOpen={(p) => setSelected(p)} />
            <Newsletter />
          </>
        );
      case "blog":
        return (
          <>
            <BlogPage />
            <Newsletter />
          </>
        );
      default:
        return null;
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

      {selected ? (
        <ProductModal product={selected} onClose={() => setSelected(null)} />
      ) : null}

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
