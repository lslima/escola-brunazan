import { useRouter } from 'expo-router';
import PrimaryButton from './PrimaryButton';

export default function HomeButton() {
  const router = useRouter();

  return (
    <PrimaryButton
      title="🏠 Voltar para Home"
      onPress={() => router.push('/home')}
    />
  );
}
