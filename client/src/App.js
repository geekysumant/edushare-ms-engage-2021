import Header from "./components/UI/Header/Header";
import { Route, Routes, useLocation } from "react-router";
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

function App() {
  const location = useLocation();
  const onHomeScreen = location.pathname.startsWith("/home");
  return (
    <div className="App">
      {onHomeScreen ? <HeaderHome /> : <HeaderClass />}
      <Routes>
        <Route path="/" element={<Navigate to="/welcome" />} exact />
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/login/teacher" element={<TeacherLogin />} />
        <Route path="/home" element={<Home />} />
        <Route path="/enter/class/:classId" exact element={<EnterClass />} />
        <Route
          path="/enter/class/:classId/classwork"
          exact
          element={<Classwork />}
        />
        <Route
          path="/enter/class/:classId/classwork/create-mcq"
          exact
          element={<CreateMcq />}
        />
        <Route
          path="/enter/class/:classId/classwork/quiz/:quizId"
          exact
          element={<QuizScreen />}
        />
        <Route
          path="/enter/class/:classId/classwork/quiz/:quizId/results"
          exact
          element={<QuizResult />}
        />
      </Routes>
      {/* <Footer /> */}
    </div>
  );
}

export default App;
