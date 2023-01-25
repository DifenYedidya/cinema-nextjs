import { get_movies } from "~/services/movie";
import { dehydrate, QueryClient, useQuery } from "@tanstack/react-query";
import Layout from "~/components/Layout";
import Link from "next/link";
import {
  ArrowRightOnRectangleIcon,
  HomeIcon,
  UserIcon,
  Cog6ToothIcon,
  ArchiveBoxIcon,
  MagnifyingGlassIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import { Poppins } from "@next/font/google";
import React from "react";
import Card from "~/components/Card";

const poppins = Poppins({
  weight: ["300", "400", "600"],
  subsets: ["latin"],
});
export async function getStaticProps() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(["popular"], () => get_movies("popular"));
  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}

const svgprops: React.ComponentProps<"svg"> = {
  width: 28,
  height: 28,
  strokeWidth: 1,
};

const Navs = [
  HomeIcon,
  UserCircleIcon,
  Cog6ToothIcon,
  ArchiveBoxIcon,
  MagnifyingGlassIcon,
];

function Index() {
  const { data } = useQuery({
    queryKey: ["popular"],
    queryFn: () => get_movies("popular"),
  });
  const [isActive, setActive] = React.useState(0);
  return (
    <Layout title="Homepage">
      <div className={`w-full min-h-screen flex ${poppins.className}`}>
        {/* sidebar */}
        <div className="flex flex-col bg-[#1F2326] text-gray-500 px-8 py-12">
          <nav className="flex-1 flex flex-col gap-8">
            {Navs.map((Item, k) => (
              <Link href="/" key={k}>
                <Item {...svgprops} />
              </Link>
            ))}
          </nav>
          <div>
            <ArrowRightOnRectangleIcon {...svgprops} />
          </div>
        </div>
        {/* mainpage */}
        <div className="flex-1 px-8 py-12">
          {/* header */}
          <div className="mb-8">
            <h1 className="mb-8 text-4xl font-semibold text-neutral-100 ">
              My cinema
            </h1>
            <ul className="flex gap-8">
              {["All", "Comedy", "Fantasy", "Drama", "History", "Horror"].map(
                (tab, i) => (
                  <li key={i}>
                    <button
                      onClick={() => setActive(i)}
                      className={`py-4 px-12 rounded-3xl bg-neutral-800 text-lg 
                      ${i == isActive && "bg-orange-500 text-neutral-50"}`}
                    >
                      {tab}
                    </button>
                  </li>
                )
              )}
            </ul>
          </div>
          {/* banner */}
          <div className="h-40 bg-neutral-800 mb-8 rounded-2xl"></div>
          {/* list */}
          <ul className="flex gap-12 w-[88vw] overflow-auto whitespace-nowrap">
            {data?.map((movie) => (
              <li key={movie.id}>
                <Card {...movie} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Layout>
  );
}

export default Index;
