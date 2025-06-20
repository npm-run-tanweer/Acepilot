import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { GridBackgroundDemo } from "./components/ui/GridBG";
import Material from "./components/Material";
import { ThemeProvider } from "./context/ThemeContext";
import { SignIn, SignUp } from "@clerk/clerk-react";
import StudyPlan from "./components/StudyPlan";
import SignOut from "./components/Signout";

export default function App() {
  return (
    <Router>
      <ThemeProvider>
        <Routes>
          <Route path="/" element={<GridBackgroundDemo />} />
          <Route path="/dashboard" element={<Material />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/study" element={<StudyPlan />} />
          <Route path="/sign-out" element={<SignOut/>} />
        </Routes>
      </ThemeProvider>
    </Router>
  );
}
