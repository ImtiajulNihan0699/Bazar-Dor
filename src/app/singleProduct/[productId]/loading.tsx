
export default function Loading() {
  return (
    <main className="min-h-screen animate-pulse bg-[#f0f7f2] px-3 py-5 text-gray-800 sm:px-6 sm:py-8">
      <div className="mx-auto max-w-6xl space-y-5">
        {/* Breadcrumb */}
        <div className="flex gap-2">
          <div className="h-4 w-12 rounded bg-emerald-100" />
          <div className="h-4 w-20 rounded bg-emerald-100" />
          <div className="h-4 w-28 rounded bg-emerald-100" />
        </div>

        {/* Product summary */}
        <section className="rounded-2xl border border-emerald-100 bg-white p-4 shadow-sm sm:p-6">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
            <div className="size-24 shrink-0 rounded-2xl bg-[#edf4e7] sm:size-36" />

            <div className="min-w-0 flex-1 space-y-3">
              <div className="h-7 w-3/4 rounded bg-gray-200 sm:h-9" />
              <div className="h-4 w-1/2 rounded bg-gray-100" />
              <div className="h-4 w-full max-w-xs rounded bg-gray-100" />
            </div>

            <div className="flex w-full shrink-0 flex-col items-center rounded-2xl bg-gradient-to-br from-[#e7f5eb] to-[#dff0e5] p-5 sm:w-64">
              <div className="h-4 w-24 rounded bg-emerald-100" />
              <div className="mt-3 h-10 w-36 rounded bg-emerald-100" />
              <div className="mt-3 h-6 w-16 rounded bg-emerald-100" />
            </div>
          </div>
        </section>

        {/* Price summary */}
        <section className="rounded-2xl border border-emerald-100 bg-white p-4 shadow-sm sm:p-6">
          <div className="mb-4 h-6 w-40 rounded bg-gray-200" />

          <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
            {Array.from({ length: 3 }, (_, index) => (
              <div
                key={index}
                className="rounded-xl border border-gray-200 p-4"
              >
                <div className="h-4 w-24 rounded bg-gray-100" />
                <div className="mt-3 h-7 w-28 rounded bg-gray-200" />
                <div className="mt-3 h-3 w-36 max-w-full rounded bg-gray-100" />
              </div>
            ))}
          </div>
        </section>

        {/* Market prices table */}
        <section className="rounded-2xl border border-emerald-100 bg-white p-4 shadow-sm sm:p-6">
          <div className="mb-5 h-7 w-56 max-w-full rounded bg-gray-200" />

          <div className="overflow-hidden rounded-xl border border-emerald-100">
            {/* Table heading */}
            <div className="grid grid-cols-4 gap-4 bg-[#e8f4ed] p-4">
              {Array.from({ length: 4 }, (_, index) => (
                <div
                  key={index}
                  className="h-4 rounded bg-emerald-100"
                />
              ))}
            </div>

            {/* Table rows */}
            {Array.from({ length: 5 }, (_, index) => (
              <div
                key={index}
                className={`grid grid-cols-4 gap-4 border-t border-gray-100 p-4 ${
                  index % 2 === 0 ? "bg-white" : "bg-[#f5f9f6]"
                }`}
              >
                {Array.from({ length: 4 }, (_, cellIndex) => (
                  <div
                    key={cellIndex}
                    className="h-4 rounded bg-gray-200"
                  />
                ))}
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
