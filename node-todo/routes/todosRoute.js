const express = require('express');
const service = require('../service/todoService');

const router = express.Router();
router.use(express.json());

router.get('/', (req, res) => {
    const todos = service.list();
    
    res.status(200).json({
        status: 'success',
        result: todos.length,
        data: {
            todos: todos
        }
    });
});

router.post('/',(req,res) => {
    const newTodo = service.add(req.body.text, req.body.priority);
    let statusCode = newTodo['message'] ? 203 : 201;

    res.status(statusCode).json({
        status: newTodo['status'],
        message: newTodo['message'],
        data: newTodo['todo']
    });
});

router.get('/:id', (req, res) => {
    const todo = service.getOne(req.params.id);
    let statusCode = todo ? 200 : 404;
    let status = todo ? 'success' : 'fail';
    let message = todo ? '' : 'Invalid ID';
    let data = todo || '';    

    res.status(statusCode).json({
        status: status,
        message: message,
        data: data
    });
});

router.put('/:id', (req, res) => {
    const todo = service.update(req.params.id, req.body);
    let statusCode = todo.message ? 404 : 201;
    let status = todo.message ? 'fail' : 'success'
    let data = todo.message || todo.todo;
    
    res.status(statusCode).json({
        status: status,
        data: data
    });
});

router.delete('/:id', (req, res) => {
    const response = service.deleteTodo(req.params.id);
    let statusCode = response.message ? 404 : 200;
    let status = response.message ? 'fail' : 'success'
    let data = response.message || '';

    res.status(statusCode).json({
        status: status,
        data: data
    });
});

module.exports = router;