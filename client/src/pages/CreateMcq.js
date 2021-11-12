import React, { useState } from "react";
import Button from "@material-tailwind/react/Button";
import AddQuestionForm from "../components/AddQuestionForm";
import { useDispatch, useSelector } from "react-redux";
import QuestionContainer from "../components/QuestionContainer";
import Banner from "../components/UI/Banner";
import { createQuiz } from "../actions/assignment";
import { useLocation } from "react-router";

const CreateMcq = () => {
  const [showAddQuestion, setShowAddQuestion] = useState(false);
  // const { totalMarks } = useSelector((state) => state.questions);
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

          <div className="flex flex-row space-between">
            <div>
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
              <div className="flex flex-row justify-between w-3/5 px-6">
                <Button
                  color="indigo"
                  ripple="light"
                  onClick={addQuestionHandler}
                  // disabled={true}
                >
                  Add question
                </Button>
                <Button
                  color="indigo"
                  ripple="light"
                  onClick={createQuizHandler}
                  // disabled={true}
                >
                  Create quiz
                </Button>
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
