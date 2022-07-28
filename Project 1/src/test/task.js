let chai= require("chai");
let chaiHttp = require("chai-http");
let server= require("../src/app");

chai.should();

chai.use(chaiHttp);


describe('Tasks API',()=>{

    // Test the POST route
    describe('/POST boards',()=>{
        it("It should POST a new task",(done)=>{
            const task={
                
                title:"create a new project",
                stage:1
            };
            chai.request(server)
                .post("/boards")
                .send(task)
                .end((err,response)=>{
                    response.should.have.status(201);
                    response.body.should.be.a('object');
                    response.body.should.have.property('id').eql(3);
                    response.body.should.have.property('title').eql("create a new project");
                    response.body.should.have.property('stage').eql(1);
                done();
                })
        
            })
            it("It should NOT POST a new task without the title property", (done) => {
                const task = {
                    stage:1
                };
                chai.request(server)                
                    .post("/boards")
                    .send(task)
                    .end((err, response) => {
                        response.should.have.status(400);
                        response.text.should.be.eq("The title Should be there");
                    done();
                    });
            
    
            })
    })

    describe("PUT /boards:id", () => {
        it("It should PUT an existing task", (done) => {
            const taskId = 1;
            const task = {
                stage:2
                
            };
            chai.request(server)                
                .put("/api/tasks" + taskId)
                .send(task)
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('object');
                    response.body.should.have.property('id').eq(1);
                    response.body.should.have.property('title').eq("create a new project");
                    response.body.should.have.property('stage').eq(2);
                done();
                });
        });

        it("stage is not more than 3", (done) => {
            const taskId = 1;
            const task = {
                stage:25
            };
            chai.request(server)                
                .put("/boards" + taskId)
                .send(task)
                .end((err, response) => {
                    response.should.have.status(400);
                    response.text.should.be.eq("The stage is not more than 3");
                done();
                });
        });        
    });
    

})
