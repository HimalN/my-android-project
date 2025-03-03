import { Prisma, PrismaClient } from '@prisma/client';
import Task from '../model/Task';

const prisma = new PrismaClient();


export async function addTask(t: Task){
    console.log("Adding Task...")
    try{
       const newTask  = await prisma.task.create({
            data:{
                id: t.id,
                task: t.task
            }
        })
        console.log('Task Added store:',newTask)
        console.log("Task Added successfully");
    }catch(err:any) {
        if (err instanceof Prisma.PrismaClientKnownRequestError) {
            if (err.code === 'P2002') {
                throw new Error('A task with this ID already exists.');
            }
        }
        throw err;
    }
}

export async function deleteTask(id:string) {
    try{
        await prisma.task.delete({
            where: {id: id}
        });
        console.log('Task deleted :',id);
    }catch(err){
        console.log("error deleting Task", err);
        if(err instanceof Prisma.PrismaClientKnownRequestError){
            if(err.code === 'P2025'){
                throw new Error("The task with this ID doesnt exists");
            }
        }
        throw err;
    }
}

export async function getAllTasks(){
    try{
        return await prisma.task.findMany();
    }catch(err){
        console.log("error getting Tasks from prisma data",err);
    }
}

export async function getTask(taskId: string){
    try{
        return await prisma.task.findUnique({
            where: {id: taskId}
        })
    }catch(err){
        console.log("error getting Task", err);
    }
}

export async function updateTask(taskId: string, t: Task){
    try{
        await prisma.task.update({
            where:{ id : taskId},
            data:{
                id: t.id,
                task: t.task
            }
        })
        console.log("Task updated successfully", taskId);
    }catch(err){
        console.log("error updating Task", err);
        if(err instanceof Prisma.PrismaClientKnownRequestError){
            if(err.code === 'P2025'){
                throw new Error("The task with this ID doesnt exists");
            }
        }
        throw err;
    }
}