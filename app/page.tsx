import Pagination from "./components/Pagination";

interface Params {
  searchParams: {
    page: string;
  };
}

export default function Home({ searchParams: { page } }: Params) {
  return (
    <Pagination itemCount={100} pageSize={10} currentPage={parseInt(page)} />
  );
}
