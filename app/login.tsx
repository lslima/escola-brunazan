import { useRouter } from 'expo-router';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { useState } from 'react';
import { Text, TextInput } from 'react-native';
import Layout from '../components/Layout';
import PrimaryButton from '../components/PrimaryButton';
import { auth, db } from '../config/firebase';

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [status, setStatus] = useState('');

  const handleLogin = async () => {
    setStatus('Entrando...');
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, senha);
      const uid = userCredential.user.uid;

      const docRef = doc(db, 'usuarios', uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const papel = docSnap.data().papel;
        if (papel === 'aluno') router.push('/aluno-materiais');
        else if (papel === 'professor') router.push('/professor');
        else if (papel === 'coordenacao') router.push('/coordenacao');
        else setStatus('Papel não definido. Contate a coordenação.');
      } else {
        setStatus('Usuário não encontrado na base. Contate a coordenação.');
      }
    } catch (error) {
      console.error('Erro no login:', error);
      setStatus('Erro no login. Verifique e-mail e senha.');
    }
  };

  return (
    <Layout title="Login">
      <Text>E-mail:</Text>
      <TextInput
        placeholder="email@exemplo.com"
        value={email}
        onChangeText={setEmail}
        style={{ borderWidth: 1, marginBottom: 8, padding: 4 }}
      />
      <Text>Senha:</Text>
      <TextInput
        placeholder="Senha"
        secureTextEntry
        value={senha}
        onChangeText={setSenha}
        style={{ borderWidth: 1, marginBottom: 8, padding: 4 }}
      />

      {status ? <Text style={{ marginBottom: 8 }}>{status}</Text> : null}

      <PrimaryButton title="Entrar" onPress={handleLogin} />
    </Layout>
  );
}
