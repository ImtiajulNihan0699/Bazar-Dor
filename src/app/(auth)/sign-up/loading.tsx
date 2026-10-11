const FieldSkeleton = () => (
  <div>
    <div className="mb-2 h-4 w-24 animate-pulse rounded bg-gray-200" />
    <div className="h-12 w-full animate-pulse rounded-lg bg-gray-200" />
  </div>
);

export default function Loading() {
  return (
    <main
      className="flex min-h-screen flex-col items-center justify-center gap-6 bg-gradient-to-br from-green-50 via-white to-emerald-100 px-4 py-10"
      aria-busy="true"
      aria-label="লোড হচ্ছে"
    >
      <section className="w-full max-w-md rounded-2xl border border-gray-100 bg-white p-6 shadow-xl shadow-green-900/10 sm:p-9">
        {/* শিরোনাম */}
        <div className="mb-8 flex flex-col items-center gap-3">
          <div className="h-8 w-56 animate-pulse rounded bg-gray-200" />
          <div className="h-4 w-64 animate-pulse rounded bg-gray-200" />
        </div>

        {/* ফর্ম ফিল্ড */}
        <div className="flex flex-col gap-5">
          <FieldSkeleton />
          <FieldSkeleton />
          <FieldSkeleton />
          <FieldSkeleton />
          <div className="mt-2 h-12 w-full animate-pulse rounded-lg bg-green-200" />
        </div>

        {/* অথবা divider */}
        <div className="my-6 flex items-center gap-3">
          <div className="h-px flex-1 bg-gray-200" />
          <div className="h-3 w-10 animate-pulse rounded bg-gray-200" />
          <div className="h-px flex-1 bg-gray-200" />
        </div>

        {/* সোশ্যাল বাটন */}
        <div className="flex flex-col gap-3">
          <div className="h-12 w-full animate-pulse rounded-lg bg-gray-200" />
          <div className="h-12 w-full animate-pulse rounded-lg bg-gray-200" />
        </div>

        {/* নিচের লিংক */}
        <div className="mt-6 flex justify-center">
          <div className="h-4 w-48 animate-pulse rounded bg-gray-200" />
        </div>
      </section>

      <div className="h-4 w-32 animate-pulse rounded bg-gray-200" />
    </main>
  );
}