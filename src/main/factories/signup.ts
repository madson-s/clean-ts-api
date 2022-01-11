import { DbAddAccount } from '../../data/usecases/add-account/db-add-account'
import { BcryptAdapter } from '../../infra/criptography/bcrypt-adapter'
import { AccountMongoRepository } from '../../infra/db/mongodb/account-repository/account'
import { SignUpController } from '../../presentation/controllers/signup/signup'
import { EmailvalidatorAdapter } from '../../utils/email-validator-adapter'

export const makeSignupController = (): SignUpController => {
  const salt = 12
  const emailValidatorAdapter = new EmailvalidatorAdapter()
  const encrypter = new BcryptAdapter(salt)
  const addAccountRepository = new AccountMongoRepository()
  const dbAddAccount = new DbAddAccount(encrypter, addAccountRepository)
  return new SignUpController(emailValidatorAdapter, dbAddAccount)
}
