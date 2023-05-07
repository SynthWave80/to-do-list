import React, { useEffect } from "react";
import { LogOutButton } from "y/components/LogOutButton";
import { getAuth, buildClerkProps, clerkClient } from "@clerk/nextjs/server";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import AddNoteForm from "y/components/AddNoteForm";
import NotesToasts from "y/components/NotesToasts";
import { api } from "y/utils/api";
import { useRouter } from "next/router";

const Notes = ({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  console.log("test", data);
  useEffect(() => {
    if (data.__clerk_ssr_state.userId === null) {
      router.push("/");
    }
  }, [data.userId]);
  const router = useRouter();

  const { data: notesdata, refetch } = api.example.getAll.useQuery();

  return (
    <div>
      notes
      <LogOutButton />
      <AddNoteForm />
      <NotesToasts notesdata={notesdata} />
    </div>
  );
};

export default Notes;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { userId } = getAuth(ctx.req);

  const user = userId ? await clerkClient.users.getUser(userId) : undefined;
  const data = { ...buildClerkProps(ctx.req, { user }) };
  return { props: { data } };
};
