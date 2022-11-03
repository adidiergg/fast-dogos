import React from 'react';
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
import TabMenu from './TabMenu';


const Login = () => {

    const SignIn = () => {

    }
    return (
        <ScrollView style={styles.container}>

          
            <Text style={styles.title} >Fast dogos</Text>     
            <Image  style={styles.logo} source={require("../../img/logo.png")}></Image>

            
            <TextInput  style={styles.input}
            placeholder="Usuario"
            ></TextInput>

            <TextInput  style={styles.input}
            placeholder="Contraseña"
            
            ></TextInput>


            <View  style={styles.btn} >
                <TouchableOpacity style={styles.buttonContainer} activeOpacity={0.8} onPress={SignIn}>
                    <Text style={styles.buttonText}>Entrar</Text>
                </TouchableOpacity>
            </View>


            
        </ScrollView>
      
    );
  };





  const styles = StyleSheet.create({
    container:{
        backgroundColor:"#FCDC8B",
        padding:10,
        color:"#000"
    },
    buttonContainer: {
      marginTop:15,
      elevation: 8,
      backgroundColor: "#A60703",
      borderRadius: 10,
      paddingVertical: 15,
      paddingHorizontal: 12
    },
    buttonText: {
      fontSize: 18,
      color: "#fff",
      fontWeight: "bold",
      alignSelf: "center",
      textTransform: "uppercase"
    },
      
      title:{
          fontSize:40,
          color:"white",
          textAlign:"center",
      },
      logo:{
          height:250,
          width:250,
          //marginLeft:150,
          resizeMode:"contain",
          alignSelf:'center',
          
          
      },
      input:{
          borderWidth:1,
          fontSize:30,
          backgroundColor:"#fff",
          marginTop:20,
          
          borderColor: "#FCDC8B",
          borderRadius: 10,
          
      },
    });

export default Login;
