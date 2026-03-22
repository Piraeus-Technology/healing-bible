import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { useColors, fonts } from './src/utils/theme';
import { useThemeStore } from './src/store/themeStore';

import BibleScreen from './src/screens/BibleScreen';
import ChapterSelectScreen from './src/screens/ChapterSelectScreen';
import ChapterScreen from './src/screens/ChapterScreen';
import SearchScreen from './src/screens/SearchScreen';
import HealingScreen from './src/screens/HealingScreen';
import BookmarkScreen from './src/screens/BookmarkScreen';
import MoreScreen from './src/screens/MoreScreen';

const BibleStack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function BibleStackNavigator() {
  const colors = useColors();

  return (
    <BibleStack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: colors.card },
        headerTintColor: colors.textPrimary,
        headerTitleStyle: { fontWeight: fonts.weights.bold, color: colors.textPrimary },
        headerShadowVisible: false,
        contentStyle: { backgroundColor: colors.bg },
      }}
    >
      <BibleStack.Screen
        name="BibleHome"
        component={BibleScreen}
        options={{ headerShown: false }}
      />
      <BibleStack.Screen
        name="ChapterSelect"
        component={ChapterSelectScreen}
        options={{ title: '' }}
      />
      <BibleStack.Screen
        name="Chapter"
        component={ChapterScreen}
        options={{ title: '' }}
      />
    </BibleStack.Navigator>
  );
}

function TabNavigator() {
  const colors = useColors();

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textMuted,
        tabBarStyle: { backgroundColor: colors.card, borderTopColor: colors.border },
        tabBarLabelStyle: { fontSize: 11, fontWeight: fonts.weights.medium },
        headerStyle: { backgroundColor: colors.card },
        headerTintColor: colors.textPrimary,
        headerTitleStyle: { fontWeight: fonts.weights.bold, color: colors.textPrimary },
        headerShadowVisible: false,
      }}
    >
      <Tab.Screen
        name="성경"
        component={BibleStackNavigator}
        options={{
          headerShown: false,
          title: '성경',
          tabBarIcon: ({ color, size }) => <Ionicons name="book-outline" size={size} color={color} />,
        }}
      />
      <Tab.Screen
        name="검색"
        component={SearchScreen}
        options={{
          title: '검색',
          tabBarIcon: ({ color, size }) => <Ionicons name="search-outline" size={size} color={color} />,
        }}
      />
      <Tab.Screen
        name="힐링"
        component={HealingScreen}
        options={{
          title: '힐링',
          tabBarIcon: ({ color, size }) => <Ionicons name="heart-outline" size={size} color={color} />,
        }}
      />
      <Tab.Screen
        name="책갈피"
        component={BookmarkScreen}
        options={{
          title: '책갈피',
          tabBarIcon: ({ color, size }) => <Ionicons name="bookmark-outline" size={size} color={color} />,
        }}
      />
      <Tab.Screen
        name="더보기"
        component={MoreScreen}
        options={{
          title: '더보기',
          tabBarIcon: ({ color, size }) => <Ionicons name="ellipsis-horizontal" size={size} color={color} />,
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  const { loadTheme } = useThemeStore();
  const isDark = useThemeStore((s) => s.isDark);

  useEffect(() => {
    loadTheme();
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <StatusBar style={isDark ? 'light' : 'dark'} />
        <TabNavigator />
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}
