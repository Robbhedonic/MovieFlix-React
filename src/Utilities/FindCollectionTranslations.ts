import axios from 'axios';

export interface ITranslation {
  iso_3166_1: string;
  iso_639_1: string;
  name: string;
  english_name: string;
  data: {
    title?: string;
    overview?: string;
    homepage?: string;
  };
}

export const FindCollectionTranslations = async (collectionId: number): Promise<ITranslation[]> => {
  try {
    const token = import.meta.env.VITE_ACCESS_TOKEN;
    const baseUrl = import.meta.env.VITE_BASE_URL;

    const url = `${baseUrl}collection/${collectionId}/translations`;
    const result = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return result.data.translations || [];
  } catch (error) {
    console.error('Error al cargar traducciones de colección:', error);
    return [];
  }
};