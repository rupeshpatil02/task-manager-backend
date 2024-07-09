import { Request, Response, NextFunction } from 'express';
import { getCompletedTaskSchema, getTaskSchema, taskCreationSchema ,deleteTask, taskUpdateSchema, taskStarSchema, completTask} from '../TypeChecks/tasks.type';
import { validateSchema } from '../../helpers/validation.helper';

class ValidSchema {
 
    static validateTaskCreation(req: Request, res: Response, next: NextFunction) {
        return validateSchema(taskCreationSchema)(req, res, next);
    }

    static validateGetTask(req: Request, res: Response, next: NextFunction) {
        return validateSchema(getTaskSchema)(req, res, next);
    }

    static validateCompletedTask(req: Request, res: Response, next: NextFunction) {
        return validateSchema(getCompletedTaskSchema)(req, res, next);
    }

    static validateDeleteTask(req: Request, res: Response, next: NextFunction){
        return validateSchema(deleteTask)(req, res, next);
    }
    static validateUpdateTask(req: Request, res: Response, next: NextFunction){
        return validateSchema( taskUpdateSchema)(req, res, next);
    }

    static validateStarTask(req: Request, res: Response, next: NextFunction){
        return validateSchema(taskStarSchema)(req, res, next);
    }

    static validateComplte(req: Request, res: Response, next: NextFunction){
        return validateSchema(completTask)(req, res, next);
    }

}

export default ValidSchema;
