import axios from 'axios';
import { IReview } from '../Models/IReview';

export const LoadReviews = async (
  mediaType: 'movie' | 'tv',
  itemId: string | number,
  page: number = 1
): Promise<IReview[]> => {
  const key = import.meta.env.VITE_API_KEY;
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const options = import.meta.env.VITE_LANGUAGE;

  const url = `${baseUrl}${mediaType}/${itemId}/reviews`;
  const result = await axios.get(url, {
    params: {
      api_key: key,
      language: options,
      page,
    },
  });

  return result.data?.results ?? [];
};
