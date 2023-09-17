const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../index'); // Import Express app instance
const { sequelize } = require('../db'); // Import Sequelize instance

chai.use(chaiHttp);
const expect = chai.expect;

describe('User Authentication', () => {
  before(async () => {
    await sequelize.sync({ force: true }); 
  });
  it('should not register new user having invalid field', async () => {
    const res = await chai
      .request(app)
      .post('/api/register')
      .send({ name: 'testuser', email: 'test@example.com', password: 'testpassword' });

    expect(res).to.have.status(400);
    expect(res.body).to.be.an('object');
  });

  it('should register a new user', async () => {
    const res = await chai
      .request(app)
      .post('/api/register')
      .send({ fullName: 'testuser', email: 'test@example.com', password: 'testpassword' });

    expect(res).to.have.status(200);
    expect(res.body).to.be.an('object');
  });

  it('should not login with wrong credential', async () => {
    const res = await chai
      .request(app)
      .post('/api/login')
      .send({ email: 'test@example.com', password: 'testpassword1' });

    expect(res).to.have.status(400);
  });
  it('should login and get a JWT token', async () => {
    const res = await chai
      .request(app)
      .post('/api/login')
      .send({ email: 'test@example.com', password: 'testpassword' });

    expect(res).to.have.status(200);
    expect(res.body.data).to.have.property('token');
  });
});
