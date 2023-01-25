import Head from "next/head";
import React from "react";

type Props = {
  title: string;
  description?: string;
  children: React.ReactNode;
};

const Index: React.FC<Props> = ({ title, description, children }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description || ""} />
      </Head>
      {children}
    </>
  );
};

export default Index;
