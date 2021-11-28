import React, { useEffect, useState } from "react";
import Button from "@material-tailwind/react/Button";
import AddQuestionForm from "../components/AddQuestionForm";
import { useDispatch, useSelector } from "react-redux";
import QuestionContainer from "../components/QuestionContainer";
import Banner from "../components/UI/Banner";
import { createQuiz } from "../actions/assignment";
import { useNavigate, useParams } from "react-router";
import Spinner from "../components/UI/Spinner";
import Alert from "../components/UI/Alert";
import QuestionSVG from "../assets/svg/question.svg";
import AddQuestionSVG from "../assets/svg/add_question.svg";
import { fetchEnterClassDetails } from "../actions/class";

const CreateMcq = () => {
  const [showAddQuestion, setShowAddQuestion] = useState(false);
  const { loading, success, error } = useSelector((state) => state.createQuiz);
  const { isAuthenticated, userInfo } = useSelector(
    (state) => state.userDetails
  );
  const { createdBy } = useSelector((state) => state.enterClassDetails);

  const [totalMarks, setTotalMarks] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [title, setTitle] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();

  const classId = params.classId;

  useEffect(() => {
    if (!isAuthenticated) {
      return navigate("/welcome");
    }
    if (createdBy && createdBy !== userInfo.id) {
      return navigate("/home");
    }
  }, [createdBy, isAuthenticated]);

  useEffect(() => {
    dispatch(fetchEnterClassDetails(classId));
  }, []);

  const addQuestionHandler = () => {
    setShowAddQuestion(true);
  };

  const createQuizHandler = () => {
    if (questions.length === 0) {
      return;
    }
    dispatch(createQuiz(classId, questions, title));
  };
  return (
    <>
      <Banner
        SVGComponent={QuestionSVG}
        heading="Create Quiz"
        bannerBackground="cheese"
        customText="Create and share quiz with your class easily!"
      />
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
          <div className="flex flex-row items-center justify-between">
            <div className="flex flex-row my-4 sm:w-full w-1/2 items-center justify-center">
              <p>Quiz Title:</p>
              <input
                className="shadow appearance-none border rounded py-2 px-3 mx-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div>
              <h2 className="font-medium">
                Total Questions: {questions && questions.length}
              </h2>
              <h2 className="font-medium">Total Marks: {totalMarks} </h2>
            </div>
          </div>
          <div className="flex flex-row  justify-center min-w-full sm:flex-col sm:items-center">
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
              {questions && questions.length === 0 && (
                <div className="w-1/2 mx-auto">
                  <img src={AddQuestionSVG} alt="" />
                </div>
              )}
              <div className="flex flex-row justify-between w-full px-6 sm:flex-col sm:items-center">
                <Button
                  color="indigo"
                  ripple="light"
                  onClick={addQuestionHandler}
                  className="mr-12 sm:mx-0 sm:my-4"
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
                    className="sm:my-4"
                    // disabled={true}
                  >
                    Create quiz
                  </Button>
                )}
              </div>
              <div className="my-4">
                {error ? (
                  <Alert color="red" message={error} />
                ) : (
                  success && <Alert color="green" message="Quiz created!" />
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default CreateMcq;
