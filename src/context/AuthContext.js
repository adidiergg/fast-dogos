
import * as React from 'react';
import {Alert} from 'react-native';
import { constans } from '../constants';

const AuthContext = React.createContext();


const AuthProvider = ({children}) => {

    const reducer = (prevState, action) => {
        switch (action.type) {
          case 'SIGN_IN':
            console.log(prevState)
            return {
              ...prevState,
              user:action.user,
              role:action.role,
            };
          case 'SIGN_OUT':
            return {
              ...prevState,
              user:'',
              role:'INVITADO',
            };
        }
      }


      const [state, dispatch] = React.useReducer(reducer
        ,
        {
          user: '',
          role:'INVITADO',
          isLogged: false,
        }
      );


      const authContext = React.useMemo(
        () => ({
          signIn: async ({usuario,password}) => {
            var http = new XMLHttpRequest();
            var url = constans.url_api+"/auth";
            var params = 'usuario='+usuario+'&password='+password;
            http.open('POST', url, true);
            //Send the proper header information along with the request
            http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
            http.onreadystatechange = function() {//Call a function when the state changes.
                if(http.readyState == 4 && http.status == 200) {
                    datos = JSON.parse(http.responseText);
                    dispatch({ type: 'SIGN_IN', user: datos.id , role:datos.role});
                    
                }
        
                if(http.readyState == 4 && http.status == 400) {
                  Alert.alert("Error",http.responseText);
                }
        
        
            }
            http.send(params);




            /*
                console.log(usuario,password)
                var xhttp = new XMLHttpRequest();
                xhttp.onreadystatechange = function() {
                    if (this.readyState == 4 && this.status == 200) {
                      response = xhttp.responseText;
                      if(response==='0'){
                        Alert.alert("Error","No se iniciar sesión");
                      }else{
                        
                        datos = JSON.parse(response);
                        role = datos[0].role;
                        user = datos[1];
                        dispatch({ type: 'SIGN_IN', user: user , role:role});
                        
                      }
                    }
                };
                xhttp.open("GET", "https://imnotame.000webhostapp.com/dogos/signin.php?celular="+usuario+"&pass="+password, true);
                xhttp.send();
            */
            /*
            if (celular==='3310817155' &&  password==='1234' ){
              dispatch({ type: 'SIGN_IN', user: 'cliente' , role:1});
            }*/
            
          },
          signOut: () => dispatch({ type: 'SIGN_OUT' }),
          signUp: async ({celular,password}) => {
            console.log('cerrar sesion');
            dispatch({ type: 'SIGN_IN', user: 'dummy-auth-token' , role:3 });
          },
          role:state.role,
        }),
        [state]
    );


    return (
        <AuthContext.Provider value={authContext}>{children}</AuthContext.Provider>
    );    




}

export {AuthProvider,AuthContext}


