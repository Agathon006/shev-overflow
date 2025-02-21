import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import CodeIcon from '@mui/icons-material/Code';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
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
import { Link, useNavigate } from '@tanstack/react-router';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';

import { useAuth } from '@/api/auth';
import { ConfirmationModal } from '@/components/ConfirmationModal';
import { SnippetSchema } from '@/schemas/snippet';
import { notify } from '@/utils/notify';

import { useSnippetMark } from '../api/createSnippetMark';
import { useDeleteSnippet } from '../api/deleteSnippet';

type SnippetCardProps = {
  snippet: SnippetSchema;
  onMark: (mark: 'like' | 'dislike' | 'none') => void;
};

export const SnippetCard = ({ snippet, onMark }: SnippetCardProps) => {
  const { t } = useTranslation();

  const [modalOpen, setModalOpen] = useState(false);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleConfirm = () => {
    deleteSnippet({ snippetId: snippet.id });
    handleCloseModal();
  };

  const navigate = useNavigate();
  const { mutate, isPending } = useSnippetMark();
  const { data: currentUser } = useAuth();
  const isCurrentUser = snippet.user?.id === currentUser?.id;

  const { mutate: deleteSnippet, isPending: deleteIsPending } =
    useDeleteSnippet({
      snippetId: snippet.id,
      mutationConfig: {
        onSuccess: () => {
          if (window.location.pathname.startsWith('/posts/')) {
            navigate({ to: '/users/me/posts' });
          }
          notify({ type: 'info', title: t('snippet-list.delete-success') });
        },
      },
    });

  const [likesActive, setLikesActive] = useState(
    snippet.marks?.some(
      (m) => m.type === 'like' && m.user.id === currentUser?.id,
    ),
  );
  const [dislikesActive, setDislikesActive] = useState(
    snippet.marks?.some(
      (m) => m.type === 'dislike' && m.user.id === currentUser?.id,
    ),
  );
  const [snippetMarks, setSnippetMarks] = useState({
    likes: snippet.marks?.filter((m) => m.type === 'like').length ?? 0,
    dislikes: snippet.marks?.filter((m) => m.type === 'dislike').length ?? 0,
  });

  const handleMark = (mark: 'like' | 'dislike' | 'none') => {
    mutate(
      { mark, id: snippet.id },
      {
        onSuccess: () => {
          onMark(mark);
          if (mark === 'like') {
            setLikesActive(true);
            setDislikesActive(false);
            if (dislikesActive) {
              setSnippetMarks({
                likes: snippetMarks.likes + 1,
                dislikes: snippetMarks.dislikes - 1,
              });
            } else {
              setSnippetMarks({
                likes: snippetMarks.likes + 1,
                dislikes: snippetMarks.dislikes,
              });
            }
          } else if (mark === 'dislike') {
            setLikesActive(false);
            setDislikesActive(true);
            if (likesActive) {
              setSnippetMarks({
                likes: snippetMarks.likes - 1,
                dislikes: snippetMarks.dislikes + 1,
              });
            } else {
              setSnippetMarks({
                likes: snippetMarks.likes,
                dislikes: snippetMarks.dislikes + 1,
              });
            }
          } else {
            if (likesActive) {
              setLikesActive(false);
              setSnippetMarks({
                likes: snippetMarks.likes - 1,
                dislikes: snippetMarks.dislikes,
              });
            } else if (dislikesActive) {
              setDislikesActive(false);
              setSnippetMarks({
                likes: snippetMarks.likes,
                dislikes: snippetMarks.dislikes - 1,
              });
            }
          }
        },
      },
    );
  };

  return (
    <Card
      id={snippet.id}
      sx={(theme) => ({
        width: '100%',
        margin: 'auto',
        backgroundColor: isCurrentUser
          ? theme.palette.primary.light
          : theme.palette.customNeutral[100],
      })}
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
            <Typography variant="body2" sx={{ mr: 2 }}>
              {snippet.language}
            </Typography>
            {isCurrentUser && (
              <>
                <IconButton
                  disabled={deleteIsPending}
                  component={Link}
                  to="/users/me/posts/$postId"
                  params={{ postId: snippet.id }}
                  sx={{ p: 0.5 }}
                >
                  <EditIcon sx={{ fontSize: 20 }} />
                </IconButton>
                <IconButton
                  disabled={deleteIsPending}
                  onClick={handleOpenModal}
                  sx={{ p: 0.5, color: 'error.main' }}
                >
                  <DeleteIcon sx={{ fontSize: 20 }} />
                </IconButton>
                <ConfirmationModal
                  open={modalOpen}
                  onClose={handleCloseModal}
                  onConfirm={handleConfirm}
                />
              </>
            )}
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
          position: 'relative',
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
            {snippetMarks.likes}
          </Typography>
          <IconButton
            aria-label="dislike"
            onClick={() => handleMark(dislikesActive ? 'none' : 'dislike')}
            disabled={isPending}
          >
            <ThumbDownIcon color={dislikesActive ? 'secondary' : 'inherit'} />
          </IconButton>
          <Typography variant="body2" display="inline">
            {snippetMarks.dislikes}
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
