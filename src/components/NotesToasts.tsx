import { Note } from "@prisma/client";
import { FC, ProviderProps, useState } from "react";
import Toast from "react-bootstrap/Toast";
import { api } from "y/utils/api";
import { AiOutlineEdit } from "react-icons/ai";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { string } from "zod";

function BasicExample(props: { notesdata: Note[] | undefined }) {
  const [show, setShow] = useState({
    modal: false,
    id: "",
  });
  console.log(props.notesdata);

  const data = props.notesdata;

  const { mutateAsync: deleteNote } = api.example.deleteNote.useMutation();
  const { data: notesdata, refetch } = api.example.getAll.useQuery();
  const { data: uniqueNote } = api.example.getNote.useQuery(show.id);
  const { mutateAsync: updateNote } = api.example.updateNote.useMutation();

  const callDeteteNote = async (id: string) => {
    await deleteNote(id);
    await refetch();
  };

  const handleClose = () =>
    setShow({
      modal: false,
      id: "",
    });
  const handleShow = (id: string) =>
    setShow({
      modal: true,
      id: id,
    });

  const DisplayingErrorMessagesSchema = Yup.object().shape({
    title: Yup.string()
      .min(2, "Too Short!")
      .max(16, "Too Long!")
      .required("Required"),
    content: Yup.string()
      .min(5, "Too Short!")
      .max(256, "Too Long!")
      .required("Required"),
  });

  return (
    <div>
      {data?.map((note) => (
        <Toast
          key={note.id}
          onClose={async () => await callDeteteNote(note.id)}
        >
          <Toast.Header className="gap-1">
            <strong className="me-auto pl-2">{note.title}</strong>
            <small>{note.createdAt.getMinutes()} mins ago</small>
            <AiOutlineEdit
              onClick={() => handleShow(note.id)}
              className="cursor-pointer"
              size={20}
            />
          </Toast.Header>
          <Toast.Body>{note.content}</Toast.Body>
        </Toast>
      ))}
      ;
      <>
        <Modal show={show.modal} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {uniqueNote && (
              <Formik
                initialValues={{
                  title: uniqueNote.title,
                  content: uniqueNote.content,
                  id: uniqueNote.id,
                }}
                validationSchema={DisplayingErrorMessagesSchema}
                onSubmit={async (values) => {
                  await updateNote(values);
                  await refetch();
                  handleClose();
                }}
              >
                {({ errors, touched }) => (
                  <Form>
                    <label htmlFor="">Title</label>
                    <Field name="title" />
                    {errors.title && touched.title && <div>{errors.title}</div>}
                    <label htmlFor="">content</label>
                    <Field name="content" />
                    {errors.content && touched.content && (
                      <div>{errors.content}</div>
                    )}
                    <Button variant="primary" type="submit">
                      Submit
                    </Button>
                  </Form>
                )}
              </Formik>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleClose}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    </div>
  );
}

export default BasicExample;
