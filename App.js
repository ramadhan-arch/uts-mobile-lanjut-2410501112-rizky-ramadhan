import { Ionicons } from '@expo/vector-icons';
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
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;

              if (route.name === 'HomeTab') {
                iconName = focused ? 'home' : 'home-outline';
              } else if (route.name === 'Favorites') {
                iconName = focused ? 'heart' : 'heart-outline';
              } else if (route.name === 'Search') {
                iconName = focused ? 'search' : 'search-outline';
              } else if (route.name === 'About') {
                iconName = focused ? 'person' : 'person-outline';
              }

              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: '#2563EB',
            tabBarInactiveTintColor: '#64748B',
          })}
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