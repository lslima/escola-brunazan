import { useRouter } from 'expo-router';
import { Platform, Text, TouchableOpacity, View } from 'react-native';
import { colors } from '../config/theme';

type Props = {
  items: { label: string; route: string }[];
};

export default function BottomNav({ items }: Props) {
  const router = useRouter();

  return (
    <View
      style={{
        position: Platform.OS === 'web' ? 'fixed' : 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: colors.navbar,
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingVertical: 12,
        borderTopWidth: 1,
        borderTopColor: '#333',
        zIndex: 100,
      }}
    >
      {items.map((item) => (
        <TouchableOpacity key={item.route} onPress={() => router.push(item.route)}>
          <Text style={{ color: colors.text, fontWeight: '500' }}>{item.label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}
