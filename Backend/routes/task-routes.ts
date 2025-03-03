import Task from "../model/Task";
import express from "express";
import {addTask, deleteTask, getAllTasks, getTask, updateTask} from "../database/task-data-store";
const router = express.Router();

router.post("/add", async(req, res) => {
    const task: Task = req.body;
    console.log("Received Data", task);
    try{
        const addedTask = await addTask(task);
        console.log(addedTask);
        res.send('Task Added')
    }catch(err: any){
        console.log("error adding task", err);
        if (err.message === 'A task with this ID already exists.') {
            res.status(400).send(err.message);
        } else {
            res.status(500).send("An error occurred while adding the task.");
        }
    }
})

router.delete("/delete/:taskId", async (req, res) => {

    console.log("Deleting task...");
    const id: string  = req.params.taskId;
    try{
        await deleteTask(id);
        console.log("Task with id " + id +" deleted");
        res.send('Task Deleted');
    }catch(err: any){
        console.log("error deleting task", err);
        if(err.message === 'The task with this ID doesnt exists'){
            res.status(404).send(err.message);
        } else {
            res.status(500).send("An error occurred while deleting the task.");
        }
    }
})


router.put("/update/:taskId", async (req, res) => {

    console.log("Updating task...")
    const id:string = req.params.taskId;
    const task : Task = req.body;
    console.log("Received Data", task);
    try{
        await updateTask(id, task);
        res.send('Task Updated');
    }catch(err: any){
        console.log("error updating task", err);
        if(err.message === 'The task with this ID doesnt exists'){
            res.status(404).send(err.message);
        } else {
            res.status(500).send("An error occurred while updating the task.");
        }
    }
})

router.get("/get/:taskId", async (req, res) => {

    console.log("Fetching task...");
    const id = req.params.taskId;
    try{
        const task = await getTask(id);
        if(task === null){
            res.status(400).send('The task with this ID doesnt exists');
        }
    }catch(err){
        console.log("error getting task", err);
    }
})

router.get("/get", async (req, res) => {
    console.log("Fetching all tasks");
    try{
       const tasks=  await getAllTasks();
       res.json(tasks);
    }catch(err){
        console.log("error getting tasks", err);
    }
})

router.get("/get", async (req, res) => {
    console.log("Fetching all task IDs");
    try{
       const tasks=  await getAllTasks();
       res.json(tasks);
    }catch(err){
        console.log("error getting tasks", err);
    }
})

export default router;