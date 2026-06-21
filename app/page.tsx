export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
      <p className="text-[var(--color-muted)] uppercase tracking-[0.3em] text-xs mb-8">
        Foundation check
      </p>

      <h1
        className="font-[family-name:var(--font-heading)] uppercase"
        style={{ fontSize: "var(--text-hero)" }}
      >
        Oryxel
      </h1>

      <p
        className="mt-6 max-w-xl text-[var(--color-muted)]"
        style={{ fontSize: "1.125rem", lineHeight: 1.7 }}
      >
        We engineer digital products worth obsessing over.
        <br />
        <span className="text-[var(--color-fg)]">
          Web · Mobile · AI · Design · SaaS
        </span>
      </p>

      <button className="mt-10 group relative inline-flex items-center gap-2 border border-[var(--color-line)] px-7 py-3 text-sm uppercase tracking-widest transition-colors hover:border-[var(--color-accent)]">
        <span className="transition-colors group-hover:text-[var(--color-accent)]">
          Let&apos;s Talk
        </span>
      </button>

      <div className="mt-16 flex items-center gap-3 text-xs text-[var(--color-muted)]">
        <span className="h-2 w-2 rounded-full bg-[var(--color-accent)]" />
        Accent: electric blue #4A7BF7
      </div>
    </main>
  );
}
