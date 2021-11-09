import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Modal from "@material-tailwind/react/Modal";
import ModalHeader from "@material-tailwind/react/ModalHeader";
import ModalBody from "@material-tailwind/react/ModalBody";
import ModalFooter from "@material-tailwind/react/ModalFooter";
import Button from "@material-tailwind/react/Button";

import { createClass } from "../actions/class";

export default function CreateClassForm({
  showCreateClass,
  setShowCreateClass,
}) {
  const [className, setClassName] = useState("");
  const [subject, setSubject] = useState("");
  const [room, setRoom] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState("");
  const [isEnabled, setIsEnabled] = useState(false);

  const { loading, error } = useSelector((state) => state.classDetails);
  const dispatch = useDispatch();

  useEffect(() => {
    if (loading) setIsLoading(true);
    if (error) setIsError(error);
  }, [loading, error]);

  const onCreateHandler = () => {
    if (!className && !subject && !room) return;
    dispatch(createClass(className, subject, room));
  };

  return (
    <>
      <Modal
        size="lg"
        active={showCreateClass}
        toggler={() => setShowCreateClass(false)}
      >
        {isError && <p>{error}</p>}
        <ModalHeader toggler={() => setShowCreateClass(false)}>
          Create class
        </ModalHeader>

        <ModalBody>
          <form className="w-96 p-2 mb-4">
            <div className="mb-4">
              <label class="block text-gray-700 text-sm font-bold mb-2">
                Class name
              </label>
              <input
                className="w-full shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                placeholder="Class name"
                onChange={(e) => setClassName(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Subject
              </label>
              <input
                className="w-full shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                placeholder="Subject"
                onChange={(e) => setSubject(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Room
              </label>
              <input
                className="w-full shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                placeholder="Room"
                onChange={(e) => setRoom(e.target.value)}
              />
            </div>
          </form>
        </ModalBody>
        <ModalFooter>
          <Button
            color="red"
            buttonType="link"
            onClick={(e) => setShowCreateClass(false)}
            ripple="dark"
          >
            Cancel
          </Button>

          <Button
            color="green"
            onClick={onCreateHandler}
            ripple="light"
            // disabled={true}
          >
            Create
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
}
