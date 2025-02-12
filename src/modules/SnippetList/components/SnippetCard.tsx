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
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';

import { useSnippetMark } from '../api/snippetMark';
import { SnippetSchema } from '../schemas/snippet';

type SnippetCardType = {
  comments: number;
  searchTerm: string;
  likes: number;
  likesActive: boolean;
  dislikes: number;
  dislikesActive: boolean;
} & Pick<SnippetSchema, 'id' | 'language' | 'code'> & {
    username: SnippetSchema['user']['username'];
  };

export const SnippetCard = ({
  id,
  searchTerm,
  username = 'Someone',
  language = 'Some language',
  code = 'No code here...',
  likes = 0,
  likesActive = false,
  dislikes = 0,
  dislikesActive = false,
  comments = 0,
}: SnippetCardType) => {
  const { mutate, isPending } = useSnippetMark({
    searchTerm,
  });

  const handleMark = (mark: 'like' | 'dislike' | 'none') => {
    mutate({ mark, id });
  };

  return (
    <Card
      id={id}
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
        title={username}
        action={
          <Box display="flex" alignItems="center">
            <CodeIcon sx={{ mr: 0.5 }} />
            <Typography variant="body2">{language}</Typography>
          </Box>
        }
      />
      <CardContent>
        <SyntaxHighlighter
          language={language}
          wrapLines={true}
          showLineNumbers={true}
        >
          {code}
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
            {likes}
          </Typography>
          <IconButton
            aria-label="dislike"
            onClick={() => handleMark(dislikesActive ? 'none' : 'dislike')}
            disabled={isPending}
          >
            <ThumbDownIcon color={dislikesActive ? 'secondary' : 'inherit'} />
          </IconButton>
          <Typography variant="body2" display="inline">
            {dislikes}
          </Typography>
        </Box>
        <Box display="flex" alignItems="center">
          <IconButton
            aria-label="comments"
            sx={{
              cursor: 'pointer',
              '&:hover': {
                backgroundColor: 'rgba(0, 0, 0, 0.04)',
              },
            }}
          >
            <ChatBubbleOutlineIcon />
          </IconButton>
          <Typography variant="body2">{comments}</Typography>
        </Box>
      </Box>
    </Card>
  );
};
