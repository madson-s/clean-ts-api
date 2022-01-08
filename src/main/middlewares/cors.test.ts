import request from 'supertest'
import app from '../config/app'

describe('CORS Middleware', () => {
  test('should enable CORS', async () => {
    app.post('/test_cors', (request, response) => {
      response.send()
    })
    await request(app).get('/test_body_passer').expect('access-control-allow-origin', '*').expect('access-control-allow-methods', '*').expect('access-control-allow-headers', '*')
  })
})
