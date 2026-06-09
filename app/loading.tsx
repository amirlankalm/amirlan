export default function Loading() {
  return (
    <main className="mx-auto min-h-dvh max-w-[760px] px-5 py-6 sm:px-8 sm:py-10">
      <div className="mt-32 flex items-center gap-2.5 font-mono text-xs uppercase tracking-[0.18em] text-stone-500">
        <span className="pulse-dot relative inline-block h-1.5 w-1.5 rounded-full bg-stone-500" />
        loading
      </div>
    </main>
  );
}
