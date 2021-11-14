import React, { useState } from "react";
import Button from "@material-tailwind/react/Button";
import AddQuestionForm from "../components/AddQuestionForm";
import { useDispatch, useSelector } from "react-redux";
import QuestionContainer from "../components/QuestionContainer";
import Banner from "../components/UI/Banner";
import { createQuiz } from "../actions/assignment";
import { useLocation } from "react-router";
import Spinner from "../components/UI/Spinner";
import Alert from "../components/UI/Alert";

const CreateMcq = () => {
  const [showAddQuestion, setShowAddQuestion] = useState(false);
  const { loading, error } = useSelector((state) => state.createQuiz);
  const [totalMarks, setTotalMarks] = useState(0);
  const [questions, setQuestions] = useState([]);

  const dispatch = useDispatch();
  const location = useLocation();

  const classId = location.pathname.split("/")[3];

  const addQuestionHandler = () => {
    setShowAddQuestion(true);
  };

  const createQuizHandler = () => {
    dispatch(createQuiz(classId, questions));
  };
  return (
    <>
      <Banner />
      <section className="p-4  h-full">
        <div>
          <AddQuestionForm
            showAddQuestion={showAddQuestion}
            setShowAddQuestion={setShowAddQuestion}
            setQuestions={setQuestions}
            setTotalMarks={setTotalMarks}
          />
        </div>

        <div className="bg-white py-2 flex flex-col items-center border rounded">
          <h2 className="font-bold text-2xl my-2">List of Question(s):</h2>

          <div className="flex flex-row  justify-center min-w-full">
            <div className="">
              {questions.length > 0 &&
                questions.map((question, index) => {
                  return (
                    <QuestionContainer
                      key={index}
                      questionBody={question.question}
                      options={question.options}
                      correctOption={question.correctOption}
                      correctMarks={question.correctMarks}
                      incorrectMarks={question.incorrectMarks}
                    />
                  );
                })}
              {error && <Alert color={"red"} message={error} />}
              <div className="flex flex-row justify-between w-full px-6">
                <Button
                  color="indigo"
                  ripple="light"
                  onClick={addQuestionHandler}
                  className="mr-12"
                  // disabled={true}
                >
                  Add question
                </Button>
                {loading ? (
                  <Spinner />
                ) : (
                  <Button
                    color="indigo"
                    ripple="light"
                    onClick={createQuizHandler}
                    // disabled={true}
                  >
                    Create quiz
                  </Button>
                )}
              </div>
            </div>
            <div>
              <h2 className="font-medium">
                Total Questions: {questions.length}
              </h2>
              <h2 className="font-medium">Total Marks: {totalMarks} </h2>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default CreateMcq;
