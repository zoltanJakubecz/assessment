import { Request, Response } from 'express';
import { v4 as uuid } from 'uuid';
import data from '../data/data.json';
import Todo from '../model/Todo';

let todos: Array<Todo> = data.todos;

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
    res.send(todos);
}
