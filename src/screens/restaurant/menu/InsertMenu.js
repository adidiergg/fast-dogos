import React, { useState } from 'react';
import {
    ScrollView,
  Text,
  TextInput,
  View,
  Alert,
  TouchableOpacity,
} from 'react-native';
import { styles } from '../../../../assets/css/style';
import { constans } from '../../../constants';


const InsertMenu = () => {

    const [nombre,setNombre] = useState("")
    const [descripcion,setDescripcion] = useState("")
    const [precio,setPrecio] = useState("")
    const [imagen,setImagen] = useState("")



    const add = () => {
      var http = new XMLHttpRequest();
      var url = constans.url_api+"/menu";
      var params = 'nombre='+nombre+'&descripcion='+descripcion+'&precio='+precio+'&imagen='+imagen;
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
          <View>
            <Text style={styles.field}>Nombre:</Text>
            <TextInput style={styles.input}  
            onChangeText={(nombre) => setNombre(nombre)} ></TextInput>

            <Text style={styles.field}>Descripcion:</Text>
            <TextInput multiline={true} style={styles.input} 
            onChangeText={(descripcion) => setDescripcion(descripcion)}  
            ></TextInput>

            <Text style={styles.field}>Precio:</Text>
            <TextInput style={styles.input}  
            onChangeText={(precio) => setPrecio(precio)} 
            keyboardType={'decimal-pad'}
            ></TextInput>

            <Text style={styles.field}>Imagen(URL):</Text>
            <TextInput style={styles.input}  
            onChangeText={(imagen) => setImagen(imagen)}  
            keyboardType={'url'}
            ></TextInput>

            <View  style={styles.btn} >
              <TouchableOpacity onPress={add} style={styles.buttonContainer} activeOpacity={0.8} >
                <Text style={styles.buttonText}  >Agregar</Text>
              </TouchableOpacity>
            </View>
          </View>      
        </ScrollView>
    );
  };


  export default InsertMenu;