import React, { useState, useEffect } from 'react';
import { fetchComments } from '../api/commentActions';
import Comment from './Comment';

interface CommentStripeProps {
  postId: string;
}

const CommentStripe: React.FC<CommentStripeProps> = ({ postId }) => {
  const [comments, setComments] = useState<any[]>([]);

  useEffect(() => {
    fetchComments(postId).then((data) => setComments(data));
  }, [postId]);

  return (
    <div>
      {comments.map((comment) => (
        <Comment key={comment.id} comment={comment} />
      ))}
    </div>
  );
};

export default CommentStripe;
