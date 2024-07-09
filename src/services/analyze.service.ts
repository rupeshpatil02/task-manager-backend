import Task, { ITask } from '../models/task.model';
import { handleResponse } from '../helpers/responseFormate';
import { ResponseCodes } from '../utils/responseCodes';
import { ResponseMessages } from '../utils/responseMessages';

class AnalyzerService {
    async getTask(userId: number) {
        try {
            const tasks = await Task.find({ user: userId });
            return handleResponse(ResponseCodes.success, ResponseMessages.tasksFetched, tasks);
        } catch (error) {
            throw new Error('Failed to fetch tasks: ' + error);
        }
    }
}

export default new AnalyzerService()