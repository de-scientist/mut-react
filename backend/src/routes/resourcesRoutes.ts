import express from 'express'
import {
  getResources,
  getAllResourcesAdmin,
  createResource,
  updateResource,
  toggleResource,
  deleteResource,
} from '../modules/resources/resourcesController.js'
import { authenticate, requireAdmin } from '../middlewares/auth.js'

const router = express.Router()

// Public
router.get('/', getResources)

// Admin
router.get('/admin', requireAdmin, getAllResourcesAdmin)
router.post('/admin', requireAdmin, createResource)
router.put('/admin/:id', requireAdmin, updateResource)
router.patch('/admin/:id/toggle', requireAdmin, toggleResource)
router.delete('/admin/:id', requireAdmin, deleteResource)

export default router
