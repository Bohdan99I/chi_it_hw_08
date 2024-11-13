import React from "react";
import { Typography, Card, CardMedia, CardContent } from "@mui/material";

const Post: React.FC<any> = ({
  user,
  description,
  imageUrl,
  commentCount,
  createdAt,
  id,
}) => {
  return (
    <Card sx={{ marginBottom: 2, border: "1px solid black" }}>
      <CardMedia
        component="img"
        image={`http://ec2-13-49-67-34.eu-north-1.compute.amazonaws.com/${imageUrl}`}
        alt={description}
      />
      <CardContent>
        <Typography variant="h6">{description}</Typography>
        <Typography variant="subtitle2">Posted by: {user.username}</Typography>
        <Typography variant="subtitle2">Comments: {commentCount}</Typography>
      </CardContent>
    </Card>
  );
};

export default Post;
