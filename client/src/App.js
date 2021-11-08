import Header from "./components/UI/Header/Header";
import { Route, Routes } from "react-router";
import Welcome from "./pages/Welcome";
import { BrowserRouter, Navigate } from "react-router-dom";
import Footer from "./components/UI/Footer/Footer";
import TeacherLogin from "./pages/TeacherLogin/TeacherLogin";
import Home from "./pages/Home";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Navigate to="/welcome" />} exact />
          <Route path="/welcome" element={<Welcome />} />
          <Route path="/login/teacher" element={<TeacherLogin />} />
          <Route path="/home" element={<Home />} />
        </Routes>
        {/* <Footer /> */}
      </div>
    </BrowserRouter>
  );
}

export default App;
