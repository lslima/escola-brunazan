import { TextInput } from 'react-native';

export default function TextField({
  placeholder,
  value,
  onChangeText,
}: {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
}) {
  return (
    <TextInput
      placeholder={placeholder}
      value={value}
      onChangeText={onChangeText}
      style={{
        width: '80%',
        paddingVertical: 10,
        paddingHorizontal: 16,
        borderWidth: 1,
        borderColor: '#E9D6B8',
        borderRadius: 8,
        backgroundColor: '#FFFBF5',
        color: '#121213',
        fontSize: 16,
      }}
      placeholderTextColor="#888"
    />
  );
}
