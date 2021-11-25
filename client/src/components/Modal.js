import { Dialog, Transition } from "@headlessui/react";
import Button from "@material-tailwind/react/Button";
import { Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createClass } from "../actions/class";
import Alert from "./UI/Alert";
import Spinner from "./UI/Spinner";

export default function Modal({ setShowCreateClass, showCreateClass }) {
  const [className, setClassName] = useState("");
  const [subject, setSubject] = useState("");
  const [room, setRoom] = useState("");

  const { loading, success, error } = useSelector((state) => state.createClass);
  const dispatch = useDispatch();

  const onCreateHandler = () => {
    if (!className && !subject && !room) return;
    dispatch(createClass(className, subject, room));
  };

  return (
    <>
      <Transition appear show={showCreateClass} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={() => setShowCreateClass(false)}
        >
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  Create Class
                </Dialog.Title>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    <form className="w-96 p-2 mb-4">
                      <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
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
                    {success ? (
                      <Alert
                        color={"green"}
                        message="Class created, share the class code for students to join!"
                      />
                    ) : loading ? (
                      <Spinner text="Creating class" />
                    ) : error ? (
                      <Alert color={"red"} message={error} />
                    ) : null}
                  </p>
                </div>

                <div className="mt-4">
                  <button
                    type="button"
                    className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                    onClick={() => setShowCreateClass(false)}
                  >
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
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
