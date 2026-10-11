import NavlinksList from "./Navlinkslist";

interface NavlinksProps {
  id: string;
  nameBn: string;
  slug: string;
  icon: string;
}

const Navlinks = async () => {
  const res = await fetch(
    "https://api.api-store.workers.dev/api/bazardor/categories"
  );

  if (!res.ok) {
    throw new Error("Failed to fetch navigation links");
  }

  const data: NavlinksProps[] = await res.json();

  return <NavlinksList data={data} />;
};

export default Navlinks;