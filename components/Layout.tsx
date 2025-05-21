import { ReactNode } from 'react';
import { SafeAreaView, ScrollView, Text, View } from 'react-native';
import { colors } from '../config/theme';

type Props = {
  title: string;
  children: ReactNode;
};

export default function Layout({ title, children }: Props) {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <View style={{ padding: 16 }}>
        <Text
          style={{
            color: colors.text,
            fontSize: 22,
            fontWeight: 'bold',
            marginBottom: 16,
          }}
        >
          {title}
        </Text>
      </View>
      <ScrollView
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 120 }}
      >
        {children}
      </ScrollView>
    </SafeAreaView>
  );
}
