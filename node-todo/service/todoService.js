const fs = require('fs');
const uuid = require('uuid');

const jsonFile = process.env.JSON_FILE || `${__dirname}/../data/data.json`;

let timers = {};


const getData = () =>{
    return fs.existsSync(jsonFile) ? 
                fs.readFileSync(jsonFile) : 
                [];
}


const list = () => {
    return JSON.parse(getData()).todos;
}


const add = (text, priority = 3) => {
    if(!text) return {status: "fail", message: "Text required"};
    if(!Number.isInteger(priority) || priority < 1 || priority > 5) return {status: "fail", message: "Priority out of range"}; 
    let todos = JSON.parse(getData()).todos;
    let newTodo = {
        status: "success",
        todo:{
            id: uuid.v4(),
            text: text,
            priority: priority,
            done: false
        }
    }
    todos.push(newTodo['todo']);
    saveTodos(todos);
    return newTodo;
}


const getOne = (id) => {
    let todos = JSON.parse(getData()).todos;
    return todos.find(todo => todo.id == id);
}


const update = (id, {text, priority, done}) => {
    let todos = JSON.parse(getData()).todos;

    const index = todos.findIndex(todo => todo.id == id);
    if(index < 0) return {message: 'Invalid ID'};

    if(!text) return {status: "fail", message: "Text required"};
    if(!Number.isInteger(priority) || priority < 1 || priority > 5) return {status: "fail", message: "Priority out of range"} ;

    
    if(done  && !todos[index].done){
         setTimerToDeleteDoneTodo(id);
    }
    if(!done  && todos[index].done){
        clearTimerForTodo(id);
       }
    todos.splice(index, 1, {id, text, priority, done});
    saveTodos(todos);
    return {todo: todos[index]};
}


const deleteTodo = (id) => {
    let todos = JSON.parse(getData()).todos;
    const index = todos.findIndex(item => item.id == id);
    if(index < 0) return {message: 'Invalid ID'};
    todos.splice(index, 1);
    saveTodos(todos);
    return {status: 'success'};
}


const saveTodos = newTodos => {
    fs.writeFileSync(jsonFile, JSON.stringify({"todos" : newTodos},null,2));
}


const setTimerToDeleteDoneTodo = (id) => {    
    timers[id] = setTimeout(() => {deleteTodo(id);}, 300000);
}


const clearTimerForTodo = (id) => {
    clearTimeout(timers[id]);
}


module.exports = {
    list,
    getOne,
    add,
    update,
    deleteTodo
}