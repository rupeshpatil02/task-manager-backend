// controllers/userController.ts
import { Request, Response } from 'express';
import { internalServerError } from '../helpers/responseFormate';
import AnalyzeMiddlewareService from "../analysis/analyzeByMonth"

class AnalyzeController {
    public async analyzeByMonth(req: Request, res: Response) {
        const { userId, month, year } = req.body
        try {
            const response = await AnalyzeMiddlewareService.analysis(userId, month, year)
            res.json(response)
        } catch (error) {
            res.json(internalServerError)
        }
    }
}
export default new AnalyzeController();