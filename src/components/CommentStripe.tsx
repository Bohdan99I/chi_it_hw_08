import React, { useState } from 'react';
import { Box, Typography, CircularProgress, Button, TextField } from '@mui/material';
import { fetchComments, createComment } from '../api/commentActions';
import Comment from './Comment';
import Pagination from './Pagination';
import { CommentsResponse } from '../types/api';
import { useRequest } from 'ahooks';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { Link } from 'react-router-dom';

interface CommentStripeProps {
  exhibitId: number;
}

const CommentStripe: React.FC<CommentStripeProps> = ({ exhibitId }) => {
  const [page, setPage] = useState(1);
  const [newComment, setNewComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string>('');
  const isAuthenticated = useSelector((state: RootState) => state.user.isAuthenticated);

  const { data, loading, refresh } = useRequest<CommentsResponse, [number, number]>(
    (id, currentPage) => fetchComments(id, currentPage),
    {
      defaultParams: [exhibitId, 1],
      refreshDeps: [page],
      ready: isAuthenticated,
    }
  );

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    try {
      setIsSubmitting(true);
      setError('');
      
      await createComment(exhibitId, { content: newComment });
      setNewComment('');
      setPage(1);
      refresh();
    } catch (err: any) {
      setError(err.message || 'Failed to post comment');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Якщо користувач не авторизований, показуємо повідомлення
  if (!isAuthenticated) {
    return (
      <Box sx={{ mt: 2, p: 2, textAlign: 'center' }}>
        <Typography 
          color="text.secondary" 
          sx={{ mb: 1 }}
        >
          Please <Link to="/login" style={{ color: 'inherit', fontWeight: 'bold' }}>sign in</Link> to view and post comments.
        </Typography>
      </Box>
    );
  }

  const comments = data?.data || [];
  const totalPages = data?.lastPage || 1;

  return (
    <Box sx={{ mt: 2 }}>
      {/* Форма для створення коментаря */}
      <Box component="form" onSubmit={handleSubmitComment} sx={{ mb: 3 }}>
        <TextField
          fullWidth
          multiline
          rows={2}
          placeholder="Write a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          disabled={isSubmitting}
          error={!!error}
          helperText={error}
          sx={{ mb: 1 }}
        />
        <Button
          variant="contained"
          type="submit"
          disabled={isSubmitting || !newComment.trim()}
          sx={{ float: 'right' }}
        >
          {isSubmitting ? 'Posting...' : 'Post Comment'}
        </Button>
      </Box>

      {/* Список коментарів */}
      {loading && !data && (
        <Box sx={{ display: 'flex', justifyContent: 'center', p: 2 }}>
          <CircularProgress size={24} />
        </Box>
      )}

      {comments.length === 0 ? (
        <Typography 
          color="text.secondary" 
          sx={{ 
            p: 2, 
            textAlign: 'center',
            fontStyle: 'italic'
          }}
        >
          No comments yet. Be the first to comment!
        </Typography>
      ) : (
        <>
          {comments.map((comment) => (
            <Comment key={comment.id} comment={comment} />
          ))}
          
          {/* Пагінація */}
          {totalPages > 1 && (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
              <Pagination
                currentPage={page}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </Box>
          )}
        </>
      )}
    </Box>
  );
};

export default CommentStripe;