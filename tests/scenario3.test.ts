import request from 'supertest'
import { startServer } from '../src/server/startServer'

describe('scenario 1', () => {
  const app = startServer()
  it('Get all records with a GET api/users request (an empty array is expected)', async () => {
    const res = await request(app).get('/api/users')
    expect(res.status).toBe(200)
    expect(res.body).toEqual([])
  })
  let newUser1Id = ''
  let newUser2Id = ''
  it('A new object (Ben) is created by a POST api/users request (a response containing newly created record is expected)', async () => {
    let res = await request(app)
      .post('/api/users')
      .send({ 'username': 'John', 'age': 28, 'hobbies': ['running'] })
    expect(res.status).toBe(201)
    expect(res.body).toHaveProperty('username', 'John')
    expect(res.body).toHaveProperty('age', 28)
    expect(res.body).toHaveProperty('hobbies', ['running'])
    expect(res.body).toHaveProperty('id')
    newUser1Id = res.body.id
  })
  it('A new object (Bob) is created by a POST api/users request (a response containing newly created record is expected)', async () => {
    let res = await request(app)
      .post('/api/users')
      .send({ 'username': 'Bob', 'age': 24, 'hobbies': ['fishing', 'jumping'] })
    expect(res.status).toBe(201)
    expect(res.body).toHaveProperty('username', 'Bob')
    expect(res.body).toHaveProperty('age', 24)
    expect(res.body).toHaveProperty('hobbies', ['fishing', 'jumping'])
    expect(res.body).toHaveProperty('id')
    newUser2Id = res.body.id
  })
  it('With a GET api/user/{userId} request, we try to get the created record by its id (the created record is expected)', async () => {
    let res = await request(app)
      .get('/api/users/' + newUser1Id)
    expect(res.status).toBe(200)
    expect(res.body).toHaveProperty('username', 'John')
    expect(res.body).toHaveProperty('age', 28)
    expect(res.body).toHaveProperty('hobbies', ['running'])
    expect(res.body).toHaveProperty('id')
  })
  it('With a DELETE api/users/{userId} request, we delete the created object by id (confirmation of successful deletion is expected)', async () => {
    let res = await request(app)
      .delete('/api/users/' + newUser1Id)
    expect(res.status).toBe(204)
    expect(res.body).toEqual('')
  })
  it('Get all records with a GET api/users request (Bob is expected)', async () => {
    const res = await request(app).get('/api/users')
    expect(res.status).toBe(200)
    expect(res.body).toEqual([{ 'id': newUser2Id, 'username': 'Bob', 'age': 24, 'hobbies': ['fishing', 'jumping'] }])
  })
})
