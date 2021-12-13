import { Request, Response } from 'express';
import fs from 'fs';
import { v4 as uuid } from 'uuid';
import data from '../data/data.json';
import Todo from '../model/Todo';

let todos: Array<Todo> = data.todos;
let timers: any = {};

const jsonFile = process.env.JSON_FILE || `${__dirname}/../data/data-dev.json`;

export const getTasks = (req: Request, res: Response): void => {
    new Promise((resolve, reject) => {

       resolve(data.todos);

    })
    .then(rows => {
        res.send(rows)
    })
    .catch((reason) => {
        res.send(reason)
    });
}

export const getOneTask = (req: Request, res: Response): void => {
    new Promise((resolve, reject) => {
        const id = req.params.id;
        resolve(todos.find(todo => todo.id == id));
    }).then(todo => {
        todo ? res.send(todo) : res.status(204).send();
    }).catch(reason => {
        res.send(reason);
    });
}


export const addTodo = (req: Request, res: Response): void => {
    const text: string = req.body.text;
    const priority: number = req.body.priority || 3;
    let todo: Todo = {
        id: uuid(),
        text: text,
        priority: priority,
        done: false
    };
    todos.push(todo);
    saveTodos(todos);
    res.send(todo);
}


export const updateTodo = (req: Request, res: Response): void => {
    let {text, priority, done} = req.body;
    const id: string = req.params.id;
    const index: number = todos.findIndex(todo => todo.id == id);
    todos.splice(index, 1, {id, text, priority, done});
    res.send(todos);
}


export const deleteTodo = (req: Request, res: Response): void => {
    removeTodo(req.params.id);

}

const removeTodo = (id: string): void => {
    const index: number = todos.findIndex(todo => todo.id == id);
}


const saveTodos = (newTodos: Todo[]) => {
    fs.writeFileSync(jsonFile, JSON.stringify({"todos" : newTodos},null,2));
}


const setTimerToDeleteDoneTodo = (id: string) => {
    timers[id] = setTimeout(() => {removeTodo(id);}, 300000);
}


const clearTimerForTodo = (id: string) => {
    clearTimeout(timers[id]);
}
