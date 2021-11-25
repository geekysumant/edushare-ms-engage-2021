import { Route, Routes, useLocation } from "react-router";
import { Navigate } from "react-router-dom";
import EnterClass from "./pages/EnterClass";
import Home from "./pages/Home";
import Classwork from "./pages/Classwork";
import CreateMcq from "./pages/CreateMcq";
import HeaderClass from "./components/UI/HeaderClass";
import HeaderHome from "./components/UI/HeaderHome";
import QuizScreen from "./pages/QuizScreen";
import QuizResult from "./pages/QuizResult";
import QuizSubmissions from "./pages/QuizSubmissions";
import AssignmentSubmissions from "./pages/AssignmentSubmissions";
import ViewUserQuizSubmission from "./pages/ViewUserQuizSubmission";
import ViewUserAssignmentSubmission from "./pages/ViewUserAssignmentSubmission";
import CreateAssignment from "./pages/CreateAssignment";
import AssignmentScreen from "./pages/AssignmentScreen";
import JoinMeetScreen from "./pages/JoinMeetScreen";
import Meet from "./pages/Meet";
import ViewUsersScreen from "./pages/ViewUsersScreen";
import Welcome from "./pages/Welcome";

function App() {
  const location = useLocation();

  const onHomeScreen = location.pathname.startsWith("/home");
  const onClassScreen = location.pathname.startsWith("/enter");

  return (
    <div className="App">
      <>{onHomeScreen ? <HeaderHome /> : onClassScreen && <HeaderClass />}</>

      <Routes>
        <Route path="/" element={<Navigate to="/welcome" />} exact />
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/home" element={<Home />} />
        <Route path="/join/meet" element={<JoinMeetScreen />} />
        <Route path="/join/meet/:roomID" element={<Meet />} />
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
          path="/enter/class/:classId/classwork/assignment/:assignmentId/submissions"
          exact
          element={<AssignmentSubmissions />}
        />
        <Route
          path="/enter/class/:classId/classwork/quiz/:quizId/submissions/:userId"
          exact
          element={<ViewUserQuizSubmission />}
        />
        <Route
          path="/enter/class/:classId/classwork/assignment/:assignmentId/submissions/:userId"
          exact
          element={<ViewUserAssignmentSubmission />}
        />
        <Route
          path="/enter/class/:classId/people"
          exact
          element={<ViewUsersScreen />}
        />
        <Route path="*" element={<Home />} />
      </Routes>

      {/* {onWelcomeScreen && <Footer />} */}
    </div>
  );
}

export default App;
