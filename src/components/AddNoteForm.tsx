import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { api } from "y/utils/api";

const AddNoteForm = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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

  const { mutateAsync: addNote } = api.example.addNote.useMutation();
  const { data: notesdata, refetch } = api.example.getAll.useQuery();
  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Add Note
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Note</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik
            initialValues={{
              title: "",
              content: "",
            }}
            validationSchema={DisplayingErrorMessagesSchema}
            onSubmit={async (values) => {
              await addNote(values);
              await refetch();
              setShow(false);
              console.log(values);
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
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AddNoteForm;
