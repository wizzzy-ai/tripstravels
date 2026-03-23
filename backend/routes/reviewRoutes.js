import express from 'express';
import { createReview, deleteReview } from '../controllers/reviewController.js';
import { verifyUser, verifyToken } from '../middleware/authMiddleware.js';
const router = express.Router();


// Create a new review
router.post('/:tourId', verifyToken, createReview);

// Delete a review by ID
router.delete('/:id', verifyUser, deleteReview);

export default router;
