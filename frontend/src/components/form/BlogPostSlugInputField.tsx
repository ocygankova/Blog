import { FieldError, UseFormRegisterReturn } from 'react-hook-form';
import { Box, Button, Stack, TextFieldProps } from '@mui/material';
import { BlogPostInputField } from '@/components';

interface IProps {
  register: UseFormRegisterReturn;
  validationError?: FieldError;
  label?: string;
  placeholder?: string;
  onGenerateSlugClick: () => void;
}

function BlogPostSlugInputField({
  register,
  validationError,
  label,
  placeholder,
  onGenerateSlugClick,
  ...props
}: IProps & TextFieldProps) {
  return (
    <Stack direction="row" alignItems="flex-start">
      <Box flex={1}>
        <BlogPostInputField
          register={register}
          validationError={validationError}
          label={label || 'Post slug'}
          placeholder={placeholder || 'Provide your own or generate one'}
          {...props}
        />
      </Box>

      <Button variant="contained" onClick={onGenerateSlugClick} sx={{ py: 1.6, mt: 4.5, ml: 1 }}>
        Generate slug
      </Button>
    </Stack>
  );
}

export default BlogPostSlugInputField;
