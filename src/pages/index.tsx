import { SignIn, SignOutButton } from "@clerk/clerk-react";
import { SignedOut } from "@clerk/nextjs";
import { Note } from "@prisma/client";
import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";

import { api } from "y/utils/api";

const Home: NextPage = () => {
  const hello = api.example.getAll.useQuery();
  return (
    <>
      <Head>
        <title>Todo list</title>
        <meta name="description" content="T3 to do list" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="min-h-screen bg-white">
        <SignIn afterSignInUrl={"/notes"} />
      </div>
    </>
  );
};

export default Home;
