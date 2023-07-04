import dynamic from 'next/dynamic';
import { FieldError, UseFormRegisterReturn, UseFormSetValue, UseFormWatch } from 'react-hook-form';
import ReactMarkdown from 'react-markdown';
import { FormHelperText, InputLabel } from '@mui/material';
import 'react-markdown-editor-lite/lib/index.css';
import * as BlogApi from '@/http/api/blog';
import { StyledFormControl } from './styles';

const MdEditor = dynamic(() => import('react-markdown-editor-lite'), {
  ssr: false,
});

interface IProps {
  register: UseFormRegisterReturn;
  watch: UseFormWatch<any>;
  setValue: UseFormSetValue<any>;
  label?: string;
  validationError?: FieldError;
  editorHeight?: number;
}

function MarkdownEditor({
  register,
  watch,
  validationError,
  setValue,
  label,
  editorHeight = 500,
}: IProps) {
  const uploadInPostImage = async (image: File) => {
    try {
      const res = await BlogApi.uploadInPostImage(image);
      return res.imageUrl;
    } catch (error) {
      console.log(error);
      alert(error);
    }
  };

  return (
    <StyledFormControl>
      <InputLabel
        htmlFor={`${register.name}-input_md`}
        sx={{
          transform: 'none',
          position: 'inherit',
          mb: 1.5,
          color: 'inherit',
          ...(validationError && { color: 'error.main' }),
        }}>
        {label}
      </InputLabel>
      <MdEditor
        renderHTML={(text) => <ReactMarkdown>{text}</ReactMarkdown>}
        {...register}
        id={`${register.name}-input`}
        value={watch(register.name)}
        onChange={({ text }) =>
          setValue(register.name, text, {
            shouldValidate: true,
            shouldDirty: true,
          })
        }
        onImageUpload={uploadInPostImage}
        imageAccept=".jpg,.jpeg,.png"
        placeholder={'Write your post content here...'}
        style={{ height: editorHeight }}
        className={validationError ? 'is-invalid' : ''}
      />
      <FormHelperText sx={{ color: 'error.main' }}>{validationError?.message}</FormHelperText>
    </StyledFormControl>
  );
}

export default MarkdownEditor;
