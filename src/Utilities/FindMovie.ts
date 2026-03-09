import axios from 'axios';
import { IMovie } from '../Models/IMovie';

export const FindMovie = async (endpoint: string): Promise<IMovie> => {
  const key = import.meta.env.VITE_API_KEY;
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const options = import.meta.env.VITE_LANGUAGE;

  const url = `${baseUrl}${endpoint}?api_key=${key}&language=${options}`;
  console.log(url);

  console.log(key, baseUrl, options);
  const result = await axios.get(url);
  console.log(result.data);

  return result.data;
};
