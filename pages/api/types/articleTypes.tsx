export interface Comment {
  id: string;
  content: string;
  createdAt: string;
  name: string;
  articleId: string;
  userId: string;
}

export interface Article {
  id: string;
  title: string;
  content: string;
  authorId: string;
  createdAt: string;
  updatedAt: string;
  favoriteCount: number;
  comments?: Comment[];
}

export interface ErrorResponse {
  response?: {
    data: {
      message: string;
    };
    status: number;
  };
}

export interface GetArticlesParams {
  pageSize?: number;
  keyword?: string;
  orderBy?: string;
  order?: 'asc' | 'desc';
}
