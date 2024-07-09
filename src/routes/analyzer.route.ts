import express from 'express';
import AnalyzeController from "../controllers/analyzer.controller."


const router = express.Router();

router.post('/getByMonth',AnalyzeController.analyzeByMonth)

export default router;