import { Controller, HttpRequest } from '../../presentation/protocols'
import { Request, Response } from 'express'

export const adaptRoute = (controller: Controller) => {
  return async (req: Request, res: Response) => {
    const httpRequest: HttpRequest = { body: req.body }
    const httpResponse = await controller.handle(httpRequest)
    const responseBody = httpResponse.statusCode === 200 ? httpResponse.body : { error: httpResponse.body.message }
    res.status(httpResponse.statusCode).json(responseBody)
  }
}
