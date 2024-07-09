// import { MONTH_NAMES } from "../constants/months.constants";
// import analyzeService from "../services/analyze.service";

// class AnalyzeByMonth {
//     public async getCompletedAndNotCompletedTask(userId: number, month: string, year: number) {
//         try {
//             const tasks = await analyzeService.getTask(userId);
//             if (tasks) {
//                 const monthIndex = MONTH_NAMES.findIndex(m => m.toLowerCase() === month.toLowerCase());
//                 if (monthIndex !== -1) {
//                     const filteredTasks:any = tasks.data?.filter(task => {
//                         const taskDate = new Date(task.createDate);
//                         return taskDate.getMonth() === monthIndex && taskDate.getFullYear() === year;
//                     });
//                     if (filteredTasks.length > 0) {
//                         let completedTask = 0;
//                         let pendingTask = 0;
//                         let starredTask = 0;
//                         let notStarredTask = 0;

//                         filteredTasks.forEach((task: { status: boolean; }) => {
//                             if (task.status) {
//                                 completedTask++;
//                             } else {
//                                 pendingTask++;
//                             }
//                         });
//                         filteredTasks.forEach((task: { starred: boolean; }) => {
//                             if (task.starred) {
//                                 starredTask++;
//                             } else {
//                                 notStarredTask++;
//                             }
//                         });

//                         return {
//                             completedTask,
//                             pendingTask,
//                             starredTask,
//                             notStarredTask
//                         };
//                     } else {
//                         return  'No tast for provided mont and year'
//                     }
//                 } else {
//                     console.log("Invalid month name provided.");
//                 }
//             }
//         } catch (error) {
//             console.error("Error:", error);
//         }
//     }
// }

// export default new AnalyzeByMonth();

import AnalyzeByMonth from '../analysis/helpers/analyzeByMonth.helper'
import { handleResponse } from '../helpers/responseFormate'
import { ResponseCodes } from '../utils/responseCodes';
import { ResponseMessages } from '../utils/responseMessages';

class AnalyzeMiddlewareService{
    public async analysis(userId:number,month:string,year:number){
        try{
            const response = await AnalyzeByMonth.getCompletedAndNotCompletedTask(userId,month,year)
            if(response){
                return handleResponse(ResponseCodes.success, ResponseMessages.AnalysisMessage,response);
            }else{
                return handleResponse(ResponseCodes.success,ResponseMessages.AnalysisMessage,null)
            }
        }catch(error){
            return error
        }
    }
}

export default new AnalyzeMiddlewareService