import { StyleSheet } from 'react-native';
import { Text } from '../../components/Themed';
import { MainLayout } from '../../layouts/main';

/**
 * Вкладка первая ----------------
 */
export default function HomeTab() {
  return (
    <MainLayout>
      <Text style={styles.title}>Tab One</Text>
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
