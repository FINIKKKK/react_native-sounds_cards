import React from 'react';
import {
  FlatList,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
} from 'react-native';
import { Icon } from '~components/UI/Icon';
import { blocks, colors } from '~constants';

export interface TItem {
  value: string;
  label: string;
}

interface SelectProps {
  values: TItem[];
  setValue: (item: TItem) => void;
  label?: string;
}

export const Select: React.FC<SelectProps> = (props) => {
  /**
   * Переменные ----------------
   */
  const [activeItem, setActiveItem] = React.useState<TItem>(props.values[0]);
  const [isOpen, setIsOpen] = React.useState(false);

  /**
   * Методы ----------------
   */
  // Установить активный элемент
  const setActive = (item: TItem) => {
    props.setValue(item);
    setActiveItem(item);
    setIsOpen(false);
  };

  return (
    <View style={ss.select}>
      <TouchableOpacity style={ss.field} onPress={() => setIsOpen(!isOpen)}>
        <View style={ss.selected}>
          <Text style={ss.label}>{activeItem.label}</Text>
          <Icon name="sort-down" style={ss.caret} color="#0B55BB" size={20} />
        </View>
      </TouchableOpacity>

      {isOpen && (
        <FlatList
          data={props.values}
          renderItem={({ item }) => (
            <TouchableOpacity style={ss.item} onPress={() => setActive(item)}>
              <Text>{item.label}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.value}
          style={ss.dropdown}
        />
      )}
    </View>
  );
};

const ss = StyleSheet.create({
  select: {},
  field: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: blocks.radius,
    padding: 15,
    marginBottom: 25,
    marginTop: -25,
  },
  icon: {
    marginRight: 24,
  },
  selected: {
    flex: 1,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: {
    fontSize: 18,
  },
  caret: {},
  dropdown: {
    position: 'absolute',
    top: '100%',
    left: 0,
    width: '100%',
    maxHeight: 250,
    backgroundColor: 'rgba(255, 255, 255, 0.99)',
    borderRadius: 2,
    zIndex: 100,
    marginTop: 15,
    shadowColor: 'rgba(0, 0, 0, 0.6)',
    elevation: 7,
  },
  item: {
    paddingVertical: 12,
    paddingHorizontal: 17,
    fontSize: 14,
  },
});
