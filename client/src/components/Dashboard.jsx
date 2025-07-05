import React, { useEffect, useState } from "react";
import { ModeToggle } from "./mode-toggle";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { useNavigate } from "react-router";
import { MultiStepLoader as Loader } from "../components/ui/multi-step-loader";
import { IconSquareRoundedX } from "@tabler/icons-react";
import axios from "axios";
import MindMap from "./StudyPlan";
import { SidebarDemo } from "./Sidebar";
import { useStudyPlan } from "../context/StudyPlanContext";
import StudyPlan from "./StudyPlan";

const BACKEND_URL = "http://localhost:5000"; // For Vite
const loadingStates = [
  {
    text: "Opening the study vault",
  },
  {
    text: "Scanning your topic",
  },
  {
    text: "Reading the syllabus",
  },
  {
    text: "Analyzing key concepts",
  },
  {
    text: "Summarizing core ideas",
  },
  {
    text: "Generating a mind map",
  },
  {
    text: "Linking topics together",
  },
  {
    text: "Finalizing your study plan",
  },
];
const fetchStudyGuide = async (topic, syllabus) => {
  try {
    const response = await axios.post(
      `${BACKEND_URL}/api/study/generate`,
      { topic, syllabus },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true, // only if your backend needs it
      }
    );
    return response.data.data.nodes.result;
  } catch (error) {
    console.error("Error fetching study guide:", error);
    throw error;
  }
};

const Dashboard = () => {
  const navigate = useNavigate();
  const [topic, setTopic] = useState("");
  const [syllabus, setSyllabus] = useState(null);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  async function handleSubmit() {
    setLoading(true);
    console.log({ topic, syllabus });
    const result = await fetchStudyGuide(topic, syllabus);
    console.log(result);
    setData(result);
    setLoading(false);
    navigate("/study");
    setTopic("");
    setSyllabus("");
  }
  return (
    <div className="flex">
      <SidebarDemo />
      {data ? (
        <StudyPlan />
      ) : (
        <div className="relative flex w-full h-screen flex-1 flex-col gap-2 border border-neutral-200 bg-neutral-100 p-2 md:p-10 dark:border-neutral-700 dark:bg-neutral-900">
          <div className="absolute right-6 top-6">
            <ModeToggle />
          </div>
          <div className="min-w-xl text-center flex flex-col gap-4 m-auto">
            <h1 className="text-3xl font-medium font-[Inter]">
              Let's get started <br /> What are you studying?
            </h1>
            <Input
              value={topic}
              onChange={(e) => {
                setTopic(e.target.value);
              }}
              placeholder={"Type your subject to begin your study plan"}
              className="font-normal"
            />
            <Textarea
              value={syllabus}
              onChange={(e) => {
                setSyllabus(e.target.value);
              }}
              rows={5}
            />

            <Loader
              loadingStates={loadingStates}
              loading={loading}
              duration={2000}
            />
            <Button
              onClick={handleSubmit}
              className={
                "bg-neutral-800 text-white dark:bg-white dark:text-neutral-800"
              }
            >
              Submit
            </Button>
            {loading && (
              <button
                className="fixed top-4 right-4 text-black dark:text-white z-[120]"
                onClick={() => setLoading(false)}
              >
                <IconSquareRoundedX className="h-10 w-10" />
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
