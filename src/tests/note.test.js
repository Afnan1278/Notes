const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../index'); // Import Express app instance
const { sequelize } = require('../db'); // Import Sequelize instance

chai.use(chaiHttp);
const expect = chai.expect;

describe('Create Note with JWT Token', () => {
    let token; // Store the JWT token for use in the next test
  
    before(async () => {
      const loginRes = await chai
        .request(app)
        .post('/api/login')
        .send({ email: 'test@example.com', password: 'testpassword' });
  
      token = loginRes.body.data.token; // Get the JWT token from the login response
    });
  
    it('should create a note with a valid JWT token', async () => {
      const res = await chai
        .request(app)
        .post('/api/note/create')
        .set('Authorization', `Bearer ${token}`)
        .send({ title: 'Test Note', content: 'This is a test note.',type:"Work" });
  
      expect(res).to.have.status(200);
      expect(res.body).to.be.an('object');
    });
    it('should not create a note with a invalid note type', async () => {
        const res = await chai
          .request(app)
          .post('/api/note/create')
          .set('Authorization', `Bearer ${token}`)
          .send({ title: 'Test Note', content: 'This is a test note.',type:"" });
    
        expect(res).to.have.status(400);
        expect(res.body).to.be.an('object');
      });
      it('should not create a note with a invalid JWT token', async () => {
        const res = await chai
          .request(app)
          .post('/api/note/create')
          .set('Authorization', `Bearer ${token}1`)
          .send({ title: 'Test Note', content: 'This is a test note.',type:"Work" });
    
        expect(res).to.have.status(403);
        expect(res.body).to.be.an('object');
      });
  });
describe('Get All Notes with a valid JWT token', () => {
    let nodeId; // Store the ID of the created noteID for use in this test
    let token;
    before(async () => {
        const loginRes = await chai
        .request(app)
        .post('/api/login')
        .send({ email: 'test@example.com', password: 'testpassword' });

        token = loginRes.body.data.token;
    });

    it('should get all notes', async () => {
        const res = await chai
        .request(app)
        .get('/api/note/list?page=1')
        .set('Authorization', `Bearer ${token}`);

        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
    });
    it('should not get notes with invalid JWT', async () => {
        const res = await chai
        .request(app)
        .get('/api/note/list?page=1')
        .set('Authorization', `Bearer ${token}1`);

        expect(res).to.have.status(403);
        expect(res.body).to.be.an('object');
    });
    it('should not get notes without page given', async () => {
        const res = await chai
        .request(app)
        .get('/api/note/list')
        .set('Authorization', `Bearer ${token}`);

        expect(res).to.have.status(400);
        expect(res.body).to.be.an('object');
    });

    });
    

describe('Get Note by ID with a valid JWT token', () => {
    let nodeId; // Store the ID of the created noteID for use in this test
    let token;
    before(async () => {
        const loginRes = await chai
        .request(app)
        .post('/api/login')
        .send({ email: 'test@example.com', password: 'testpassword' });

        token = loginRes.body.data.token;

        const noteRes = await chai
        .request(app)
        .get('/api/note/list?page=1')
        .set('Authorization', `Bearer ${token}`);

        nodeId = noteRes.body.data.rows[0]["NoteID"]; // Get the ID of the first note
    });

    it('should get a note by ID', async () => {
        const res = await chai
        .request(app)
        .get(`/api/note/getNote?id=${nodeId}`)
        .set('Authorization', `Bearer ${token}`);

        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
    });
    it('should not get a note by ID with invalid token', async () => {
        const res = await chai
        .request(app)
        .get(`/api/note/getNote?id=${nodeId}`)
        .set('Authorization', `Bearer ${token}1`);

        expect(res).to.have.status(403);
        expect(res.body).to.be.an('object');
    });
    it('should not get a note by ID with invalid ID', async () => {
        const res = await chai
        .request(app)
        .get(`/api/note/getNote?id=i${nodeId}`)
        .set('Authorization', `Bearer ${token}`);

        expect(res).to.have.status(400);
        expect(res.body).to.be.an('object');
    });
    });
describe('Detelte Note', () => {
    let nodeId; // Store the ID of the created noteID for use in this test
    let token;
    before(async () => {
        const loginRes = await chai
        .request(app)
        .post('/api/login')
        .send({ email: 'test@example.com', password: 'testpassword' });

        token = loginRes.body.data.token;

        const noteRes = await chai
        .request(app)
        .get('/api/note/list?page=1')
        .set('Authorization', `Bearer ${token}`);

        nodeId = noteRes.body.data.rows[0]["NoteID"]; // Get the ID of the first note
    });

    it('should delete a note by ID', async () => {
        const res = await chai
        .request(app)
        .delete(`/api/note/remove`)
        .set('Authorization', `Bearer ${token}`)
        .send({ id: `${nodeId}` });

        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
    });
    it('should not delete a note with invalid token', async () => {
        const res = await chai
        .request(app)
        .delete(`/api/note/remove`)
        .set('Authorization', `Bearer ${token}1`)
        .send({ id: `${nodeId}` });

        expect(res).to.have.status(403);
        expect(res.body).to.be.an('object');
    });
    it('should delete a note with invalid ID', async () => {
        const res = await chai
        .request(app)
        .delete(`/api/note/remove`)
        .set('Authorization', `Bearer ${token}`)
        .send({ id: `${nodeId}i` });

        expect(res).to.have.status(400);
        expect(res.body).to.be.an('object');
    });
    });