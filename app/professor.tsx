import { useRouter } from 'expo-router';
import { collection, getDocs } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { Linking, ScrollView, Text, View } from 'react-native';
import Layout from '../components/Layout';
import PrimaryButton from '../components/PrimaryButton';
import { db } from '../config/firebase';

type Material = {
  id: string;
  nome: string;
  instrumento: string;
  nivel: string;
  url: string;
  aprovado: boolean;
};

export default function ProfessorScreen() {
  const router = useRouter();
  const [materiais, setMateriais] = useState<Material[]>([]);
  const [status, setStatus] = useState('Carregando...');

  const carregarMateriais = async () => {
    setStatus('Carregando...');
    try {
      const snapshot = await getDocs(collection(db, 'materiais'));
      const lista: Material[] = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Material[];

      setMateriais(lista);
      setStatus(lista.length === 0 ? 'Nenhum material encontrado.' : '');
    } catch (error) {
      console.error('Erro ao carregar materiais:', error);
      setStatus('Erro ao carregar materiais ❌');
    }
  };

  useEffect(() => {
    carregarMateriais();
  }, []);

  return (
    <Layout title="Meus Materiais">
      <ScrollView>
        {status ? <Text style={{ marginBottom: 16 }}>{status}</Text> : null}

        {materiais.map((item) => (
          <View
            key={item.id}
            style={{
              borderWidth: 1,
              borderColor: '#E9D6B8',
              borderRadius: 8,
              padding: 12,
              marginBottom: 12,
              backgroundColor: '#fff',
            }}
          >
            <Text style={{ fontWeight: 'bold' }}>{item.nome}</Text>
            <Text>Instrumento: {item.instrumento}</Text>
            <Text>Nível: {item.nivel}</Text>
            <Text>Status: {item.aprovado ? '✅ Aprovado' : '⏳ Pendente'}</Text>
            <Text
              style={{ color: 'blue', marginTop: 4 }}
              onPress={() => Linking.openURL(item.url)}
            >
              🔗 Acessar Arquivo
            </Text>
          </View>
        ))}
      </ScrollView>

      <PrimaryButton
        title="Fazer Upload"
        onPress={() => router.push('/professor-upload')}
      />
      <View style={{ height: 8 }} />
      <PrimaryButton title="Voltar para Home" onPress={() => router.push('/')} />
    </Layout>
  );
}
