import { Text, View } from 'react-native';

export default function AppHeader({ title }: { title: string }) {
  return (
    <View
      style={{
        width: '100%',
        padding: 16,
        backgroundColor: '#E9D6B8',
        borderBottomWidth: 1,
        borderColor: '#ccc',
      }}
    >
      <Text
        style={{
          fontSize: 20,
          fontWeight: 'bold',
          color: '#121213',
          textAlign: 'center',
        }}
      >
        {title}
      </Text>
    </View>
  );
}

