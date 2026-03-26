import Task from "../../models/Task.js";
import mongoose from "mongoose";


const createTask = async(userId, body) => {
    const task = await Task.create({userId, ...body});
    return task
};


const getTasks = async (userId, query) => {

    const{
        status,
        priority,
        search,
        page = 1,
        limit = 10,
        sortBy = "createdAt",
        sortOrder = "desc",
    } = query;

    const filter = { userId };

    if(status) filter.status = status;
    if(priority) filter.priority = priority;
    if(search) filter.title = { $regex: search, $options:"i"};

    const skip = (Number(page) - 1) * Number(limit);
    const sort = {[sortBy]: sortOrder === "asc" ? 1 : -1};

    const [tasks, total] = await Promise.all([
        Task.find(filter).sort(sort).skip(skip).limit(Number(limit)),
        Task.countDocuments(filter),
    ]);

    return{
        tasks,
        pagination:{
            total,
            page: Number(page),
            limit: Number(limit),
            totalPages: Math.ceil(total/Number(limit)),
        },
    };
};

const getTaskById = async(taskId, userId) => {

    const task = await Task.findOne({_id : taskId,userId});
    if(!task){
        const error = new Error("Task not found");
        error.statusCode = 404;
        throw error;
    }
    return task;
};


const updateTask = async(taskId, userId) => {

    const task = await Task.findOneAndUpdate(
        {_id: taskId, userId},
        body,
        {new: true, runValidators: true}
    );

    if(!task){
        const error = new Error("Task not found");
        error.statusCode = 404;
        throw error;
    }
    return task;
};


const deleteTask = async(taskId, userId) => {

    const task = await Task.findOneAndDelete({_id: taskId, userId});
    if(!task){
        const error = new Error("Task not found");
        error.statusCode = 404;
        throw error;
    }
    return task;
};


const markCompleted = async(taskId, userId) => {
    const task = await Task.findOneAndUpdate(
        {_id: taskId, userId},
        { isCompleted:true, status:"Done"},
        { new : true}
    );

    if(!task){
        const error = new Error("Task not found");
        error.statusCode=404;
        throw error;
    }
    return task;
};


export { createTask, getTasks, updateTask , deleteTask, markCompleted  };
