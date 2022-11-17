import React, { useContext, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  TextInput,
  Image,
  TouchableOpacity,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import { AuthContext } from '../context/AuthContext';
import { styles } from '../../assets/css/style';



const Login = () => {

    const {signIn,role} = useContext(AuthContext);

    const [usuario,setUsuario] = useState("");
    const [password,setPassword] = useState("");

    const SignIn = () => {

    }
    return (

        

        <ScrollView style={styles.container}>
            
                
                   
                

                <View style={{padding:30}}>
                  <Image  style={styles.logo} source={require("../../assets/img/logo.png")}></Image>
                  <Text style={styles.title} >Fast dogos</Text>  
                  
                  <TextInput  style={styles.input} onChangeText={(usuario) => setUsuario(usuario) }
                  placeholder="Usuario"
                  ></TextInput>

                  <TextInput  style={styles.input} secureTextEntry={true} onChangeText={(password) => setPassword(password) }
                  placeholder="Contraseña"
                  
                  ></TextInput>


                  <View  style={styles.btn} >
                      <TouchableOpacity style={styles.buttonContainer} activeOpacity={0.8} onPress={() => signIn({usuario:usuario,password:password})}>
                          <Text style={styles.buttonText}>Entrar</Text>
                      </TouchableOpacity>
                  </View>
                </View>

            
        </ScrollView>
      
      
    );
  };





  
export default Login;
