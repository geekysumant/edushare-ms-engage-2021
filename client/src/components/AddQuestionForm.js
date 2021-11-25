import React, { useState } from "react";
import Alert from "./UI/Alert";

import Modal from "@material-tailwind/react/Modal";
import ModalHeader from "@material-tailwind/react/ModalHeader";
import ModalBody from "@material-tailwind/react/ModalBody";
import ModalFooter from "@material-tailwind/react/ModalFooter";
import Button from "@material-tailwind/react/Button";
import Option from "./UI/Option";

export default function AddQuestionForm({
  showAddQuestion,
  setShowAddQuestion,
  setQuestions,
  setTotalMarks,
}) {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState([]);
  const [optionNumber, setOptionNumber] = useState(1);
  const [correctOption, setCorrectOption] = useState(-1);
  const [error, setError] = useState("");
  const [correctMarks, setCorrectMarks] = useState(1);
  const [incorrectMarks, setIncorrectMarks] = useState(0);
  const [optionDesc, setOptionDesc] = useState("");

  const resetFields = () => {
    setQuestion("");
    setOptions([]);
    setOptionNumber(1);
    setOptionDesc("");
    setCorrectOption(-1);
    setCorrectMarks(1);
    setIncorrectMarks(0);
    setError("");
    setShowAddQuestion(false);
  };

  const createQuestionHandler = () => {
    if (!question || options.length === 0 || correctOption === -1) {
      setError("One or more fields are invalid.");
      return;
    }
    const questionBody = {
      question,
      options,
      correctOption,
      correctMarks,
      incorrectMarks,
    };
    setQuestions((prevQuestions) => [...prevQuestions, questionBody]);
    setTotalMarks((totalMarks) => totalMarks + correctMarks);

    resetFields();
  };
  const addOptionsHandler = (e) => {
    e.preventDefault();
    setOptionDesc("");
    const currentOption = {
      option: optionDesc,
      optionNumber: optionNumber,
    };
    setOptions((options) => [...options, currentOption]);
    setOptionNumber(optionNumber + 1);
  };

  return (
    <>
      <Modal
        size="lg"
        active={showAddQuestion}
        toggler={() => {
          setShowAddQuestion(false);
          resetFields();
        }}
      >
        <ModalHeader
          toggler={() => {
            setShowAddQuestion(false);
            resetFields();
          }}
        >
          Add question
          <p className="text-sm font-normal">
            Enter the question, add options, select the correct option.
          </p>
        </ModalHeader>

        <ModalBody>
          <form className="w-full p-2 mb-4 sm:w-80">
            <div className="mb-4 ">
              <label className="block text-left w-96">
                <span className="text-gray-700">Question</span>
                <textarea
                  className="form-textarea mt-1 block w-full border border-blue-300 rounded sm:w-80"
                  rows="3"
                  placeholder="Question body goes here"
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                ></textarea>
              </label>
            </div>

            <div
              className="my-4"
              onChange={(e) => {
                setCorrectOption(parseInt(e.target.value));
              }}
            >
              {options.length > 0 &&
                options.map((option) => {
                  return (
                    <Option
                      key={option.optionNumber}
                      optionDesc={option.option}
                      optionNumber={option.optionNumber}
                    />
                  );
                })}
            </div>
            <div className="flex h-10 justify-between  w-full sm:flex-col sm:items-center sm:h-20 sm:w-80">
              <input
                className="w-full shadow appearance-none border rounded w-full py-2 px-3 mx-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                placeholder="Option description"
                value={optionDesc}
                onChange={(e) => setOptionDesc(e.target.value)}
              />

              <Button
                color="green"
                ripple="light"
                onClick={(e) => addOptionsHandler(e)}
              >
                Add option
              </Button>
            </div>
          </form>

          <div className="">
            <label className="block text-left w-96 flex md:justify-between lg:justify-between xl:justify-between flex-row sm:w-64 sm:my-4 ">
              <span className="text-gray-700 mx-4">
                Marks for correct answer:
              </span>
              <input
                className="mt-1 w-12 border border-blue-300 rounded"
                value={correctMarks}
                type="number"
                min="1"
                onChange={(e) => setCorrectMarks(parseInt(e.target.value))}
              />
            </label>
            <label className="block text-left w-96 flex justify-between flex-row sm:w-64 sm:my-4">
              <span className="text-gray-700 mx-4">
                Marks for incorrect answer:
              </span>
              <input
                className="mt-1 w-12 border border-blue-300 rounded"
                type="number"
                max="0"
                value={incorrectMarks}
                onChange={(e) => setIncorrectMarks(parseInt(e.target.value))}
              />
            </label>
          </div>

          {error && <Alert color={"red"} message={error} />}
        </ModalBody>

        <div className="sm:mx-auto">
          <ModalFooter className="sm:flex sm:justify-center w-10">
            <Button
              color="red"
              buttonType="link"
              onClick={(e) => {
                setShowAddQuestion(false);
                resetFields();
              }}
              ripple="dark"
            >
              Cancel
            </Button>

            <Button
              color="green"
              ripple="light"
              onClick={createQuestionHandler}
            >
              Create question
            </Button>
          </ModalFooter>
        </div>
      </Modal>
    </>
  );
}
