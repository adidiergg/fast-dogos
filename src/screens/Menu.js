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
import { createDrawerNavigator,DrawerContentScrollView,
  DrawerItemList,DrawerItem, } from '@react-navigation/drawer';
import Setup from './client/Setup';
import InsertMenu from './restaurant/menu/InsertMenu';
import UpdateMenu from './restaurant/menu/UpdateMenu';
import AddCart from './client/AddCart';
import EditClient from './client/EditClient';
import OrderClient from './client/OrderClient';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();



function TabMenu() {


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
          role==='INVITADO' ? 
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
          role==='CLIENTE' ? 
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
        role==='REPARTIDOR' ? 
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
        role==='ADMIN' ? 
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




function Home()  {
  const {role} = useContext(AuthContext);
  return (
     

          <Stack.Navigator>
              <Stack.Screen name="TabMenu" component={TabMenu} options={{ headerShown: false }} />
              
              {
              role==='INVITADO' ? 
                <>
                
                </>: 
                null
              }

              {
              role==='CLIENTE' ? 
                <>
                  <Stack.Screen name="addCart" component={AddCart} 
                    options={{
                      title: 'Añadir a carrito',
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

                    <Stack.Screen name="editClient" component={EditClient} 
                    options={{
                      title: 'Editar cliente',
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


                    <Stack.Screen name="orderClient" component={OrderClient} 
                    options={{
                      title: 'Pedido',
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

              {
              role==='REPARTIDOR' ? 
                <>
                
                </>: 
                null
              }

              {
              role==='ADMIN' ? 
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
     
  );
};



const Menu = () => {
    const {role,signOut} = useContext(AuthContext);
    
    return (
        <NavigationContainer>
          {role==='INVITADO' ? 
                <>
                  <Home/>
                </>: 
                <Drawer.Navigator initialRouteName="Home"
                drawerContent={(props) => {
                  const filteredProps = {
                    ...props,
                    state: {
                      ...props.state,
                      routeNames: props.state.routeNames.filter(
                        // To hide single option
                        // (routeName) => routeName !== 'HiddenPage1',
                        // To hide multiple options you can add & condition
                        (routeName) => {
                          routeName !== ''
                          && routeName !== 'HiddenPage2';
                        },
                      ),
                      routes: props.state.routes.filter(
                        (route) =>
                          route.name !== ''
                          && route.name !== 'HiddenPage2',
                      ),
                    },
                  };
                  return (
                    <DrawerContentScrollView {...filteredProps}>
                      <DrawerItemList {...filteredProps} />
                      <DrawerItem label="Logout" onPress={signOut} />
                    </DrawerContentScrollView>
                  );
                }}>





                  <Drawer.Screen name="Home" component={Home} options={{ headerShown: false }}  />
                
                
                
                </Drawer.Navigator>
          }

          
          
        </NavigationContainer>
    );
  };


  export default Menu;