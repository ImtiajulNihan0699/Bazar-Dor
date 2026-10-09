"use client";

const BannerButton = () => {
  const handleScroll = () => {
    const librarySection = document.getElementById("library");

    if (librarySection) {
      librarySection.scrollIntoView({
        behavior: "smooth",
      });
    }
  };

  return (
    <button
      onClick={handleScroll}
      className="mt-12 rounded-lg bg-green-900 px-6 py-3 text-lg font-semibold text-white shadow-sm transition-colors hover:bg-green-600"
    >
      সব পণ্য দেখুন
    </button>
  );
};

export default BannerButton;
