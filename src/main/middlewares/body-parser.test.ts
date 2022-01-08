import request from 'supertest'
import app from '../config/app'

describe('BodyPasser Middleware', () => {
  test('should parse body as json ', async () => {
    app.post('/test_body_passer', (request, response) => {
      response.send(request.body)
    })
    await request(app).post('/test_body_passer').send({ name: 'Rodrigo' }).expect({ name: 'Rodrigo' })
  })
})
