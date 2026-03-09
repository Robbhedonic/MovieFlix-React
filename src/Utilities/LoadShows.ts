import axios from 'axios';
import { IShow } from '../Models/IShow';

export const LoadShows = async (endpoint: string, page: number = 1, language: string = 'en-US'): Promise<IShow[]> => {
  try {
    const key = import.meta.env.VITE_API_KEY;
    const baseUrl = import.meta.env.VITE_BASE_URL;

    const url = `${baseUrl}${endpoint}`;
    console.log(url);

    console.log(key, baseUrl, language);
    const result = await axios.get(url, {
      params: {
        api_key: key,
        language: language,
        page: page
      }
    });

    console.log('Respuesta completa de la API (series):', result.data);

    return result.data.results || [];
  } catch (error) {
    console.error('Error al cargar series:', error);
    return [];
  }
};
