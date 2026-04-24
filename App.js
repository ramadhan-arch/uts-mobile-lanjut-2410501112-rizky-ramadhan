import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { BookProvider } from './src/context/BookContext';

import HomeScreen from './src/screens/HomeScreen';
import DetailScreen from './src/screens/DetailScreen';
import FavoritesScreen from './src/screens/FavoritesScreen';
import SearchScreen from './src/screens/SearchScreen';
import AboutScreen from './src/screens/AboutScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="Home" 
        component={HomeScreen}
        options={{ title: 'BookShelf' }}
      />
      <Stack.Screen 
        name="Detail" 
        component={DetailScreen}
        options={{ title: 'Detail Buku' }}
      />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <BookProvider>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={{
            tabBarActiveTintColor: '#2563EB',
            tabBarInactiveTintColor: '#64748B',
          }}
        >
          <Tab.Screen 
            name="HomeTab" 
            component={HomeStack}
            options={{ 
              title: 'Home',
              headerShown: false 
            }}
          />
          <Tab.Screen 
            name="Favorites" 
            component={FavoritesScreen}
            options={{ title: 'Favorit' }}
          />
          <Tab.Screen 
            name="Search" 
            component={SearchScreen}
            options={{ title: 'Cari' }}
          />
          <Tab.Screen 
            name="About" 
            component={AboutScreen}
            options={{ title: 'About' }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </BookProvider>
  );
}