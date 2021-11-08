import Header from "./components/UI/Header/Header";
import { Route, Routes } from "react-router";
import Welcome from "./pages/Welcome";
import { BrowserRouter, Navigate } from "react-router-dom";
import Footer from "./components/UI/Footer/Footer";
import TeacherLogin from "./pages/TeacherLogin/TeacherLogin";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Navigate to="/welcome" />} exact />
          <Route path="/welcome" element={<Welcome />} />
          <Route path="/login/teacher" element={<TeacherLogin />} />
        </Routes>
        {/* <Footer /> */}
      </div>
    </BrowserRouter>
  );
}

export default App;
