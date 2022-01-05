import { EmailValidator } from '../presentation/protocols'

export class EmailvalidatorAdapter implements EmailValidator {
  isValid (email: string): boolean {
    return true
  }
}
