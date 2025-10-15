const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const { cloudinary } = require('../utils/cloudinary');

const storage = new CloudinaryStorage({
  cloudinary,
  params: (req, file) => {
    const isCover = file.fieldname === 'coverImage';

    // Extract original extension
    const originalName = file.originalname;
    const ext = originalName.split('.').pop(); // pdf or epub

    // Generate filename without spaces
    const filename = originalName.replace(/\.[^/.]+$/, '').replace(/\s+/g, '_');

    return {
      folder: isCover ? 'books/covers' : 'books',
      allowed_formats: isCover 
        ? ['jpg', 'jpeg', 'png', 'webp'] 
        : ['pdf', 'epub'],
      resource_type: isCover ? 'image' : 'raw',
      public_id: isCover 
        ? filename 
        : `${filename}.${ext}`,
      transformation: isCover 
        ? [{ width: 600, height: 800, crop: 'limit' }]
        : undefined
    };
  },
});

const uploadBook = multer({ storage });
module.exports = uploadBook;
