const expect = require('chai').expect;
const assert =require('assert');
const sinon = require('sinon');
const fs = require('fs');
const service = require('../service/todoService');


describe('Todo service tests', () => {
   
    before(() => {
        this.readFileStub = sinon.stub(fs, 'readFileSync')
        this.readFileStub.returns(`{
            "todos": [
                {
                    "id": "e894f3ed-bb39-4f6b-ac72-34e18371eb9f",
                    "text": "Test todo 1",
                    "priority": 1,
                    "done": false
                },
                {
                    "id": "0c435e73-2adc-40d2-9c67-7fce56f9ae59",
                    "text": "Test todo 2",
                    "priority": 3,
                    "done": false
                },
                {
                    "id": "1bbaf213-adc9-4653-bc30-798b1f22caf9",
                    "text": "Test todo 3",
                    "priority": 2,
                    "done": false
                }
            ]
        }`);
        this.writeFileSync = sinon.stub(fs, 'writeFileSync');
        this.existsSyncStub = sinon.stub(fs, 'existsSync')
        this.existsSyncStub.returns(true)
    });

    after(() => {
        this.readFileStub.restore()
    });

    describe('List todos', () => {

        it('Should get all the todos', () => {
            const todos = service.list();
            expect(todos.length).to.equal(3);
        });
    });

    describe('Getting a todo by ID', ()=> {

        it('Should get one todo with its ID', () => {
            const todo = service.getOne('0c435e73-2adc-40d2-9c67-7fce56f9ae59');
            expect(todo.id).to.equal("0c435e73-2adc-40d2-9c67-7fce56f9ae59");
            expect(todo.text).to.equal("Test todo 2");
        });

        it('Should not get any todo', () => {
            const todo = service.getOne('321');
            expect(todo).to.be.undefined;
        });

    });

    describe('Add todo', () => {

        it('Should creat a new todo', () => {       
            const newTodo = {
                text: 'Test',
                priority: 2
            }
            const todo = service.add(newTodo.text, newTodo.priority);
            assert(todo.todo.id);
            expect(todo.todo.text).to.equal(newTodo.text);
            expect(todo.todo.priority).to.equal(newTodo.priority);
            expect(todo.todo.done).to.be.false;
        });

        it('Should create a new todo without given priority', () => {
            const newTodo = {
                text: 'Test 1'
            }
            const todo = service.add(newTodo.text);
            assert(todo.todo.id);
            expect(todo.todo.text).to.equal(newTodo.text);
            expect(todo.todo.priority).to.equal(3);
            expect(todo.todo.done).to.be.false;
        });
    });

    describe('Update todo', () => {

        it('Should update the todo given by ID', () => {
            const todoToUpdate = {
                id: '0c435e73-2adc-40d2-9c67-7fce56f9ae59',
                fields: {
                    text: 'Updated todo',
                    priority: 1,
                    done: false
                }
            }
            const updatedTodo = service.update(todoToUpdate.id, todoToUpdate.fields);
            expect(updatedTodo.todo.id).to.equal(todoToUpdate.id);
            expect(updatedTodo.todo.text).to.equal(todoToUpdate.fields.text);
            expect(updatedTodo.todo.priority).to.equal(todoToUpdate.fields.priority);
            expect(updatedTodo.todo.done).to.equal(todoToUpdate.fields.done);
        });

        it('Should return "Invali ID" if wrong ID', () => {
            const todoToUpdate = {
                id: '123',
                fields: {
                    text: 'Updated todo',
                    priority: 1,
                    done: false
                }
            }
            const updatedTodo = service.update(todoToUpdate.id, todoToUpdate.fields);
            expect(updatedTodo.message).to.equal('Invalid ID');
        });
    });

    describe('Delete todo',() => {
        it('Should return "success" when give ID is OK', () => {
            const todoToDelete = '0c435e73-2adc-40d2-9c67-7fce56f9ae59';
            const deleteStatus = service.deleteTodo(todoToDelete);
            expect(deleteStatus.status).to.equal('success'); 
        });
        
        it('Should return "Invalid ID" for wrong ID', () => {
            const todoToDelete = '123';
            const deleteStatus = service.deleteTodo(todoToDelete);
            expect(deleteStatus.message).to.equal('Invalid ID');
        });
    });
});