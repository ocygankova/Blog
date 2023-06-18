import { FieldError, UseFormRegisterReturn, UseFormWatch } from 'react-hook-form';
import { Box, Button, Stack, TextFieldProps } from '@mui/material';
import { BlogPostInputField } from '@/components';

interface IProps {
  register: UseFormRegisterReturn;
  validationError?: FieldError;
  watch?: UseFormWatch<any>;
  label?: string;
  placeholder?: string;
  maxLength?: number;
  onGenerateSlugClick: () => void;
}

function BlogPostSlugInputField({
  register,
  validationError,
  watch,
  label,
  placeholder,
  maxLength,
  onGenerateSlugClick,
  ...props
}: IProps & TextFieldProps) {
  return (
    <Stack direction={{ xs: 'column', sm: 'row' }} alignItems={{ xs: 'stretch', sm: 'flex-start' }}>
      <Box flex={{ sm: 1 }}>
        <BlogPostInputField
          register={register}
          validationError={validationError}
          label={label || 'Post slug'}
          placeholder={placeholder || 'Provide your own or generate one'}
          watch={watch}
          maxLength={maxLength}
          {...props}
        />
      </Box>

      <Button
        variant="contained"
        onClick={onGenerateSlugClick}
        sx={{
          py: { xs: 'auto', sm: 1.6 },
          mt: { xs: 1, sm: 4 },
          ml: { xs: 0, sm: 1 },
          alignSelf: 'flex-start',
        }}>
        Generate slug
      </Button>
    </Stack>
  );
}

export default BlogPostSlugInputField;
