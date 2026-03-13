export interface IReview {
  id: string;
  author: string;
  content: string;
  created_at: string;
  url: string;
  author_details?: {
    rating: number | null;
    username?: string;
    avatar_path?: string | null;
  };
}
