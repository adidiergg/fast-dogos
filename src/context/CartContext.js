
import * as React from 'react';
import {Alert} from 'react-native';
import { constans } from '../constants';

const CartContext = React.createContext();


const CartProvider = ({children}) => {

    const reducer = (prevState, action) => {
        switch (action.type) {
          case 'ADD':
            console.log(prevState)
            return {
              ...prevState,
              position: prevState.position+1,
              carrito:  [...prevState.carrito, { position:prevState.position,id:action.id,cantidad:action.cantidad } ]
            };
          case 'REMOVE':
            console.log(prevState)
            return {
              ...prevState,
              carrito: prevState.carrito.filter(producto => producto.position !== action.position)
            };

          case 'RESET':
            console.log(prevState)
            return {
                ...prevState,
                carrito: [],
            };
        }
      }


      const [state, dispatch] = React.useReducer(reducer
        ,
        {
          position:1,
          carrito: [],
        }
      );


      const cartContext = React.useMemo(
        () => ({
          push: async ({id,cantidad}) => {
            console.log('añadir');
            dispatch({ type: 'ADD', id: id , cantidad:Number(cantidad) });
          },
          pop: async ({position}) => {
            console.log('eliminar');
            dispatch({ type: 'REMOVE', position: position });
          },
          reset: async () => {
            console.log('reiniciar');
            dispatch({ type: 'RESET' });
          },
          carrito:state.carrito,
        }),
        [state]
    );


    return (
        <CartContext.Provider value={cartContext}>{children}</CartContext.Provider>
    );    




}

export {CartProvider,CartContext}


