import React, { useContext, useState } from 'react';
import {
  SafeAreaView,
  Alert,
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
import { constans } from '../constants';



const Register = () => {

  //const {signUp,role} = useContext(AuthContext);
  const [usuario,setUsuario] = useState("");
  const [nombre,setNombre] = useState("");
  const [celular,setCelular] = useState("");
  const [password,setPassword] = useState("");

  const signUp = () => {
    var http = new XMLHttpRequest();
    var url = constans.url_api+"/user";
    var params = 'usuario='+usuario+'&nombre='+nombre+'&celular='+celular+'&password='+password;
    http.open('POST', url, true);
    //Send the proper header information along with the request
    http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    http.onreadystatechange = function() {//Call a function when the state changes.
        if(http.readyState == 4 && http.status == 200) {
          Alert.alert("Ok",http.responseText);
        }

        if(http.readyState == 4 && http.status == 400) {
          Alert.alert("Error",http.responseText);
        }


    }
    http.send(params);
  }

  return (


    <ScrollView style={styles.container}>
        
            <View style={{padding:30}}>
              <Image  style={styles.logo} source={require("../../assets/img/logo.png")}></Image>
              <Text style={styles.title} >Fast dogos</Text>  
              

              <TextInput  style={styles.input}
              placeholder="Usuario"
              onChangeText={(usuario) => setUsuario(usuario)}
              ></TextInput>

              <TextInput  style={styles.input}
              placeholder="Nombre"
              onChangeText={(nombre) => setNombre(nombre)}
              ></TextInput>

              <TextInput keyboardType='phone-pad' style={styles.input}
              placeholder="Celular"
              onChangeText={(celular) => setCelular(celular)}
              ></TextInput>

              <TextInput secureTextEntry={true}  style={styles.input}
              placeholder="Contraseña"
              onChangeText={(password) => setPassword(password)}
              ></TextInput>


              <View  style={styles.btn} >
                  <TouchableOpacity style={styles.buttonContainer} activeOpacity={0.8} onPress={() => signUp({celular:'3310817155',password:'1234'})}>
                      <Text style={styles.buttonText}>Registrar</Text>
                  </TouchableOpacity>
              </View>
            </View>

        
    </ScrollView>
  
  
);

};


export default Register;