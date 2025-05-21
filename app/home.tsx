import { useRouter } from 'expo-router';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import Layout from '../components/Layout';
import PrimaryButton from '../components/PrimaryButton';
import { auth, db } from '../config/firebase';

type Usuario = {
  nome: string;
  email: string;
  papel: 'aluno' | 'professor' | 'coordenacao';
};

export default function HomeScreen() {
  const router = useRouter();
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [status, setStatus] = useState('Carregando...');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const docRef = doc(db, 'usuarios', user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data() as Usuario;
          setUsuario(data);
          setStatus('');
        } else {
          setStatus('Usuário não encontrado.');
          router.push('/login');
        }
      } else {
        router.push('/login');
      }
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    router.push('/login');
  };

  if (status) {
    return (
      <Layout title="Home">
        <Text>{status}</Text>
      </Layout>
    );
  }

  return (
    <Layout title="Painel Principal">
      <Text style={{ fontSize: 18, marginBottom: 8 }}>
        👋 Bem-vindo, {usuario?.nome}!
      </Text>
      <Text style={{ marginBottom: 16 }}>
        Seu papel: <Text style={{ fontWeight: 'bold' }}>{usuario?.papel}</Text>
      </Text>

      {usuario?.papel === 'aluno' && (
        <PrimaryButton
          title="📚 Acessar Materiais"
          onPress={() => router.push('/aluno-materiais')}
        />
      )}

      {usuario?.papel === 'professor' && (
        <>
          <PrimaryButton
            title="📤 Upload de Materiais"
            onPress={() => router.push('/professor-upload')}
          />
          <View style={{ height: 8 }} />
          <PrimaryButton
            title="📑 Meus Materiais"
            onPress={() => router.push('/professor')}
          />
        </>
      )}

      {usuario?.papel === 'coordenacao' && (
        <>
          <PrimaryButton
            title="📂 Supervisão de Materiais"
            onPress={() => router.push('/coordenacao')}
          />
          <View style={{ height: 8 }} />
          <PrimaryButton
            title="👥 Gestão de Usuários"
            onPress={() => router.push('/coordenacao-usuarios')}
          />
        </>
      )}

      <View style={{ height: 16 }} />
      <PrimaryButton title="🚪 Logout" onPress={handleLogout} />
    </Layout>
  );
}
