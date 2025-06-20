import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { GridBackgroundDemo } from "./components/ui/GridBG";
import Material from "./components/Material";
import { ThemeProvider } from "./context/ThemeContext";
import { SignIn, SignUp } from "@clerk/clerk-react";
import StudyPlan from "./components/StudyPlan";

export default function App() {
  return (
    <Router>
      <ThemeProvider>
        <Routes>
          <Route path="/" element={<GridBackgroundDemo />} />
          <Route path="/material" element={<Material />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/study" element={<StudyPlan />} />
        </Routes>
      </ThemeProvider>
    </Router>
  );
}
