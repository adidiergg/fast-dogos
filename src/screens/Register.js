import React, { useContext } from 'react';
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




const Register = () => {

  const {signUp,role} = useContext(AuthContext);

  return (

        

    <ScrollView style={styles.container}>
        
            
               
            

            <View style={{padding:30}}>
              <Image  style={styles.logo} source={require("../../assets/img/logo.png")}></Image>
              <Text style={styles.title} >Fast dogos</Text>  
              

              <TextInput  style={styles.input}
              placeholder="Nombre"
              ></TextInput>

              <TextInput  style={styles.input}
              placeholder="Celular"
              ></TextInput>

              <TextInput  style={styles.input}
              placeholder="Contraseña"
              
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