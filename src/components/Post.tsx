import React from 'react';
import { Typography, Card, CardMedia, CardContent } from '@mui/material';

interface PostProps {
  post: {
    id: string;
    description: string;
    imageUrl: string;
    user: {
      username: string;
    };
    commentCount: number;
  };
}

const Post: React.FC<PostProps> = ({ post }) => {
  console.log('Rendering Post:', post); 
  return (
    <Card sx={{ marginBottom: 2, border: '1px solid black' }}>
      <CardMedia
        component="img"
        height="140"
        image={post.imageUrl}
        alt={post.description}
      />
      <CardContent>
        <Typography variant="h6">{post.description}</Typography>
        <Typography variant="subtitle2">Posted by: {post.user.username}</Typography>
        <Typography variant="subtitle2">Comments: {post.commentCount}</Typography>
      </CardContent>
    </Card>
  );
};

export default Post;
