export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: number;
}

export interface ApiError {
  success: false;
  message: string;
  statusCode: number;
}

export interface User {
  anonymousId: string;
  email: string;
}

export interface Post {
  _id: string;
  content: string;
  anonymousLaber: string;
  userId: string | null;
  likes: string[];
  dislikes: string[];
  commentsCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface Pagination {
  currentPage: number;
  totalPages: number;
  totalPosts: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export interface Comment {
  _id: string;
  content: string;
  postId: string;
  userId: string;
  anonymousLabel: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}
