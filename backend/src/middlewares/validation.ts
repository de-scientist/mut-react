import type { Request, Response, NextFunction } from 'express'
import type { ZodSchema } from 'zod'

/**
 * Middleware to validate request data using Zod schema
 */
const validate = (schema: ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse({
        body: req.body,
        query: req.query,
        params: req.params,
      })
      next()
    } catch (error) {
      return res.status(400).json({
        error: 'Validation error',
        details: (error as any).errors,
      })
    }
  }
}

export default validate


