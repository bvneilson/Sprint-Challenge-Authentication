const request = require('supertest');
const server = require('../api/server.js');

describe('server.js', () => {
  describe('POST /register', () => {
    it('should return 201', async () => {
      const res = await request(server).post('/api/auth/register').send({username: 'new3', password: '123test'});
      expect(res.status).toBe(201);
    })

    it('message should be - "User successfully created"', async () => {
      const res = await request(server).post('/api/auth/register').send({username: 'new4', password: '123test'});
      let response = JSON.parse(res.text)
      expect(response.message).toBe("User successfully created");
    })
  })

  describe('POST /login', () => {
    it('should return 200', async () => {
      const res = await request(server).post('/api/auth/login').send({username: 'brennan', password: '123test'});
      expect(res.status).toBe(200);
    })

    it('message should be - "Welcome, brennan!"', async () => {
      const res = await request(server).post('/api/auth/login').send({username: 'brennan', password: '123test'});
      let response = JSON.parse(res.text)
      expect(response.message).toBe("Welcome, brennan!");
    })
  })
})
