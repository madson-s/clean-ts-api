import { MissingParamError } from '../erros/missing-param-error'
import { httpRequest, httpResponse } from '../protocols/http'
import { badRequest } from '../helpers/http-helper'

export class SignUpControlle {
  handle (httpRequest: httpRequest): httpResponse {
    const requiredFields = ['name', 'email', 'password', 'passwordConfirmation']
    for (const field of requiredFields) {
      if (!httpRequest.body[field]) {
        return badRequest(new MissingParamError(field))
      }
    }
  }
}
