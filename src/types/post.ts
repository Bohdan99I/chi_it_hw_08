export interface Post {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
  userId: number;
}

export interface Comment {
  id: number;
  content: string;
  createdAt: string;
  updatedAt: string;
  userId: number;
  exhibitId: number;
}

export interface ExhibitsResponse {
  data: Post[];
  currentPage: number;
  lastPage: number;
  perPage: number;
  total: number;
}

export interface CommentsResponse {
  data: Comment[];
  currentPage: number;
  lastPage: number;
  perPage: number;
  total: number;
}

export interface CreateExhibitDto {
  title: string;
  description: string;
  image: File;
}

export interface CreateCommentDto {
  content: string;
}
