import React from "react";
import { Typography, Card, CardMedia, CardContent, Box, Divider } from "@mui/material";
import { Post as PostType } from "../types/post";
import CommentStripe from "./CommentStripe";

const Post: React.FC<PostType> = ({
  id,
  title,
  description,
  imageUrl,
  createdAt,
  userId
}) => {
  // Додаємо базовий URL до картинки
  const fullImageUrl = `http://ec2-13-49-67-34.eu-north-1.compute.amazonaws.com${imageUrl}`;

  return (
    <Card sx={{ marginBottom: 2, border: "1px solid #e0e0e0", borderRadius: 2 }}>
      <Box sx={{ position: 'relative', paddingTop: '56.25%' /* 16:9 aspect ratio */ }}>
        <CardMedia
          component="img"
          image={fullImageUrl}
          alt={description}
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover'
          }}
        />
      </Box>
      <CardContent>
        {title && (
          <Typography 
            variant="h6" 
            sx={{ 
              mb: 1,
              fontWeight: 600,
              wordBreak: 'break-word'
            }}
          >
            {title}
          </Typography>
        )}
        <Typography 
          variant="body1" 
          sx={{ 
            mb: 1,
            color: 'text.secondary',
            wordBreak: 'break-word'
          }}
        >
          {description}
        </Typography>
        
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
          <Typography 
            variant="subtitle2" 
            sx={{ fontWeight: 600 }}
          >
            User #{userId}
          </Typography>
          <Typography 
            variant="caption" 
            color="text.secondary"
          >
            {new Date(createdAt).toLocaleDateString()}
          </Typography>
        </Box>
      </CardContent>
      
      <Divider />
      
      <Box sx={{ px: 2, pb: 2 }}>
        <CommentStripe exhibitId={id} />
      </Box>
    </Card>
  );
};

export default Post;
