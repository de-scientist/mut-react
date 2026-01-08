import express from 'express'
import { createGalleryItem, getGallery, updateGalleryItem, getAllGalleryAdmin, deleteGalleryItem } from '../modules/media/mediaController.ts'


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
