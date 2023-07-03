import multer from 'multer';

export const profileImageUpload = multer({
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
  fileFilter(req, file, callback) {
    if (file.mimetype === 'image/png' || file.mimetype === 'image/jpeg') {
      callback(null, true);
    } else {
      callback(new Error('Unaccepted file type'));
    }
  },
});

export const postCoverImageUpload = multer({
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
  fileFilter(req, file, callback) {
    if (file.mimetype === 'image/png' || file.mimetype === 'image/jpeg') {
      callback(null, true);
    } else {
      callback(new Error('Unaccepted file type'));
    }
  },
});

export const inPostImageUpload = multer({
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
  fileFilter(req, file, callback) {
    if (file.mimetype === 'image/png' || file.mimetype === 'image/jpeg') {
      callback(null, true);
    } else {
      callback(new Error('Unaccepted file type'));
    }
  },
});
