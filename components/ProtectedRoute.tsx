import { useRouter } from 'expo-router';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { auth, db } from '../config/firebase';

type Props = {
  children: React.ReactNode;
  allowedRoles: string[]; // Ex.: ['aluno']
};

export default function ProtectedRoute({ children, allowedRoles }: Props) {
  const router = useRouter();
  const [status, setStatus] = useState<'checking' | 'allowed' | 'denied'>('checking');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const docRef = doc(db, 'usuarios', user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const papel = docSnap.data().papel;
          if (allowedRoles.includes(papel)) {
            setStatus('allowed');
          } else {
            setStatus('denied');
            router.push('/login'); // Ou uma página de acesso negado
          }
        } else {
          setStatus('denied');
          router.push('/login');
        }
      } else {
        setStatus('denied');
        router.push('/login');
      }
    });

    return () => unsubscribe();
  }, []);

  if (status === 'checking') {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Verificando acesso...</Text>
      </View>
    );
  }

  if (status === 'denied') {
    return null; // Redirecionado
  }

  return <>{children}</>;
}
