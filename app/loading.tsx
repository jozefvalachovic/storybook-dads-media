export default function Loading() {
  return (
    <section>
      <div className="w-[var(--app-width-min)] flex flex-col gap-4 animate-pulse">
        <div className="h-8 bg-file-published rounded-2xl dark:bg-light-grey"></div>
        <div className="max-w-[270px] h-4 bg-file-published rounded-2xl dark:bg-light-grey"></div>
        <div className="h-2 bg-file-published rounded-2xl dark:bg-light-grey"></div>
        <div className="max-w-[180px] h-4 bg-file-published rounded-2xl dark:bg-light-grey"></div>
      </div>
    </section>
  );
}
