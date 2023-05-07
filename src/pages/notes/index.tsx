import React from "react";
import { LogOutButton } from "y/components/LogOutButton";
import { getAuth, buildClerkProps, clerkClient } from "@clerk/nextjs/server";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import AddNoteForm from "y/components/AddNoteForm";
import NotesToasts from "y/components/NotesToasts";
import { api } from "y/utils/api";

const Notes = ({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  console.log(data);

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
