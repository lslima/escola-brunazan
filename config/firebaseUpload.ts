import { addDoc, collection, Timestamp } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { db, storage } from './firebase';

const sanitizeFileName = (fileName: string) => {
  return fileName
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-zA-Z0-9.\-_]/g, '_');
};

export async function uploadMaterial({
  file,
  nome,
  instrumento,
  nivel,
}: {
  file: File;
  nome: string;
  instrumento: string;
  nivel: string;
}) {
  const sanitizedFileName = sanitizeFileName(file.name);
  const path = `materiais/${Date.now()}_${sanitizedFileName}`;
  const storageRef = ref(storage, path);

  const snapshot = await uploadBytes(storageRef, file);
  const url = await getDownloadURL(snapshot.ref);

  const docRef = await addDoc(collection(db, 'materiais'), {
    nome,
    instrumento,
    nivel,
    url,
    path, // 🔥 Agora o path está correto e limpo
    criadoEm: Timestamp.now(),
    aprovado: false,
  });

  return { url, id: docRef.id, path };
}
