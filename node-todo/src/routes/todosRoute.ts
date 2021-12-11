import * as core from 'express-serve-static-core';
import { getTasks } from '../controller/todo-controller';

export function routes(app: core.Express){
    app.get('/todos', getTasks);
}
