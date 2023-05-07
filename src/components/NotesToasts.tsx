import { Note } from "@prisma/client";
import { FC, ProviderProps } from "react";
import Toast from "react-bootstrap/Toast";

function BasicExample(props: { notesdata: Note[] | undefined }) {
  console.log(props.notesdata);

  const data = props.notesdata;

  return (
    <div>
      {data?.map((note) => (
        <Toast key={note.id}>
          <Toast.Header>
            <strong className="me-auto">{note.title}</strong>
            <small>{note.createdAt.getMinutes()} mins ago</small>
          </Toast.Header>
          <Toast.Body>{note.content}</Toast.Body>
        </Toast>
      ))}
      ;
    </div>
  );
}

export default BasicExample;
