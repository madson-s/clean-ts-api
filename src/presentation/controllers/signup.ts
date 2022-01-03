import { MissingParamError } from '../erros/missing-param-error'
import { httpRequest, httpResponse } from '../protocols/http'
import { badRequest } from '../helpers/http-helper'

export class SignUpControlle {
  handle (httpRequest: httpRequest): httpResponse {
    if (!httpRequest.body.name) {
      return badRequest(new MissingParamError('name'))
    }
    if (!httpRequest.body.email) {
      return badRequest(new MissingParamError('email'))
    }
  }
}
