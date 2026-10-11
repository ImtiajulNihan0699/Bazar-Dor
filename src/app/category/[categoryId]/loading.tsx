
export default function Loading() {
  return (
    <main className="mx-auto min-h-[60vh] w-full max-w-7xl space-y-6 px-4 py-8 sm:px-6 lg:px-8">
      {/* Category heading and description */}
      <section className="animate-pulse space-y-3">
        <div className="h-7 w-48 rounded bg-gray-200 sm:w-64" />
        <div className="h-4 w-3/4 max-w-lg rounded bg-gray-100" />
      </section>

      {/* Category product cards */}
      <section
        aria-label="Loading products"
        className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
      >
        {Array.from({ length: 6 }, (_, index) => (
          <div
            key={index}
            className="animate-pulse rounded-[22px] border border-gray-200 bg-white p-4"
          >
            <div className="flex items-center gap-3">
              <div className="h-[60px] w-[60px] shrink-0 rounded-xl bg-gray-200" />
              <div className="flex-1 space-y-2">
                <div className="h-4 w-3/4 rounded bg-gray-200" />
                <div className="h-3 w-1/2 rounded bg-gray-100" />
              </div>
            </div>

            <div className="mt-4 h-5 w-2/5 rounded bg-gray-200" />

            <div className="mt-3 flex items-center justify-between">
              <div className="h-5 w-16 rounded-full bg-gray-100" />
              <div className="h-5 w-12 rounded-full bg-gray-200" />
            </div>
          </div>
        ))}
      </section>
    </main>
  );
}
