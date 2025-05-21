import { collection, getDocs } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { Linking, ScrollView, Text, View } from 'react-native';
import BottomNav from '../components/BottomNav';
import Dropdown from '../components/Dropdown';
import Layout from '../components/Layout';
import { db } from '../config/firebase';

type Material = {
  id: string;
  nome: string;
  instrumento: string;
  nivel: string;
  url: string;
  aprovado: boolean;
};

export default function AlunoMateriaisScreen() {
  const [materiais, setMateriais] = useState<Material[]>([]);
  const [status, setStatus] = useState('Carregando...');

  const [instrumentoSelecionado, setInstrumentoSelecionado] = useState('');
  const [nivelSelecionado, setNivelSelecionado] = useState('');

  const carregarMateriais = async () => {
    setStatus('Carregando...');
    try {
      const snapshot = await getDocs(collection(db, 'materiais'));
      const lista = snapshot.docs.map((doc) => ({
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

  const materiaisFiltrados = materiais.filter((item) => {
    const filtroInstrumento = instrumentoSelecionado
      ? item.instrumento === instrumentoSelecionado
      : true;
    const filtroNivel = nivelSelecionado ? item.nivel === nivelSelecionado : true;
    return filtroInstrumento && filtroNivel;
  });

  const instrumentosUnicos = Array.from(new Set(materiais.map((m) => m.instrumento)));
  const niveisUnicos = Array.from(new Set(materiais.map((m) => m.nivel)));

  return (
    <Layout title="Materiais 🎸">
      <ScrollView>
        {status ? (
          <Text style={{ color: 'white', marginBottom: 16 }}>{status}</Text>
        ) : null}

        <Dropdown
          label="Instrumento"
          selectedValue={instrumentoSelecionado}
          onValueChange={setInstrumentoSelecionado}
          options={[
            { label: 'Todos', value: '' },
            ...instrumentosUnicos.map((inst) => ({
              label: inst,
              value: inst,
            })),
          ]}
        />

        <Dropdown
          label="Nível"
          selectedValue={nivelSelecionado}
          onValueChange={setNivelSelecionado}
          options={[
            { label: 'Todos', value: '' },
            ...niveisUnicos.map((niv) => ({
              label: niv,
              value: niv,
            })),
          ]}
        />

        {materiaisFiltrados.map((item) => (
          <View
            key={item.id}
            style={{
              borderWidth: 1,
              borderColor: '#E9D6B8',
              borderRadius: 8,
              padding: 12,
              marginBottom: 12,
              backgroundColor: '#F7F7F7',
            }}
          >
            <Text style={{ fontWeight: 'bold', color: '#121213' }}>{item.nome}</Text>
            <Text style={{ color: '#121213' }}>Instrumento: {item.instrumento}</Text>
            <Text style={{ color: '#121213' }}>Nível: {item.nivel}</Text>

            {!item.aprovado && (
              <Text style={{ color: 'orange' }}>⏳ Aguardando aprovação</Text>
            )}

            <Text
              style={{ color: 'blue', marginTop: 4 }}
              onPress={() => Linking.openURL(item.url)}
            >
              🔗 Acessar Arquivo
            </Text>
          </View>
        ))}
      </ScrollView>

      <BottomNav
        items={[
          { label: 'Home', route: '/' },
          { label: 'Materiais', route: '/aluno-materiais' },
        ]}
      />
    </Layout>
  );
}
