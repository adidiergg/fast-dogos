import React, { useState ,useContext} from 'react';
import {
  Text,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Login from './Login';
import Register from './Register';
import SimpleLineIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MenuClient from './client/MenuClient'
import OrdersClient from './client/OrdersClient';
import CartClient from './client/CartClient';
import OrdersDelively from './delively/OrdersDelively';
import OrdersRestaurant from './restaurant/OrdersRestaurant';
import { AuthContext } from '../context/AuthContext';
import IndexRestaurant from './restaurant/menu/IndexMenu';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Setup from './client/Setup';
import InsertMenu from './restaurant/menu/InsertMenu';
import UpdateMenu from './restaurant/menu/UpdateMenu';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();





function Home() {


    const {role} = useContext(AuthContext);

    return (
      <Tab.Navigator  screenOptions={({ route }) => ({
        
        tabBarStyle: {
          backgroundColor: '#A60703',
        },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'login') {
            iconName = focused
              ? 'login-variant'
              : 'login-variant';
          } else if (route.name === 'register') {
            iconName = focused ? 'account-plus-outline' : 'account-plus-outline';
          } else if (route.name === 'menuClient') {
            iconName = focused ? 'silverware' : 'silverware';
          } else if (route.name === 'cartClient') {
            iconName = focused ? 'cart' : 'cart';
          } else if (route.name === 'setup') {
            iconName = focused ? 'account-cog' : 'account-cog';
          } else if (route.name === 'ordersClient') {
            iconName = focused ? 'food-hot-dog' : 'food-hot-dog';
          } else if (route.name === 'ordersDelively') {
            iconName = focused ? 'wallet-travel' : 'wallet-travel';
          } else if (route.name === 'ordersRestaurant') {
            iconName = focused ? 'wallet-travel' : 'wallet-travel';
          } else if (route.name === 'indexRestaurant') {
            iconName = focused ? 'silverware' : 'silverware';
          }

          // You can return any component that you like here!
          return <SimpleLineIcons name={iconName} size={35} color={color} />;
        },
        tabBarActiveTintColor: '#FCDC8B',
        tabBarInactiveTintColor: '#F2F2F2',
        tabBarShowLabel:false,
      })}

      
      
      >

        {
          role==='0' ? 
            <>
              <Tab.Screen  name="login" component={Login} options={{
              title: 'Iniciar sesión',
              headerStyle: {
                
                backgroundColor: '#A60703',
              },
              headerTitleAlign:'center',
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontFamily:'LilyScriptOne-Regular',
                
              },
              }}  />
              <Tab.Screen  name="register" component={Register} options={{
              title: 'Registro',
              headerStyle: {
                
                backgroundColor: '#A60703',
              },
              headerTitleAlign:'center',
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontFamily:'LilyScriptOne-Regular',
                
              },
              }} />
            </>: 
            
              null
            

        }

        {
          role==='1' ? 
            <>
              <Tab.Screen  name="menuClient" options={{
              title: 'Menú',
              headerStyle: {
                
                backgroundColor: '#A60703',
              },
              headerTitleAlign:'center',
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontFamily:'LilyScriptOne-Regular',
                
              },
              }} 
              component={MenuClient} />
              <Tab.Screen  name="cartClient" options={{
              title: 'Carrito',
              headerStyle: {
                
                backgroundColor: '#A60703',
              },
              headerTitleAlign:'center',
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontFamily:'LilyScriptOne-Regular',
                
              },
              }}  component={CartClient}  />
              <Tab.Screen  name="ordersClient"  options={{
              title: 'Pedidos',
              headerStyle: {
                
                backgroundColor: '#A60703',
              },
              headerTitleAlign:'center',
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontFamily:'LilyScriptOne-Regular',
                
              },
              }}  component={OrdersClient} />
              <Tab.Screen  name="setup" options={{
              title: 'Configuración',
              headerStyle: {
                
                backgroundColor: '#A60703',
              },
              headerTitleAlign:'center',
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontFamily:'LilyScriptOne-Regular',
                
              },
              }}  component={Setup} />


            </>: 
            null
        }

        {
        role==='2' ? 
            <>
              <Tab.Screen  name="ordersDelively" options={{
              title: 'Entregas',
              headerStyle: {
                
                backgroundColor: '#A60703',
              },
              headerTitleAlign:'center',
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontFamily:'LilyScriptOne-Regular',
                
              },
              }}  component={OrdersDelively} />
            </>: 
            null
        }

        {
        role==='3' ? 
            <>
              <Tab.Screen  name="ordersRestaurant" options={{
              title: 'Pedidos',
              headerStyle: {
                
                backgroundColor: '#A60703',
              },
              headerTitleAlign:'center',
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontFamily:'LilyScriptOne-Regular',
                
              },
              }} component={OrdersRestaurant} />
              <Tab.Screen  name="indexRestaurant" options={{
              title: 'Menú',
              headerStyle: {
                
                backgroundColor: '#A60703',
              },
              headerTitleAlign:'center',
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontFamily:'LilyScriptOne-Regular',
                
              },
              }} component={IndexRestaurant} />
            </>: 
            null
        }
       
        

      </Tab.Navigator>
    );
}



const Menu = () => {

    const {role} = useContext(AuthContext);
    


    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
                
                {
                role==='0' ? 
                  <>
                  
                  </>: 
                  null
                }

                {
                role==='1' ? 
                  <>
                  
                  </>: 
                  null
                }

                {
                role==='2' ? 
                  <>
                  
                  </>: 
                  null
                }

                {
                role==='3' ? 
                  <>

                    
                    <Stack.Screen name="insertMenu" component={InsertMenu} 
                    options={{
                      title: 'Añadir dogo',
                      headerStyle: {
                        
                        backgroundColor: '#A60703',
                      },
                      headerTitleAlign:'center',
                      headerTintColor: '#fff',
                      headerTitleStyle: {
                        fontFamily:'LilyScriptOne-Regular',
                        
                      },
                      }} 
                    />

                    <Stack.Screen name="updateMenu" component={UpdateMenu} 
                    options={{
                      title: 'Editar dogo',
                      headerStyle: {
                        
                        backgroundColor: '#A60703',
                      },
                      headerTitleAlign:'center',
                      headerTintColor: '#fff',
                      headerTitleStyle: {
                        fontFamily:'LilyScriptOne-Regular',
                        
                      },
                      }} 
                    />
                  
                  </>: 
                  null
                }



            </Stack.Navigator>
        </NavigationContainer>
    );
  };


  export default Menu;