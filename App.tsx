import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Home from './screens/Home';
import Chefslogin from './screens/Chefslogin';
import Chefsmenu from './screens/Chefsmenu';
import fullMenu from './screens/fullMenu';
import reserve from './screens/reserve';

const Stack = createStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home'>
        <Stack.Screen name='Home' component={Home} options={{ headerShown: false }} />
        <Stack.Screen name='Login' component={Chefslogin} options={{ headerShown: true }} />
        <Stack.Screen name='CFmenu' component={Chefsmenu} options={{ headerShown: true }} />
        <Stack.Screen name='fullMenu' component={fullMenu} options={{ headerShown: true }} />
        <Stack.Screen name='reserve' component={reserve}  options={{ headerShown: true }} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
