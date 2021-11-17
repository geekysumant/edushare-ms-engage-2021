import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Alert from "./UI/Alert";

import Modal from "@material-tailwind/react/Modal";
import ModalHeader from "@material-tailwind/react/ModalHeader";
import ModalBody from "@material-tailwind/react/ModalBody";
import ModalFooter from "@material-tailwind/react/ModalFooter";
import Button from "@material-tailwind/react/Button";

import { joinClass } from "../actions/class";
import Spinner from "./UI/Spinner";

export default function JoinClassForm({ showJoinClass, setShowJoinClass }) {
  const [classCode, setClassCode] = useState("");

  const { loading, success, error } = useSelector((state) => state.joinClass);
  const dispatch = useDispatch();

  const onJoinHandler = () => {
    if (!classCode) return;
    dispatch(joinClass(classCode));
    // dispatch(fetchClasses());
  };

  return (
    <>
      <Modal
        size="lg"
        active={showJoinClass}
        toggler={() => setShowJoinClass(false)}
      >
        <ModalHeader toggler={() => setShowJoinClass(false)}>
          Join class
        </ModalHeader>
        <span>Ask your teacher for the class code, then enter it here.</span>

        <ModalBody>
          <form className="w-96 p-2 mb-4">
            <div className="mb-4">
              <input
                className="w-full shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                placeholder="Class code"
                onChange={(e) => setClassCode(e.target.value)}
              />
            </div>
          </form>
          {success ? (
            <Alert color={"green"} message="Class joined" />
          ) : loading ? (
            <Spinner text="Joining class" />
          ) : error ? (
            <Alert color={"red"} message={error} />
          ) : null}
        </ModalBody>

        <ModalFooter>
          <Button
            color="red"
            buttonType="link"
            onClick={(e) => setShowJoinClass(false)}
            ripple="dark"
          >
            Cancel
          </Button>

          <Button color="green" onClick={onJoinHandler} ripple="light">
            Join
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
}
