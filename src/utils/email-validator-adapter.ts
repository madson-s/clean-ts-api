import { EmailValidator } from '../presentation/protocols'
import validator from 'validator'

export class EmailvalidatorAdapter implements EmailValidator {
  isValid (email: string): boolean {
    return validator.isEmail(email)
  }
}
