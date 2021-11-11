import Header from "./components/UI/Header/Header";
import { Route, Routes } from "react-router";
import Welcome from "./pages/Welcome";
import { BrowserRouter, Navigate } from "react-router-dom";
import Footer from "./components/UI/Footer/Footer";
import TeacherLogin from "./pages/TeacherLogin/TeacherLogin";
import EnterClass from "./pages/EnterClass";
import Home from "./pages/Home";
import Classwork from "./pages/Classwork";
import CreateMcq from "./pages/CreateMcq";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Navigate to="/welcome" />} exact />
          <Route path="/welcome" element={<Welcome />} />
          <Route path="/login/teacher" element={<TeacherLogin />} />
          <Route path="/home" element={<Home />} />
          <Route path="/enter/class/:classId" exact element={<Classwork />} />
          <Route
            path="/enter/class/:classId/create-mcq"
            element={<CreateMcq />}
          />
        </Routes>
        {/* <Footer /> */}
      </div>
    </BrowserRouter>
  );
}

export default App;
