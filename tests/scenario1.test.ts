import request from 'supertest'
import { startServer } from '../src/server/startServer'

describe('scenario 1', () => {
  const app = startServer()
  it('Get all records with a GET api/users request (an empty array is expected)', async () => {
    const res = await request(app).get('/api/users')
    expect(res.status).toBe(200)
    expect(res.body).toEqual([])
  })
  let newUserId = ''
  it('A new object is created by a POST api/users request (a response containing newly created record is expected)', async () => {
    let res = await request(app)
      .post('/api/users')
      .send({ 'username': 'Ben', 'age': 23, 'hobbies': ['skating'] })
    expect(res.status).toBe(200)
    expect(res.body).toHaveProperty('username', 'Ben')
    expect(res.body).toHaveProperty('age', 23)
    expect(res.body).toHaveProperty('hobbies', ['skating'])
    expect(res.body).toHaveProperty('id')
    newUserId = res.body.id
  })
  it('With a GET api/user/{userId} request, we try to get the created record by its id (the created record is expected)', async () => {
    let res = await request(app)
      .get('/api/users/' + newUserId)
    expect(res.status).toBe(200)
    expect(res.body).toHaveProperty('username', 'Ben')
    expect(res.body).toHaveProperty('age', 23)
    expect(res.body).toHaveProperty('hobbies', ['skating'])
    expect(res.body).toHaveProperty('id')
  })
  it('We try to update the created record with a PUT api/users/{userId} request (a response is expected containing an updated object with the same id)', async () => {
    let res = await request(app)
      .put('/api/users/' + newUserId)
      .send({ 'username': 'Bob', 'hobbies': ['jumping'] })
    expect(res.status).toBe(200)
    expect(res.body).toHaveProperty('username', 'Bob')
    expect(res.body).toHaveProperty('age', 23)
    expect(res.body).toHaveProperty('hobbies', ['jumping'])
    expect(res.body).toHaveProperty('id')
  })
  it('With a DELETE api/users/{userId} request, we delete the created object by id (confirmation of successful deletion is expected)', async () => {
    let res = await request(app)
      .delete('/api/users/' + newUserId)
    expect(res.status).toBe(204)
    expect(res.body).toEqual('')
  })
  it('With a GET api/users/{userId} request, we are trying to get a deleted object by id (expected answer is that there is no such object)', async () => {
    let res = await request(app)
      .get('/api/users/' + newUserId)
    expect(res.status).toBe(404)
    expect(res.body).toEqual('user does not exist')
  })
})
