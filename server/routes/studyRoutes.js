import express from "express";
import { generateStudyGuide } from "../controllers/studyGuideController.js";

const router = express.Router();
router.post("/generate", generateStudyGuide);

export default router;
