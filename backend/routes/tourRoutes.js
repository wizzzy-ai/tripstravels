import express from 'express';
import {
  getAllTours,
  getSingleTour,
  createTour,
  updateTour,
  deleteTour,
  getTourBySearch,
  getFeaturedTour,
  getTourCount
} from '../controllers/tourController.js';
import { verifyAdmin, verifyToken} from '../middleware/authMiddleware.js';
import multer from 'multer';

// Configure multer for tour image uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'tour-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  },
  fileFilter: function (req, file, cb) {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!'), false);
    }
  }
});


const router = express.Router();

router.get('/', getAllTours);
router.get('/search', getTourBySearch);
router.get('/featured', getFeaturedTour);
router.get('/count', getTourCount);
router.get('/:id', getSingleTour);
router.post('/', verifyToken, upload.single('photo'), createTour);
router.put('/:id', verifyToken, verifyAdmin, updateTour);
router.delete('/:id', verifyToken, verifyAdmin, deleteTour);

export default router;
