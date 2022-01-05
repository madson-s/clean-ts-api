import { EmailvalidatorAdapter } from './email-validator-adapter'

describe('EmailValidator Adapter', () => {
  test('should return false if validator returns false ', () => {
    const sut = new EmailvalidatorAdapter()
    jest.spyOn(sut, 'isValid').mockReturnValueOnce(false)
    const isValid = sut.isValid('invalid_email@mail.com')
    expect(isValid).toBe(false)
  })
})
