import multer from 'multer';
import path from 'path';

const siteStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/temp');
  },
  filename: function (req, file, cb) {
    cb(null, 'site-' + Date.now() + path.extname(file.originalname));
  }
});

const siteFileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed!'), false);
  }
};

export const siteUpload = multer({
  storage: siteStorage,
  fileFilter: siteFileFilter,
  // limits: { fileSize: 2 * 1024 * 1024 } // 2MB limit
});
