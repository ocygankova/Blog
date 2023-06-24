import * as yup from 'yup';
import { maxLengths } from '@/utils/consts';

export const requiredStringSchema = yup.string().trim().required('Please fill out this field.');

export const usernameSchema = yup
  .string()
  .trim()
  .max(maxLengths.userName, `Must be ${maxLengths.userName} characters or less.`)
  .matches(/^[a-zA-Z0-9_]*$/, 'Only letters, numbers and underscores are allowed.');

export const emailSchema = yup
  .string()
  .trim()
  .matches(/^[\w\.-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/, 'Please provide a valid email address.');

export const passwordSchema = yup
  .string()
  .matches(/^(?!.* )/, 'Must not contain any whitespaces')
  .min(6, 'Must be at least 6 characters long.');

export const slugSchema = yup
  .string()
  .trim()
  .matches(/^[a-zA-Z0-9_-]*$/, 'No special characters or spaces allowed.');

export const requiredFileSchema = yup
  .mixed<FileList>()
  .test(
    'not-empty-file-list',
    'Please add an image for your post.',
    (value) => value instanceof FileList && value.length > 0
  )
  .required();
