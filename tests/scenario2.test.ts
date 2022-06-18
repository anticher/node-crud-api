import request from 'supertest'
import { startServer } from '../src/server/startServer'

describe('scenario 2', () => {
  const app = startServer()
  it('Try to use unexpected content-type (status code 500 and corresponding message is expected)', async () => {
    const res = await request(app)
      .post('/api/users')
      .set('Content-Type', 'application/x-www-form-urlencoded')
    expect(res.status).toBe(500)
    expect(res.body).toEqual('server error')
  })
  it('Try to use unexpected method (status code 501 and corresponding message is expected)', async () => {
    const res = await request(app).trace('/api/users/')
    expect(res.status).toBe(501)
    expect(res.body).toEqual('server does not support method TRACE')
  })
  it('Get all records with a GET /some-non/existing/resource request (an empty array is expected)', async () => {
    const res = await request(app).get('/some-non/existing/resource')
    expect(res.status).toBe(404)
    expect(res.body).toEqual('wrong path')
  })
  let invalidUserId = 'ca838d55-0994-43d1-b29c'
  let fakeUserId = 'ca838d55-0994-43d1-b29c-3a0d79f78e12'
  it('With a GET api/user/{userId} request, we try to get the record (status code 400 and corresponding message is expected)', async () => {
    let res = await request(app)
      .get('/api/users/' + invalidUserId)
    expect(res.status).toBe(400)
    expect(res.body).toEqual('userId is invalid')
  })
  it('With a GET api/user/{userId} request, we try to get the record (status code 404 and corresponding message is expected)', async () => {
    let res = await request(app)
      .get('/api/users/' + fakeUserId)
    expect(res.status).toBe(404)
    expect(res.body).toEqual('user does not exist')
  })
  it('A new object, that does not contain required fields is not created by a POST api/users request (status code 400 and corresponding message is expected)', async () => {
    let res = await request(app)
      .post('/api/users')
      .send({ 'username': 'Ben', 'age': 23 })
    expect(res.status).toBe(400)
    expect(res.body).toEqual('body does not contain required fields')
  })
  it('We try to update the created record with a PUT api/users/wrongId (status code 400 and corresponding message is expected)', async () => {
    let res = await request(app)
      .put('/api/users/' + invalidUserId)
      .send({ 'username': 'Bob', 'hobbies': ['jumping'] })
    expect(res.status).toBe(400)
    expect(res.body).toEqual('userId is invalid')
  })
  it('We try to update the created record with a PUT api/users/fakeId (status code 404 and corresponding message is expected)', async () => {
    let res = await request(app)
      .put('/api/users/' + fakeUserId)
      .send({ 'username': 'Bob', 'hobbies': ['jumping'] })
    expect(res.status).toBe(404)
    expect(res.body).toEqual('record with id === ' + fakeUserId + ' doesn not exist')
  })
  it('With a DELETE api/users/wrongId request, we delete the created object by id (status code 400 and corresponding message is expected)', async () => {
    let res = await request(app)
      .delete('/api/users/' + invalidUserId)
    expect(res.status).toBe(400)
    expect(res.body).toEqual('userId is invalid')
  })
  it('With a DELETE api/users/fakeId request, we delete the created object by id (status code 404 and corresponding message is expected)', async () => {
    let res = await request(app)
      .delete('/api/users/' + fakeUserId)
    expect(res.status).toBe(404)
    expect(res.body).toEqual('record with id === ' + fakeUserId + 'doesn not exist')
  })
})