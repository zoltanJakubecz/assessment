import { Request, Response } from 'express';
import data from '../data/data.json';


export function getTasks(req: Request, res: Response) {
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
