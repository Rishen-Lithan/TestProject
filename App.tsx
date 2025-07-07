import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Auth Components
import WelcomeScreen from './src/screens/auth/WelcomeScreen';
import Signup from './src/screens/auth/Signup';
import UserProfile from './src/screens/auth/UserProfile';
import Login from './src/screens/auth/Login';

// Other Components
import OrderHistory from './src/screens/components/OrderHistory';
import RoomDetailsScreen from './src/screens/components/RoomDetailsScreen';
import RoomsScreen from './src/screens/components/RoomsScreen';
import InfoScreen from './src/screens/components/InfoScreen';

// Main Navigator
import MainNavigator from './src/navigation/MainNavigator';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="WelcomeScreen" screenOptions={{ headerShown: false }}>
        <Stack.Screen name='WelcomeScreen' component={WelcomeScreen} />
        <Stack.Screen name='Signup' component={Signup} />
        <Stack.Screen name='Login' component={Login} />
        <Stack.Screen name='UserProfile' component={UserProfile} />
        <Stack.Screen name='OrderHistory' component={OrderHistory} />
        <Stack.Screen name='RoomDetailsScreen' component={RoomDetailsScreen} />
        <Stack.Screen name='RoomsScreen' component={RoomsScreen} />
        <Stack.Screen name='InfoScreen' component={InfoScreen} />
        <Stack.Screen name='MainNavigator' component={MainNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
