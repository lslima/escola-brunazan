import { useEffect, useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import Dropdown from '../components/Dropdown';
import HomeButton from '../components/HomeButton';
import Layout from '../components/Layout';
import PrimaryButton from '../components/PrimaryButton';
import TextField from '../components/TextField';

import { createUserWithEmailAndPassword } from 'firebase/auth';
import {
    collection,
    deleteDoc,
    doc,
    getDocs,
    setDoc,
    updateDoc,
} from 'firebase/firestore';
import { auth, db } from '../config/firebase';

type Usuario = {
  id: string;
  nome: string;
  email: string;
  papel: 'aluno' | 'professor' | 'coordenacao';
};

export default function CoordenacaoUsuariosScreen() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [status, setStatus] = useState('');

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [papel, setPapel] = useState<'aluno' | 'professor' | 'coordenacao'>('aluno');

  const carregarUsuarios = async () => {
    setStatus('Carregando...');
    try {
      const snapshot = await getDocs(collection(db, 'usuarios'));
      const lista = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Usuario[];

      setUsuarios(lista);
      setStatus('');
    } catch (error) {
      console.error('Erro ao carregar usuários:', error);
      setStatus('Erro ao carregar usuários ❌');
    }
  };

  useEffect(() => {
    carregarUsuarios();
  }, []);

  const criarUsuario = async () => {
    if (!nome || !email || !senha) {
      setStatus('Preencha todos os campos.');
      return;
    }

    setStatus('Criando usuário...');
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, senha);
      const uid = userCredential.user.uid;

      await setDoc(doc(db, 'usuarios', uid), {
        nome,
        email,
        papel,
        criadoEm: new Date(),
      });

      setNome('');
      setEmail('');
      setSenha('');
      setPapel('aluno');

      setStatus('Usuário criado com sucesso ✅');
      carregarUsuarios();
    } catch (error: any) {
      if (error.code === 'auth/email-already-in-use') {
        setStatus('Erro: Este e-mail já está em uso.');
      } else {
        console.error('Erro ao criar usuário:', error);
        setStatus('Erro ao criar usuário ❌');
      }
    }
  };

  const excluirUsuario = async (usuario: Usuario) => {
    try {
      await deleteDoc(doc(db, 'usuarios', usuario.id));
      setStatus('Usuário removido do Firestore.');
      carregarUsuarios();
    } catch (error) {
      console.error('Erro ao excluir:', error);
      setStatus('Erro ao excluir usuário.');
    }
  };

  const alterarPapel = async (usuario: Usuario, novoPapel: string) => {
    try {
      const docRef = doc(db, 'usuarios', usuario.id);
      await updateDoc(docRef, { papel: novoPapel });
      setStatus('Papel atualizado.');
      carregarUsuarios();
    } catch (error) {
      console.error('Erro ao atualizar papel:', error);
      setStatus('Erro ao atualizar papel.');
    }
  };

  return (
    <Layout title="Gestão de Usuários">
      <ScrollView>
        {status ? <Text style={{ marginBottom: 8 }}>{status}</Text> : null}

        <Text style={{ fontWeight: 'bold', marginBottom: 4 }}>Cadastrar novo usuário:</Text>

        <TextField placeholder="Nome" value={nome} onChangeText={setNome} />
        <TextField placeholder="Email" value={email} onChangeText={setEmail} />
        <TextField placeholder="Senha" value={senha} onChangeText={setSenha} secureTextEntry />

        <Dropdown
          label="Papel"
          selectedValue={papel}
          onValueChange={(value) => setPapel(value as Usuario['papel'])}
          options={[
            { label: 'Aluno', value: 'aluno' },
            { label: 'Professor', value: 'professor' },
            { label: 'Coordenação', value: 'coordenacao' },
          ]}
        />

        <PrimaryButton title="Criar Usuário" onPress={criarUsuario} />

        <View style={{ height: 16 }} />

        <Text style={{ fontWeight: 'bold', marginBottom: 8 }}>Usuários cadastrados:</Text>

        {usuarios.map((usuario) => (
          <View
            key={usuario.id}
            style={{
              borderWidth: 1,
              borderColor: '#E9D6B8',
              borderRadius: 8,
              padding: 12,
              marginBottom: 12,
              backgroundColor: '#fff',
            }}
          >
            <Text style={{ fontWeight: 'bold' }}>{usuario.nome}</Text>
            <Text>{usuario.email}</Text>
            <Text>Papel atual: {usuario.papel}</Text>

            <Dropdown
              label="Alterar papel"
              selectedValue={usuario.papel}
              onValueChange={(value) => alterarPapel(usuario, value)}
              options={[
                { label: 'Aluno', value: 'aluno' },
                { label: 'Professor', value: 'professor' },
                { label: 'Coordenação', value: 'coordenacao' },
              ]}
            />

            <PrimaryButton title="Excluir" onPress={() => excluirUsuario(usuario)} />
          </View>
        ))}
      </ScrollView>

      <HomeButton />
    </Layout>
  );
}
