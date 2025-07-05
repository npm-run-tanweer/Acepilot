import { createContext, useContext, useState } from "react";

const StudyPlanContext = createContext();

export const StudyPlanProvider = ({ children }) => {
  const [studyPlanData, setStudyPlanData] = useState(null);
  return (
    <StudyPlanContext.Provider value={{ studyPlanData, setStudyPlanData }}>
      {children}
    </StudyPlanContext.Provider>
  );
};

export const useStudyPlan = () => useContext(StudyPlanContext);
