import { StyleSheet } from 'react-native';
import { Text } from 'react-native';
import { MainLayout } from '../../layouts/main';

/**
 * Вкладка вторая ----------------
 */
export default function SettingsTab() {
  return (
    <MainLayout>
      <Text style={styles.title}>Tab Two</Text>
    </MainLayout>
  );
}

/**
 * Стили ----------------
 */
const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
