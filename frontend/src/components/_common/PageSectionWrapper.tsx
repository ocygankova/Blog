import React, { ElementType, ReactNode } from 'react';
import NextImage from 'next/image';
import {
  Box,
  BoxProps,
  Container,
  PaperProps,
  styled,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { ResponsiveRoundedPaper } from '@/components';

interface IProps {
  children: ReactNode;
  sxPaper?: PaperProps['sx'];
  sxBox?: BoxProps['sx'];
  coverImageSrc?: string;
  coverImageAlt?: string;
  component?: ElementType;
}

function PageSectionWrapper({
  children,
  sxPaper,
  sxBox,
  coverImageSrc,
  coverImageAlt,
  component = 'section',
}: IProps & PaperProps) {
  const paperSx = { mb: 3, ...sxPaper };
  const boxSx = { px: { xs: 2, sm: 3, md: 6 }, py: 4, ...sxBox };

  const theme = useTheme();
  const widthMdDown = useMediaQuery(theme.breakpoints.down('md'));
  const paperVariant = widthMdDown ? 'elevation' : 'outlined';

  return (
    <Container sx={{ px: { xs: 0, md: 3 } }}>
      <ResponsiveRoundedPaper
        sx={paperSx}
        variant={paperVariant}
        elevation={0}
        component={component}>
        {coverImageSrc && (
          <BlogPostImageBox mb={4}>
            <NextImage
              src={coverImageSrc}
              alt={coverImageAlt || ''}
              fill
              priority
              sizes="(max-width: 600px) 100vw, 800px"
            />
          </BlogPostImageBox>
        )}

        <Box sx={boxSx}>{children}</Box>
      </ResponsiveRoundedPaper>
    </Container>
  );
}

export default PageSectionWrapper;

const BlogPostImageBox = styled(Box)(({ theme }) => ({
  position: 'relative',
  aspectRatio: '1000 / 420',
  overflow: 'hidden',
  borderRadius: '18px 18px 24px 24px',

  [theme.breakpoints.down('md')]: {
    borderRadius: 0,
  },
}));
