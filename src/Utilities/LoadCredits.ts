import axios from 'axios';
import { ICredits } from '../Models/ICredits';

export const LoadCredits = async (
  mediaType: 'movie' | 'tv',
  itemId: string | number
): Promise<ICredits> => {
  const key = import.meta.env.VITE_API_KEY;
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const options = import.meta.env.VITE_LANGUAGE;

  const url = `${baseUrl}${mediaType}/${itemId}/credits`;
  const result = await axios.get(url, {
    params: {
      api_key: key,
      language: options,
    },
  });

  return {
    cast: result.data?.cast ?? [],
    crew: result.data?.crew ?? [],
  };
};
