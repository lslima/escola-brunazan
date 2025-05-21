import {
    collection,
    deleteDoc,
    doc,
    getDocs,
    updateDoc,
} from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { Linking, ScrollView, Text, View } from 'react-native';
import BottomNav from '../components/BottomNav';
import Layout from '../components/Layout';
import PrimaryButton from '../components/PrimaryButton';
import { db } from '../config/firebase';
import { colors } from '../config/theme';

type Material = {
  id: string;
  nome: string;
  instrumento: string;
  nivel: string;
  url: string;
  aprovado: boolean;
};

export default function CoordenacaoScreen() {
  const [materiais, setMateriais] = useState<Material[]>([]);
  const [status, setStatus] = useState<string | null>('Carregando...');

  const carregarMateriais = async () => {
    setStatus('Carregando...');
    try {
      const snapshot = await getDocs(collection(db, 'materiais'));
      const lista = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Material[];

      setMateriais(lista);
      setStatus(lista.length === 0 ? 'Nenhum material encontrado.' : null);
    } catch (error) {
      console.error('Erro ao carregar:', error);
      setStatus('Erro ao carregar ❌');
    }
  };

  useEffect(() => {
    carregarMateriais();
  }, []);

  const aprovar = async (item: Material) => {
    try {
      await updateDoc(doc(db, 'materiais', item.id), { aprovado: true });
      setStatus('Material aprovado ✅');
      carregarMateriais();
    } catch (error) {
      console.error('Erro ao aprovar:', error);
      setStatus('Erro ao aprovar ❌');
    }
  };

  const reprovar = async (item: Material) => {
    try {
      await updateDoc(doc(db, 'materiais', item.id), { aprovado: false });
      setStatus('Material reprovado 🚫');
      carregarMateriais();
    } catch (error) {
      console.error('Erro ao reprovar:', error);
      setStatus('Erro ao reprovar ❌');
    }
  };

  const excluir = async (item: Material) => {
    try {
      await deleteDoc(doc(db, 'materiais', item.id));
      setStatus('Material excluído 🗑️');
      carregarMateriais();
    } catch (error) {
      console.error('Erro ao excluir:', error);
      setStatus('Erro ao excluir ❌');
    }
  };

  return (
    <Layout title="Supervisão de Materiais">
      <ScrollView>
        {status && (
          <View
            style={{
              padding: 8,
              borderRadius: 8,
              backgroundColor: colors.navbar,
              marginBottom: 12,
            }}
          >
            <Text style={{ color: colors.text }}>{status}</Text>
          </View>
        )}

        {materiais.map((item) => (
          <View
            key={item.id}
            style={{
              borderWidth: 1,
              borderColor: colors.border,
              borderRadius: 8,
              padding: 12,
              marginBottom: 12,
              backgroundColor: colors.cardBackground,
            }}
          >
            <Text style={{ fontWeight: 'bold', color: colors.textInverted }}>
              {item.nome}
            </Text>
            <Text style={{ color: colors.textInverted }}>
              Instrumento: {item.instrumento}
            </Text>
            <Text style={{ color: colors.textInverted }}>
              Nível: {item.nivel}
            </Text>
            <Text
              style={{ color: colors.link, marginVertical: 4 }}
              onPress={() => Linking.openURL(item.url)}
            >
              🔗 Acessar Arquivo
            </Text>

            <PrimaryButton title="Aprovar" onPress={() => aprovar(item)} />
            <PrimaryButton title="Reprovar" onPress={() => reprovar(item)} />
            <PrimaryButton title="Excluir" onPress={() => excluir(item)} />
          </View>
        ))}
      </ScrollView>

      <BottomNav
        items={[
          { label: 'Home', route: '/' },
          { label: 'Supervisão', route: '/coordenacao' },
          { label: 'Usuários', route: '/coordenacao-usuarios' },
        ]}
      />
    </Layout>
  );
}
