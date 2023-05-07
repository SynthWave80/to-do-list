import Spinner from "react-bootstrap/Spinner";

function Loader() {
  return (
    <div className="flex min-h-screen min-w-full items-center justify-center">
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </div>
  );
}

export default Loader;
