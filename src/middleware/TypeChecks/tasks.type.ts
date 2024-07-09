import Joi from 'joi';
import { Complete, DeteteRequest, GetCompletedRequest, GetTaskRequest, TaskCreationRequest, TaskStarRequest, TaskUpdateRequest } from '../interfaces/task.interfaces';

 export const taskCreationSchema = Joi.object<TaskCreationRequest>({
    id: Joi.number().required(),
    title: Joi.string().required(),
    description: Joi.string().required(),
    priority: Joi.string().required(),
    dueDate: Joi.string().required(),
    category: Joi.string().required(),
    user: Joi.number().required(), // Include the 'user' field in the schema
    taskId: Joi.any() // If taskId is optional, you can include it as well
});

export const getTaskSchema = Joi.object<GetTaskRequest>({
    userId: Joi.number().required(),
    starred: Joi.boolean().optional() 
});

export const getCompletedTaskSchema= Joi.object<GetCompletedRequest>({
    userId:Joi.number().required()
})

export const deleteTask = Joi.object< DeteteRequest>({
    userId:Joi.number().required(),
    taskId:Joi.number().required()
})

export const taskUpdateSchema = Joi.object<TaskUpdateRequest>({
    user: Joi.number().required(),
    taskId: Joi.number().required(),
    title: Joi.string().required(),
    description: Joi.string().required(),
    priority: Joi.string().required(),
    dueDate: Joi.date().required(),
    category: Joi.string().required()
});

export const  taskStarSchema = Joi.object< TaskStarRequest>({
    user: Joi.number().required(),
    taskId: Joi.number().required(),
    star:Joi.number().required()
})

export const completTask = Joi.object<Complete>({
    user: Joi.number().required(),
    taskId: Joi.number().required()
})