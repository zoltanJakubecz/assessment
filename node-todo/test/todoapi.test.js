const chai = require('chai');
const chaiHttp = require('chai-http');
// const { fakeServer } = require('sinon');
const server = require('../app');
const should = chai.should();
const fs = require('fs');
// const { totalmem } = require('os');

chai.use(chaiHttp);

const jsonFile = process.env.JSON_FILE;


describe('API tests', () => {
    
    before(async () => {
        await fs.writeFile(jsonFile, 
            JSON.stringify({"todos" : []},null,2),
            (err) => {
                if(err)
                console.log(err);
            });
    });

    afterEach(() => {
        fs.unlink(jsonFile, (err) => {
            if (err) {
              console.error(err);
              return;
            }
        });   
    });

 /*
  * Test the /GET route
  */

  describe('/GET todos', () => {
    
      it('Should GET all the todos', (done) => {
        chai.request(server)
            .get('/todos')
            .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('object');
                  res.body.data.todos.length.should.be.eql(0);
              done();
            });
      });
  });

 /*
  * Test the /GET/:id route
  */
 
 describe('/GET/:id todo', () => {
    beforeEach(async () => {
        await fs.writeFile(jsonFile, 
            JSON.stringify({"todos" : [{
                "id": "ca7d666a-f4fe-4e37-a494-bb6b308a9c97",
                "text": "Todo 2112",
                "priority": 2,
                "done": false
              },
              {
                "id": "b546b04d-1e56-4b91-989c-a4abb4999420",
                "text": "todo 5150",
                "priority": 3,
                "done": false
              },
              {
                "id": "b2bb4a40-8b85-491b-b968-68296c43b48d",
                "text": "todo 5150",
                "priority": 3,
                "done": false
              }]},null,2),
            (err) => {
                if(err)
                console.log(err);
            }
        )
    })

    it('it should GET a todo by the given id', (done) => {
        let todoId = "b546b04d-1e56-4b91-989c-a4abb4999420";
        chai.request(server)
          .get('/todos/' + todoId)
          .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('status');
                res.body.should.have.property('data');
                res.body.data.should.have.property('id').eql(todoId);
            done();
          });

    });


    it('Should get message "Invalid ID"', (done) => {
      let todoId = "123";
      chai.request(server)
        .get('/todos/' + todoId)
        .end((err, res) => {
              res.should.have.status(404);
              res.body.should.be.a('object');
              res.body.should.have.property('status').eql('fail');
              res.body.should.have.property('message').eql('Invalid ID');
          done();
        });

    });
  });

 /*
  * Test the /POST route
  */

  describe('/POST todo', () => {
    beforeEach(async () => {
        await fs.writeFile(jsonFile, 
            JSON.stringify({"todos" : []},null,2),
            (err) => {
                if(err)
                console.log(err);
            }
        );
    });

    it('Should POST a todo get back with id', (done) => {
      let todo = {
        text: "New todo"
      }
      chai.request(server)
        .post('/todos')
        .send(todo)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.data.should.have.property('id');
          res.body.data.should.have.property('priority').eql(3);
          done();
        });
    });
  });

 /*
  * Test the /PUT route
  */

  describe('/PUT todo', () => {
    beforeEach(async () => {
      await fs.writeFile(jsonFile, 
          JSON.stringify({"todos" : [{
            "id": "b546b04d-1e56-4b91-989c-a4abb4999420",
            "text": "todo 5150",
            "priority": 3,
            "done": false
          }]},null,2),
          (err) => {
              if(err)
              console.log(err);
          }
      );
    });

    it('Should UPDATE a todo', (done) => {
      const todo = {
          "id": "b546b04d-1e56-4b91-989c-a4abb4999420",
          "text": "Updated",
          "priority": 2,
          "done": false
      }
      chai.request(server)
        .put('/todos/' + todo.id)
        .send(todo)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.data.should.have.property('text').eql(todo.text);
          res.body.data.should.have.property('priority').eql(todo.priority);
          res.body.data.should.have.property('done').eql(todo.done);
        done();
        });
    });
  });

 /*
  * Test the /DELETE route
  */

  describe('DELETE /todos/:id', () => {

    beforeEach(async () => {
      await fs.writeFile(jsonFile, 
          JSON.stringify({"todos" : [{
            "id": "b546b04d-1e56-4b91-989c-a4abb4999420",
            "text": "todo 5150",
            "priority": 3,
            "done": false
          }]},null,2),
          (err) => {
              if(err)
              console.log(err);
          }
      );
    });

    it('It should delete an existing todo', (done) => {
        const todoId = 'b546b04d-1e56-4b91-989c-a4abb4999420';
        chai.request(server)
            .delete('/todos/' + todoId)
            .end((err, res) => {
                res.should.have.status(200);
            done();
            });
    });

    it('It should not delete any todo', (done) => {
        const todoId = '123';
        chai.request(server)
            .delete('/todos/' + todoId)
            .end((err, resp) => {
                chai.expect(resp.status).to.equal(404);
            done();
            });
    });
    
  });
});
