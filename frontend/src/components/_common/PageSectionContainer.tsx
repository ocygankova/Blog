import React, { ReactNode } from 'react';
import NextImage from 'next/image';
import { Box, PaperProps, styled } from '@mui/material';
import { PaperRounded } from '@/components';

interface IProps {
  children: ReactNode;
  sx?: PaperProps['sx'];
  coverImageSrc?: string;
  coverImageAlt?: string;
}

function PageSectionContainer({
  children,
  sx,
  coverImageSrc,
  coverImageAlt,
  ...props
}: IProps & PaperProps) {
  const paperSx = { p: '32px 48px', mb: 2, ...sx };

  return (
    <PaperRounded sx={paperSx} {...props} variant="outlined">
      {coverImageSrc && (
        <BlogPostImageBox mb={4} sx={{ margin: '-32px -48px 32px -48px' }}>
          <NextImage
            src={coverImageSrc}
            alt={coverImageAlt || ''}
            fill
            priority
            sizes="(max-width: 600px) 100vw, 800px"
          />
        </BlogPostImageBox>
      )}

      {children}
    </PaperRounded>
  );
}

export default PageSectionContainer;

const BlogPostImageBox = styled(Box)(({ theme }) => ({
  position: 'relative',
  aspectRatio: '1000 / 420',
  overflow: 'hidden',
  borderRadius: '18px 18px 24px 24px',
}));
