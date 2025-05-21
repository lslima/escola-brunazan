import { Text, TouchableOpacity } from 'react-native';
import { colors } from '../config/theme';

type Props = {
  title: string;
  onPress: () => void;
};

export default function PrimaryButton({ title, onPress }: Props) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        backgroundColor: '#000000', // Preto acinzentado
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: 8,
        borderWidth: 1,
        borderColor: colors.border, // Detalhe opcional
      }}
    >
      <Text style={{ color: colors.text, fontWeight: 'bold' }}>{title}</Text>
    </TouchableOpacity>
  );
}
