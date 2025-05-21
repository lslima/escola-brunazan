import { useState } from 'react';
import { Text } from 'react-native';
import BottomNav from '../components/BottomNav';
import Dropdown from '../components/Dropdown';
import Layout from '../components/Layout';
import PrimaryButton from '../components/PrimaryButton';
import TextField from '../components/TextField';
import { uploadMaterial } from '../config/firebaseUpload';
import { colors } from '../config/theme';

export default function ProfessorUploadScreen() {
  const [nome, setNome] = useState('');
  const [instrumento, setInstrumento] = useState('');
  const [nivel, setNivel] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState('');

  const handleUpload = async () => {
    if (!file || !nome || !instrumento || !nivel) {
      setStatus('Preencha todos os campos.');
      return;
    }
    setStatus('Enviando...');
    try {
      await uploadMaterial({ file, nome, instrumento, nivel });
      setNome('');
      setInstrumento('');
      setNivel('');
      setFile(null);
      setStatus('Upload realizado com sucesso ✅');
    } catch (error) {
      console.error('Erro no upload:', error);
      setStatus('Erro no upload ❌');
    }
  };

  return (
    <Layout title="Upload de Materiais">
      <TextField placeholder="Nome do material" value={nome} onChangeText={setNome} />

      <Dropdown
        label="Instrumento"
        selectedValue={instrumento}
        onValueChange={setInstrumento}
        options={[
          { label: 'Violão', value: 'violao' },
          { label: 'Piano', value: 'piano' },
          { label: 'Bateria', value: 'bateria' },
          { label: 'Guitarra', value: 'guitarra' },
        ]}
      />

      <Dropdown
        label="Nível"
        selectedValue={nivel}
        onValueChange={setNivel}
        options={[
          { label: 'Iniciante', value: 'iniciante' },
          { label: 'Intermediário', value: 'intermediario' },
          { label: 'Avançado', value: 'avancado' },
        ]}
      />

      <PrimaryButton
        title="Selecionar Arquivo"
        onPress={async () => {
          const input = document.createElement('input');
          input.type = 'file';
          input.onchange = () => {
            if (input.files) {
              setFile(input.files[0]);
            }
          };
          input.click();
        }}
      />

      {file && (
        <Text style={{ color: colors.text, marginBottom: 8 }}>
          Arquivo selecionado: {file.name}
        </Text>
      )}

      {status && (
        <Text style={{ color: colors.text, marginBottom: 8 }}>{status}</Text>
      )}

      <PrimaryButton title="Enviar" onPress={handleUpload} />

      <BottomNav
        items={[
          { label: 'Home', route: '/' },
          { label: 'Upload', route: '/professor-upload' },
          { label: 'Materiais', route: '/professor' },
        ]}
      />
    </Layout>
  );
}
