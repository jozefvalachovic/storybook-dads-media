export default function Loading() {
  return (
    <main>
      <header></header>
      <section className="w-[var(--app-width-min)]">
        <div className="w-full flex flex-col gap-4 animate-pulse">
          <div className="h-8 bg-file-published rounded-2xl dark:bg-light-grey"></div>
          <div className="h-4 bg-file-published rounded-2xl dark:bg-light-grey"></div>
          <div className="h-2 bg-file-published rounded-2xl dark:bg-light-grey"></div>
        </div>
      </section>
    </main>
  );
}
