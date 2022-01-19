import { Controller, httpRequest, httpResponse } from '../../presentation/protocols'
import { LogControllerDecorator } from './log'
import { ok, serverError } from '../../presentation/helpers/http-helper'
import { LogErrorRepository } from '../../data/protocols/log-error-repository'
import { AccountModel } from '../../domain/models/account'

const makeFakeAccount = (): AccountModel => ({
  id: 'valid_id',
  name: 'valid_name',
  email: 'valid_email@mail.com',
  password: 'valid_password'
})

const makeController = (): Controller => {
  class ControllerStub implements Controller {
    async handle (httpRequest: httpRequest): Promise<httpResponse> {
      return new Promise(resolve => resolve(ok(makeFakeAccount())))
    }
  }
  return new ControllerStub()
}

const makeErrorRepository = (): LogErrorRepository => {
  class LogErrorRespositoryStub implements LogErrorRepository {
    async log (stack: string): Promise<void> {
      return new Promise(resolve => resolve())
    }
  }
  return new LogErrorRespositoryStub()
}

interface sutTypes {
  sut: LogControllerDecorator
  controllerStub: Controller
  logErrorRespositoryStub: LogErrorRepository
}

const makeSut = (): sutTypes => {
  const controllerStub = makeController()
  const logErrorRespositoryStub = makeErrorRepository()
  const sut = new LogControllerDecorator(controllerStub, logErrorRespositoryStub)
  return {
    sut,
    controllerStub,
    logErrorRespositoryStub
  }
}

const makeFakeRequest = (): httpRequest => ({
  body: {
    email: 'any_email@mail.com',
    name: 'any_name',
    password: 'any_password',
    passwordConfirmation: 'any_password'
  }
})

const makeFakeServerError = (): httpResponse => {
  const fakeError = new Error()
  fakeError.stack = 'any_stack'
  return serverError(fakeError)
}

describe('Log Controller Decorator', () => {
  test('should call controller handle', async () => {
    const { sut , controllerStub } = makeSut()
    const hanldeSpy = jest.spyOn(controllerStub, 'handle')
    await sut.handle(makeFakeRequest())
    expect(hanldeSpy).toHaveBeenCalledWith(makeFakeRequest())
  })

  test('should return the same result of the controller', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(ok(makeFakeAccount()))
  })

  test('should call LogErrorRespository with correct error if controller returns a server error', async () => {
    const { sut, controllerStub, logErrorRespositoryStub } = makeSut()
    const logSpy = jest.spyOn(logErrorRespositoryStub, 'log')
    jest.spyOn(controllerStub, 'handle').mockReturnValueOnce(new Promise((resolve) => resolve(makeFakeServerError())))
    await sut.handle(makeFakeRequest())
    expect(logSpy).toHaveBeenLastCalledWith('any_stack')
  })
})
