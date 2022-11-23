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
import { useIsFocused } from '@react-navigation/native';
import { constans } from '../../../constants';


const UpdateMenu = ({navigation,route}) => {

    const [idMenu,setIdMenu] = useState("")
    const [nombre,setNombre] = useState("")
    const [descripcion,setDescripcion] = useState("")
    const [precio,setPrecio] = useState("")
    const [imagen,setImagen] = useState("")


    const update = () => {
      var http = new XMLHttpRequest();
      var url = constans.url_api+"/menu/"+idMenu;
      var params = 'nombre='+nombre+'&descripcion='+descripcion+'&precio='+precio+'&imagen='+imagen;
      http.open('PUT', url, true);
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

    React.useEffect(() => {
        const {id} = route.params;
        
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
              datos = JSON.parse(xhttp.responseText);
              console.log(datos);
              setIdMenu(String(datos.id))
              setNombre(datos.nombre);
              setDescripcion(datos.descripcion);
              setPrecio(String(datos.precio));
              setImagen(datos.imagen);
            }
        };
        xhttp.open("GET", constans.url_api+"/menu/"+id, true);
        xhttp.send();


    },[]);

    
    return (
        <ScrollView style={styles.container}>
          <View>
            <Text  style={styles.field}>ID:</Text>
            <TextInput value={idMenu} style={styles.input}  
            ></TextInput>
            <Text style={styles.field}>Nombre:</Text>
            <TextInput value={nombre} style={styles.input}  
            onChangeText={(nombre) => setNombre(nombre)} ></TextInput>

            <Text style={styles.field}>Descripcion:</Text>
            <TextInput value={descripcion} multiline={true} style={styles.input} 
            onChangeText={(descripcion) => setDescripcion(descripcion)}  
            ></TextInput>

            <Text style={styles.field}>Precio:</Text>
            <TextInput value={precio} style={styles.input}  
            onChangeText={(precio) => setPrecio(precio)} 
            keyboardType={'decimal-pad'}
            ></TextInput>

            <Text style={styles.field}>Imagen(URL):</Text>
            <TextInput  value={imagen} style={styles.input}  
            onChangeText={(imagen) => setImagen(imagen)}  
            keyboardType={'url'}
            ></TextInput>

            <View  style={styles.btn} >
              <TouchableOpacity onPress={update} style={styles.buttonContainer} activeOpacity={0.8} >
                <Text style={styles.buttonText}   >Actualizar</Text>
              </TouchableOpacity>
            </View>
          </View>      
        </ScrollView>
    );
  };


  export default UpdateMenu;