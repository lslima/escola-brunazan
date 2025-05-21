import { useState } from 'react';
import { FlatList, Modal, Text, TouchableOpacity, View } from 'react-native';
import { colors } from '../config/theme';

type Option = {
  label: string;
  value: string;
};

type Props = {
  label: string;
  options: Option[];
  selectedValue: string;
  onValueChange: (value: string) => void;
};

export default function Dropdown({
  label,
  options,
  selectedValue,
  onValueChange,
}: Props) {
  const [modalVisible, setModalVisible] = useState(false);

  const selectedLabel =
    options.find((opt) => opt.value === selectedValue)?.label || 'Selecione';

  return (
    <View style={{ marginBottom: 12 }}>
      <Text style={{ marginBottom: 4, color: colors.text }}>{label}</Text>

      <TouchableOpacity
        style={{
          borderWidth: 1,
          borderColor: colors.border,
          borderRadius: 8,
          padding: 8,
          backgroundColor: colors.background,
        }}
        onPress={() => setModalVisible(true)}
      >
        <Text style={{ color: colors.text }}>{selectedLabel}</Text>
      </TouchableOpacity>

      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableOpacity
          style={{
            flex: 1,
            backgroundColor: 'rgba(0,0,0,0.3)',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={() => setModalVisible(false)}
          activeOpacity={1}
        >
          <View
            style={{
              backgroundColor: colors.cardBackground,
              borderRadius: 12,
              padding: 16,
              width: '80%',
              maxHeight: '60%',
            }}
          >
            <FlatList
              data={options}
              keyExtractor={(item) => item.value}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={{
                    paddingVertical: 12,
                    borderBottomWidth: 1,
                    borderBottomColor: '#eee',
                  }}
                  onPress={() => {
                    onValueChange(item.value);
                    setModalVisible(false);
                  }}
                >
                  <Text style={{ color: colors.textInverted }}>{item.label}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}
