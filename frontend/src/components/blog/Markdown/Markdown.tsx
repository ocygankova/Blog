import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkToc from 'remark-toc';
import rehypeSlug from 'rehype-slug';
import remarkEmoji from 'remark-emoji';
import { Box, Link, List, ListItem, Typography, useTheme } from '@mui/material';
import styles from './Markdown.module.css';

interface IProps {
  children: string;
}

function Markdown({ children }: IProps) {
  const theme = useTheme();

  return (
    <ReactMarkdown
      className={styles.markdown}
      remarkPlugins={[remarkGfm, [remarkToc, { maxDepth: 3, tight: true }], remarkEmoji]}
      rehypePlugins={[rehypeSlug]}
      components={{
        h1: ({ node, ...props }) => <Typography {...props} variant="h1" my={6} component="h2" />,
        h2: ({ node, ...props }) => <Typography {...props} variant="h2" my={6} />,
        h3: ({ node, ...props }) => <Typography {...props} variant="h3" my={4} />,
        h4: ({ node, ...props }) => <Typography {...props} variant="h4" my={3} />,
        h5: ({ node, ...props }) => <Typography {...props} variant="h5" fontWeight="bold" my={3} />,
        h6: ({ node, ...props }) => <Typography {...props} variant="h6" fontWeight="bold" my={2} />,
        p: ({ node, ...props }) => <Typography {...props} variant="body1" my={1} />,
        span: ({ node, ...props }) => <Typography {...props} variant="body1" component="span" />,
        ul: ({ node, ...props }) => <List {...props} sx={{ listStyleType: 'disc', pl: 4 }} />,
        ol: ({ node, ...props }) => <List {...props} sx={{ listStyleType: 'number', pl: 4 }} />,
        li: ({ node, ...props }) => <ListItem {...props} sx={{ display: 'list-item', py: 0.5 }} />,
        a: ({ node, ...props }) => (
          <Link {...props} underline="always" target="_blank" rel="noreferrer" />
        ),
        blockquote: ({ children }) => (
          <blockquote
            style={{
              margin: '2rem 0',
              padding: '5px 8px 5px 30px',
              background: theme.palette.background.default,
              border: 'none',
              borderLeft: `4px solid ${theme.palette.primary.light}`,
            }}>
            {children}
          </blockquote>
        ),
        img: ({ node, ...props }) => (
          <span style={{ display: 'flex', justifyContent: 'center', margin: '2rem auto' }}>
            <a href={props.src} target="_blank" rel="noreferrer">
              <img
                alt={props.alt ?? ''}
                style={{
                  maxWidth: '100%',
                  cursor: 'zoom-in',
                  borderRadius: theme.shape.borderRadius,
                }}
                {...props}
              />
            </a>
          </span>
        ),

        pre: ({ children }) => (
          <Box
            my={4}
            py={2}
            px={{ xs: 2, md: 4 }}
            borderRadius={1}
            bgcolor={theme.palette.grey['200']}>
            <pre
              style={{
                overflowX: 'auto',
              }}>
              {children}
            </pre>
          </Box>
        ),

        code: ({ children }) => (
          <code
            style={{
              padding: '4px',
              background: `${theme.palette.grey['200']}`,
              borderRadius: '4px',
              color: '#000',
            }}>
            {children}
          </code>
        ),

        table: ({ children }) => (
          <Box
            my={4}
            py={2}
            sx={{
              overflowX: 'auto',
            }}>
            <table>{children}</table>
          </Box>
        ),
      }}>
      {children}
    </ReactMarkdown>
  );
}

export default Markdown;
