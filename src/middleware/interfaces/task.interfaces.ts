export interface TaskCreationRequest {
    id: number;
    title: string;
    description: string;
    priority: string;
    dueDate: string;
    category: string;
    taskId: any;
    user: number;
}

export interface GetTaskRequest {
    userId: number;
    starred?: boolean;
}

export interface GetCompletedRequest {
    userId: number
}

export interface DeteteRequest {
    userId: number;
    taskId: number;
}
export interface TaskUpdateRequest {
    user: number;
    taskId: number;
    title: string;
    description: string;
    priority: string;
    dueDate: Date;
    category: string;
}


export interface TaskStarRequest {
    user: number;
    taskId: number;
    star: number;
}

export interface Complete {
    user: number,
    taskId: number
}