// Базові інтерфейси для пагінації
export interface PaginationInfo {
  currentPage: number;
  lastPage: number;
  perPage: number;
  total: number;
}

export interface PaginatedResponse<T> extends PaginationInfo {
  data: T[];
}

// Аутентифікація
export interface LoginDto {
  username: string;
  password: string;
}

export interface RegisterDto extends LoginDto {
  name: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface User {
  id: number;
  username: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

// Експонати
export interface Exhibit {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  userId: number;
  user?: User;
  createdAt: string;
  updatedAt: string;
  comments?: Comment[];
}

export interface CreateExhibitDto {
  title: string;
  description: string;
  image: File;
}

export interface UpdateExhibitDto {
  title?: string;
  description?: string;
  image?: File;
}

export type ExhibitsResponse = PaginatedResponse<Exhibit>;

// Коментарі
export interface Comment {
  id: number;
  content: string;
  userId: number;
  exhibitId: number;
  user?: User;
  createdAt: string;
  updatedAt: string;
}

export interface CreateCommentDto {
  content: string;
}

export interface UpdateCommentDto {
  content: string;
}

export type CommentsResponse = PaginatedResponse<Comment>;

// Помилки
export interface ApiError {
  message: string;
  statusCode: number;
}

// Профіль
export interface UpdateProfileDto {
  name?: string;
  email?: string;
  currentPassword?: string;
  newPassword?: string;
}

export interface ProfileResponse {
  user: User;
}
