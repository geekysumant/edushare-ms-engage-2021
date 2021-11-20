import Header from "./components/UI/Header/Header";
import { Route, Routes, useLocation, useNavigate } from "react-router";
import Welcome from "./pages/Welcome";
import { Navigate } from "react-router-dom";
import Footer from "./components/UI/Footer/Footer";
import TeacherLogin from "./pages/TeacherLogin/TeacherLogin";
import EnterClass from "./pages/EnterClass";
import Home from "./pages/Home";
import Classwork from "./pages/Classwork";
import CreateMcq from "./pages/CreateMcq";
import HeaderClass from "./components/UI/HeaderClass";
import HeaderHome from "./components/UI/HeaderHome";
import QuizScreen from "./pages/QuizScreen";
import QuizResult from "./pages/QuizResult";
import QuizSubmissions from "./pages/QuizSubmissions";
import ViewUserQuizSubmission from "./pages/ViewUserQuizSubmission";
import CreateAssignment from "./pages/CreateAssignment";
import AssignmentScreen from "./pages/AssignmentScreen";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { checkAuthentication } from "./actions/user";

function App() {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isAuthenticated } = useSelector((state) => state.userDetails);
  const onHomeScreen = location.pathname.startsWith("/home");
  const onWelcomeScreen = location.pathname.startsWith("/welcome");

  useEffect(() => {
    dispatch(checkAuthentication());
  }, []);
  useEffect(() => {
    if (!isAuthenticated) {
      return navigate("/welcome");
    }
  }, [isAuthenticated]);
  return (
    <div className="App">
      {onWelcomeScreen ? (
        <>
          <Header />
        </>
      ) : onHomeScreen ? (
        <HeaderHome />
      ) : (
        <HeaderClass />
      )}
      <Routes>
        <Route path="/" element={<Navigate to="/welcome" />} exact />
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/login/teacher" element={<TeacherLogin />} />
        <Route path="/home" element={<Home />} />
        <Route
          path="/enter/class/:classId"
          exact
          strict
          element={<EnterClass />}
        />
        <Route
          path="/enter/class/:classId/classwork"
          exact
          strict
          element={<Classwork />}
        />
        <Route
          path="/enter/class/:classId/classwork/create-mcq"
          exact
          strict
          element={<CreateMcq />}
        />
        <Route
          path="/enter/class/:classId/classwork/create-assignment"
          exact
          strict
          element={<CreateAssignment />}
        />
        <Route
          path="/enter/class/:classId/classwork/quiz/:quizId"
          exact
          element={<QuizScreen />}
        />
        <Route
          path="/enter/class/:classId/classwork/assignment/:assignmentId"
          exact
          element={<AssignmentScreen />}
        />

        <Route
          path="/enter/class/:classId/classwork/quiz/:quizId/results"
          exact
          element={<QuizResult />}
        />
        <Route
          path="/enter/class/:classId/classwork/quiz/:quizId/submissions"
          exact
          element={<QuizSubmissions />}
        />
        <Route
          path="/enter/class/:classId/classwork/quiz/:quizId/submissions/:userId"
          exact
          element={<ViewUserQuizSubmission />}
        />
      </Routes>

      {onWelcomeScreen && <Footer />}
    </div>
  );
}

export default App;
