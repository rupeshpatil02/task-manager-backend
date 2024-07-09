import { MONTH_NAMES } from "../../constants/months.constants";
import analyzeService from "../../services/analyze.service";

class AnalyzeByMonth {
    public async getCompletedAndNotCompletedTask(userId: number, month: string, year: number) {
        try {
            const tasks = await analyzeService.getTask(userId);
            if (!tasks) {
                throw new Error("Failed to fetch tasks.");
            }
            
            const monthIndex = MONTH_NAMES.findIndex(m => m.toLowerCase() === month.toLowerCase());
            if (monthIndex === -1) {
                throw new Error("Invalid month name provided.");
            }

            const filteredTasks = tasks.data?.filter(task => {
                const taskDate = new Date(task.createDate);
                return taskDate.getMonth() === monthIndex && taskDate.getFullYear() === year;
            });

            if (!filteredTasks || filteredTasks.length === 0) {
                return null; // No tasks found for the provided month and year
            }

            let completedTask = 0;
            let pendingTask = 0;
            let starredTask = 0;
            let notStarredTask = 0;

            filteredTasks.forEach(task => {
                if (task.status) {
                    completedTask++;
                } else {
                    pendingTask++;
                }
                if (task.starred) {
                    starredTask++;
                } else {
                    notStarredTask++;
                }
            });

            return {
                completedTask,
                pendingTask,
                starredTask,
                notStarredTask
            };
        } catch (error) {
            console.error("Error:", error);
            throw new Error("Failed to analyze tasks.");
        }
    }
}

export default new AnalyzeByMonth();
