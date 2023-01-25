import { useRouter } from "next/router";

import { dehydrate, QueryClient, useQuery } from "@tanstack/react-query";
import { get_movie } from "~/services/movie";
import Layout from "~/components/Layout";

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: "blocking",
  };
}

export async function getStaticProps(context: any) {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery([`popular-${context.params.id}`], () =>
    get_movie(context.params.id as number)
  );
  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}

function Detail() {
  const router = useRouter();
  const { id } = router.query;
  const { data } = useQuery({
    queryKey: [`popular-${id}`],
    queryFn: () => get_movie(parseInt(`${id}`)),
  });
  return (
    <Layout title={`Detail ${data?.title}`}>
      <h1>Detail {data?.title}</h1>
    </Layout>
  );
}

export default Detail;
