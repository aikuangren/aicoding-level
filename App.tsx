import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { View, Text, StyleSheet } from 'react-native';

// 导入页面组件
import { HomeScreen } from './src/screens/home/HomeScreen';
import { MapScreen } from './src/screens/game/MapScreen';
import { QuizScreen } from './src/screens/game/QuizScreen';

// 导入常量
import { COLORS, TYPOGRAPHY } from './src/utils/constants';
import { MainTabParamList } from './src/types';

const Tab = createBottomTabNavigator<MainTabParamList>();

// 临时的社交和个人页面组件
const SocialScreen: React.FC = () => (
  <View style={styles.placeholderContainer}>
    <Text style={styles.placeholderText}>🏆</Text>
    <Text style={styles.placeholderTitle}>社交排行</Text>
    <Text style={styles.placeholderSubtitle}>排行榜和好友功能开发中...</Text>
  </View>
);

const ProfileScreen: React.FC = () => (
  <View style={styles.placeholderContainer}>
    <Text style={styles.placeholderText}>👤</Text>
    <Text style={styles.placeholderTitle}>个人中心</Text>
    <Text style={styles.placeholderSubtitle}>个人资料和设置功能开发中...</Text>
  </View>
);

const App: React.FC = () => {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconText = '';
              
              switch (route.name) {
                case 'Home':
                  iconText = '🏠';
                  break;
                case 'Map':
                  iconText = '🗺️';
                  break;
                case 'Social':
                  iconText = '🏆';
                  break;
                case 'Profile':
                  iconText = '👤';
                  break;
              }
              
              return (
                <Text style={[
                  styles.tabIcon,
                  { 
                    opacity: focused ? 1 : 0.6,
                    transform: [{ scale: focused ? 1.1 : 1 }],
                  }
                ]}>
                  {iconText}
                </Text>
              );
            },
            tabBarActiveTintColor: COLORS.primary,
            tabBarInactiveTintColor: COLORS.text.secondary,
            tabBarStyle: {
              backgroundColor: COLORS.background.primary,
              borderTopColor: COLORS.background.secondary,
              height: 83,
              paddingBottom: 8,
              paddingTop: 8,
            },
            tabBarLabelStyle: {
              ...TYPOGRAPHY.small,
              fontWeight: '600',
            },
            headerShown: false,
          })}
        >
          <Tab.Screen 
            name="Home" 
            component={HomeScreen}
            options={{ title: '首页' }}
          />
          <Tab.Screen 
            name="Map" 
            component={MapScreen}
            options={{ title: '关卡' }}
          />
          <Tab.Screen 
            name="Social" 
            component={SocialScreen}
            options={{ title: '排行' }}
          />
          <Tab.Screen 
            name="Profile" 
            component={ProfileScreen}
            options={{ title: '我的' }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  tabIcon: {
    fontSize: 24,
  },
  
  placeholderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.background.secondary,
    padding: 32,
  },
  
  placeholderText: {
    fontSize: 80,
    marginBottom: 16,
  },
  
  placeholderTitle: {
    ...TYPOGRAPHY.title2,
    color: COLORS.text.primary,
    marginBottom: 8,
  },
  
  placeholderSubtitle: {
    ...TYPOGRAPHY.body,
    color: COLORS.text.secondary,
    textAlign: 'center',
  },
});

export default App;