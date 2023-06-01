import mongoose from 'mongoose';
import * as yup from 'yup';
import { validateBufferMIMEType } from 'validate-image-type';

export const imageFileSchema = yup
  .mixed<Express.Multer.File>()
  .test(
    'valid-image',
    'The uploaded file is not a valid image',
    async (file) => {
      // if we don`t receive image, the test is passed successfully
      if (!file) return true;

      const result = await validateBufferMIMEType(file?.buffer, {
        allowMimeTypes: ['image/jpeg', 'image/png'],
      });

      return result.ok;
    }
  );

export const mongooseObjectIdSchema = yup
  .string()
  .test(
    'is-object-id',
    '${path} is not a valid ObjectId',
    (value) => !value || mongoose.Types.ObjectId.isValid(value)
  );
