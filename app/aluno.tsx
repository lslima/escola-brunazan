import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Text } from 'react-native';
import Layout from '../components/Layout';
import PrimaryButton from '../components/PrimaryButton';
import TextField from '../components/TextField';

export default function AlunoScreen() {
  const router = useRouter();
  const [nome, setNome] = useState('');

  return (
    <Layout title="Tela do Aluno 🎸">
      <Text style={{ marginBottom: 20 }}>Digite seu nome:</Text>
      <TextField
        placeholder="Seu nome"
        value={nome}
        onChangeText={setNome}
      />
      <PrimaryButton
        title="Voltar para Home"
        onPress={() => router.push('/')}
      />
    </Layout>
  );
}
