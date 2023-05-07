import { SignIn, SignOutButton } from "@clerk/clerk-react";
import { SignedOut } from "@clerk/nextjs";
import { Note } from "@prisma/client";
import Head from "next/head";
import Link from "next/link";
import { getAuth, buildClerkProps, clerkClient } from "@clerk/nextjs/server";
import {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from "next";

import { api } from "y/utils/api";

const Home = () => {
  return (
    <>
      <Head>
        <title>Todo list</title>
        <meta name="description" content="T3 to do list" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex min-h-screen min-w-full items-center justify-center bg-black">
        <SignIn redirectUrl={"/notes"} afterSignInUrl={"/notes"} />
      </div>
    </>
  );
};

export default Home;
