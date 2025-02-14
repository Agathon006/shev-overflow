import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import CodeIcon from '@mui/icons-material/Code';
import PersonIcon from '@mui/icons-material/Person';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardHeader,
  IconButton,
  Typography,
} from '@mui/material';
import { Link } from '@tanstack/react-router';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';

import { useAuth } from '@/api/auth';

import { useSnippetMark } from '../api/createSnippetMark';
import { SnippetSchema } from '../schemas/snippet';

type SnippetCardProps = {
  snippet: SnippetSchema;
  onMark: (mark: 'like' | 'dislike' | 'none') => void;
};

export const SnippetCard = ({ snippet, onMark }: SnippetCardProps) => {
  const { data: currentUser } = useAuth();

  const { mutate, isPending } = useSnippetMark();

  const likesActive = snippet.marks?.some(
    (m) => m.type === 'like' && m.user.id === currentUser?.id,
  );
  const dislikesActive = snippet.marks?.some(
    (m) => m.type === 'dislike' && m.user.id === currentUser?.id,
  );

  const handleMark = (mark: 'like' | 'dislike' | 'none') => {
    mutate(
      { mark, id: snippet.id },
      {
        onSuccess: () => {
          onMark(mark);
        },
      },
    );
  };

  return (
    <Card
      id={snippet.id}
      sx={{
        width: '100%',
        margin: 'auto',
      }}
    >
      <CardHeader
        avatar={
          <Avatar>
            <PersonIcon />
          </Avatar>
        }
        title={snippet.user.username ?? 'Someone'}
        action={
          <Box display="flex" alignItems="center">
            <CodeIcon sx={{ mr: 0.5 }} />
            <Typography variant="body2">{snippet.language}</Typography>
          </Box>
        }
      />
      <CardContent>
        <SyntaxHighlighter
          language={snippet.language ?? 'Some language'}
          wrapLines={true}
          showLineNumbers={true}
        >
          {snippet.code ?? 'No code here...'}
        </SyntaxHighlighter>
      </CardContent>
      <Box
        sx={{
          padding: 1,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Box>
          <IconButton
            aria-label="like"
            onClick={() => handleMark(likesActive ? 'none' : 'like')}
            disabled={isPending}
          >
            <ThumbUpIcon color={likesActive ? 'secondary' : 'inherit'} />
          </IconButton>
          <Typography variant="body2" display="inline" sx={{ mr: 1 }}>
            {snippet.marks?.filter((m) => m.type === 'like').length ?? 0}
          </Typography>
          <IconButton
            aria-label="dislike"
            onClick={() => handleMark(dislikesActive ? 'none' : 'dislike')}
            disabled={isPending}
          >
            <ThumbDownIcon color={dislikesActive ? 'secondary' : 'inherit'} />
          </IconButton>
          <Typography variant="body2" display="inline">
            {snippet.marks?.filter((m) => m.type === 'dislike').length ?? 0}
          </Typography>
        </Box>
        <Box display="flex" alignItems="center">
          <IconButton
            aria-label="comments"
            component={Link}
            to="/posts/$postId"
            params={{ postId: snippet.id }}
            sx={{
              cursor: 'pointer',
              '&:hover': {
                backgroundColor: 'rgba(0, 0, 0, 0.04)',
              },
            }}
          >
            <ChatBubbleOutlineIcon />
          </IconButton>
          <Typography variant="body2">
            {snippet.comments?.length ?? 0}
          </Typography>
        </Box>
      </Box>
    </Card>
  );
};
