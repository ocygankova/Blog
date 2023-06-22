import { SyntheticEvent, useState } from 'react';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { Alert, Box, Slide, Snackbar, Stack, Typography } from '@mui/material';
import { IUser } from '@/models/user';
import * as UsersApi from '@/http/api/users';
import { BlogPostInputField, LoadingButton } from '@/components';
import { maxLengths } from '@/utils';

interface IProps {
  onUserUpdated: (updatedUser: IUser) => void;
}

const validationSchema = yup.object({
  displayName: yup.string(),
  about: yup.string(),
  profileImage: yup.mixed<FileList>(),
});

type IUpdateProfileFormData = yup.InferType<typeof validationSchema>;

function UpdateProfile({ onUserUpdated }: IProps) {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { isSubmitting, isDirty },
  } = useForm<IUpdateProfileFormData>();

  const onSubmit = async ({ displayName, about, profileImage }: IUpdateProfileFormData) => {
    if (!displayName && !about && (!profileImage || profileImage.length === 0)) return;

    try {
      const updatedUser = await UsersApi.updateUser({
        displayName,
        about,
        profileImage: profileImage?.item(0) || undefined,
      });
      onUserUpdated(updatedUser);
      reset();
      setSnackbarOpen(true);
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    } catch (err) {
      console.log(err);
      alert(err);
    }
  };

  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleSnackbarClose = (event?: SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  return (
    <>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        TransitionComponent={Slide}>
        <Alert
          onClose={handleSnackbarClose}
          severity="success"
          variant="filled"
          sx={{ width: '100%' }}>
          Profile updated!
        </Alert>
      </Snackbar>

      <Box component="section" py={4}>
        <Typography variant="h3Uppercase" mb={3}>
          Update profile
        </Typography>

        <Stack spacing={2} component="form" noValidate onSubmit={handleSubmit(onSubmit)}>
          <BlogPostInputField
            register={register('displayName')}
            label="Display name"
            placeholder="How should we call you?"
            watch={watch}
            maxLength={maxLengths.userDisplayName}
          />

          <BlogPostInputField
            register={register('about')}
            label="About me"
            placeholder="Tell us a few things about you..."
            watch={watch}
            maxLength={maxLengths.userAbout}
            multiline
          />

          <BlogPostInputField
            register={register('profileImage')}
            label="Profile picture"
            type="file"
            inputProps={{ accept: 'image/png,image/jpeg' }}
          />

          <LoadingButton
            type="submit"
            variant="contained"
            isLoading={isSubmitting}
            disabled={!isDirty}
            sx={{ px: { sm: 10 }, alignSelf: { xs: 'stretch', sm: 'flex-start' } }}>
            Save changes
          </LoadingButton>
        </Stack>
      </Box>
    </>
  );
}

export default UpdateProfile;
