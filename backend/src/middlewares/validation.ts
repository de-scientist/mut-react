import type { Request, Response, NextFunction } from 'express'
import type { ZodSchema } from 'zod'

/**
 * Middleware to validate request data using Zod schema
 */
const validate = (schema: ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      // Trim string values in body if they exist (before validation)
      if (req.body && typeof req.body === 'object') {
        Object.keys(req.body).forEach((key) => {
          if (typeof req.body[key] === 'string') {
            req.body[key] = req.body[key].trim()
          }
        })
      }

      // Validate the request
      schema.parse({
        body: req.body,
        query: req.query,
        params: req.params,
      })

      // Validation passed, continue to next middleware
      next()
    } catch (error: any) {
      // Extract the first validation error message
      const zodError = error.errors?.[0]
      const errorMessage = zodError?.message || 'Validation error'
      
      return res.status(400).json({
        success: false,
        message: errorMessage,
        error: 'Validation error',
        details: error.errors,
      })
    }
  }
}

export default validate


