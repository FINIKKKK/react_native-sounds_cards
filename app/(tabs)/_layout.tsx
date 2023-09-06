import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link, Tabs } from 'expo-router';
import { Pressable, useColorScheme } from 'react-native';
import { Icon } from '../../components/UI/Icon';
import { MainLayout } from '../../layouts/main';
import { StatusBar } from 'expo-status-bar';

/**
 * Шаблон для страниц вкладок ----------------
 */
export default function TabLayout() {
  return (
    <>
      <StatusBar />

      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarStyle: {
            height: 65,
          },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            tabBarIcon: ({ color }) => (
              <Icon name="home" size={27} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="two"
          options={{
            tabBarIcon: ({ color }) => (
              <Icon name="cog" size={27} color={color} />
            ),
          }}
        />
      </Tabs>
    </>
  );
}
