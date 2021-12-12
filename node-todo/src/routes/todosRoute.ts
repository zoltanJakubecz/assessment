import * as core from 'express-serve-static-core';
import { addTodo, getOneTask, getTasks, updateTodo } from '../controller/todo-controller';

export function routes(app: core.Express){
    app.get('/todos', getTasks);
    app.get('/todos/:id', getOneTask);
    app.post('/todos', addTodo);
    app.put('/todos/:id', updateTodo);
}
