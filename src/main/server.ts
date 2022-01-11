import { MongoHelper } from '../infra/db/mongodb/account-repository/helper/mongo-helper'
import env from './config/env'

MongoHelper.connect(env.mongoUrl).then(async () => {
  const app = (await import('./config/app')).default
  app.listen(env.port, () => console.log('🔥 Server running at http://localhost:5050'))
}).catch(console.error)
