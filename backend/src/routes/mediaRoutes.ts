import express from 'express'
import { createGalleryItem, getGallery, updateGalleryItem, getAllGalleryAdmin, deleteGalleryItem, toggleGalleryItem } from '../modules/media/mediaController.ts'
import { authenticate, requireAdmin } from '../middlewares/auth.js'

const router = express.Router()

router.get('/public', getGallery) // public gallery

// All routes protected for admin
router.use(authenticate)
router.use(requireAdmin)

// Admin
router.post('/admin', createGalleryItem)
router.put('/admin/:id', updateGalleryItem)
router.delete('/admin/:id', deleteGalleryItem)
router.get('/admin', getAllGalleryAdmin)


export default router
