import React, { useState } from 'react';
import {
  Text,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Login from './Login';
import Register from './Register';
import SimpleLineIcons from 'react-native-vector-icons/FontAwesome';
import MenuClient from './client/MenuClient'
import OrdersClient from './client/OrdersClient';
import CartClient from './client/CartClient';
import OrdersDelively from './delively/OrdersDelively';
import OrdersRestaurant from './restaurant/OrdersRestaurant';

const Stack = createNativeStackNavigator();


const Tab = createBottomTabNavigator();

function Home() {
    return (
      <Tab.Navigator  screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'login') {
            iconName = focused
              ? 'icon-login'
              : 'icon-login';
          } else if (route.name === 'register') {
            iconName = focused ? 'icon-login' : 'icon-login';
          }

          // You can return any component that you like here!
          return <SimpleLineIcons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
      })}
      >
        <Tab.Screen  name="login" component={Login} />
        <Tab.Screen  name="register" component={Register} />
        <Tab.Screen  name="menuClient" component={MenuClient} />
        <Tab.Screen  name="ordersClient" component={OrdersClient} />
        <Tab.Screen  name="cartClient" component={CartClient} />
        <Tab.Screen  name="ordersDelively" component={OrdersDelively} />
        <Tab.Screen  name="ordersRestaurant" component={OrdersRestaurant} />

      </Tab.Navigator>
    );
}

const Menu = () => {

    const {isLogged,setIsLogged} = useState(0);



    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
                <Stack.Screen name="login" component={Login} options={{ title: 'Iniciar sesión' }} />
                <Stack.Screen name="register" component={Register} options={{ title: 'Registrar cuenta' }} />
           
            </Stack.Navigator>
        </NavigationContainer>
    );
  };


  export default Menu;