import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ModeToggle } from "./components/mode-toggle";
import { ThemeProvider } from "./components/theme-provider";
import { GridBackgroundDemo } from "./components/ui/GridBG";
import Material from "./components/Material";

export default function App() {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<GridBackgroundDemo/>}/>
          <Route path="/material" element={<Material/>}/> 
        </Routes>
    </Router>
  )
}
