import express from 'express'
import { getResources } from '../modules/resources/resourcesController.js'

const router = express.Router()

// Public route
router.get('/', getResources)

export default router

