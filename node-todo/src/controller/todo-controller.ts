import { Request, Response } from 'express';
import data from '../data/data.json';


export const getTasks = (req: Request, res: Response): void => {
    new Promise((resolve, reject) => {

       resolve(data.todos);

    })
    .then(rows => {
        res.send(rows)
    })
    .catch((reason) => {
        res.send(reason)
    })
}

export const getOneTask = (req: Request, res: Response): void => {
    new Promise((resolve, rejects) => {
        const id = req.params.id;
        resolve(data.todos.find(todo => todo.id == id));
    }).then(todo => {
        if(!todo) res.send("Todo not exists");
        res.send(todo);
    }).catch(reason => {
        res.send(reason);
    })
}
