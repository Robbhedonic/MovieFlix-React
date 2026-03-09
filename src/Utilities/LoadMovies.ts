import axios from 'axios';
import { IMovie } from '../Models/IMovie';

export const LoadMovies = async (endpoint: string, page: number = 1, language: string = 'sv-SE'): Promise<IMovie[]> => {
  try {
    const key = import.meta.env.VITE_API_KEY;
    const baseUrl = import.meta.env.VITE_BASE_URL;

    const url = `${baseUrl}${endpoint}`;
    console.log(url);

    console.log(key, baseUrl);
    const result = await axios.get(url, {
      params: {
        api_key: key,
        language: language,
        page: page
      }
    });

    console.log('Respuesta completa de la API (películas):', result.data);

    return result.data.results || [];
  } catch (error) {
    console.error('Error al cargar películas:', error);
    return [];
  }
};
