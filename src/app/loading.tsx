
export default function Loading() {
  return (
    <main className="mx-auto w-full max-w-7xl space-y-8 px-4 py-6 sm:px-6 lg:px-8">
      {/* Hero banner skeleton */}
      <section className="animate-pulse rounded-2xl bg-gray-100 p-6 sm:p-10">
        <div className="grid min-h-[220px] grid-cols-1 items-center gap-8 sm:grid-cols-2">
          <div className="space-y-4">
            <div className="h-4 w-28 rounded bg-gray-300" />
            <div className="h-8 w-3/4 rounded bg-gray-300" />
            <div className="h-4 w-full max-w-sm rounded bg-gray-200" />
            <div className="h-4 w-2/3 rounded bg-gray-200" />
          </div>

          <div className="h-40 rounded-xl bg-gray-200 sm:h-48" />
        </div>
      </section>

      {/* Product section heading */}
      <section className="space-y-5">
        <div className="animate-pulse space-y-2">
          <div className="h-6 w-48 rounded bg-gray-200" />
          <div className="h-4 w-64 max-w-full rounded bg-gray-100" />
        </div>

        {/* Product cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }, (_, index) => (
            <div
              key={index}
              className="animate-pulse rounded-2xl border border-gray-200 bg-white p-4"
            >
              <div className="flex items-center gap-3">
                <div className="h-[60px] w-[60px] shrink-0 rounded-xl bg-gray-200" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 w-3/4 rounded bg-gray-200" />
                  <div className="h-3 w-1/2 rounded bg-gray-100" />
                </div>
              </div>

              <div className="mt-4 h-5 w-2/5 rounded bg-gray-200" />

              <div className="mt-3 flex justify-between">
                <div className="h-5 w-16 rounded-full bg-gray-100" />
                <div className="h-5 w-12 rounded-full bg-gray-200" />
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
