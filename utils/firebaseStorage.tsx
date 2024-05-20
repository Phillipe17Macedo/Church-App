import { getStorage, ref as storageRef, uploadString, getDownloadURL } from 'firebase/storage';

export const uploadImagemParaStorage = async (uri: string): Promise<string> => {
  try {
    const storage = getStorage();
    const fileName = uri.substring(uri.lastIndexOf('/') + 1);
    const storageReference = storageRef(storage, `eventos/${fileName}`);
    await uploadString(storageReference, uri, 'data_url');
    const imageUrl = await getDownloadURL(storageReference);
  
    if (!imageUrl) {
      throw new Error('URL da imagem é undefined');
    }
    return imageUrl;
  } catch (error) {
    console.error('Erro ao fazer upload da imagem para o Firebase Storage:', error);
    throw error;
  }
};
