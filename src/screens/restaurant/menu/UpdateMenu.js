import React, { useState } from 'react';
import {
    ScrollView,
  Text,
  TextInput,
  View,
  TouchableOpacity,
} from 'react-native';
import { styles } from '../../../../assets/css/style';



const UpdateMenu = ({navigation,route}) => {

    const [nombre,setNombre] = useState("")
    const [descripcion,setDescripcion] = useState("")
    const [precio,setPrecio] = useState("")
    const [imagen,setImagen] = useState("")


    React.useEffect(() => {
        console.log("hora");
        const {id} = route.params;
        console.log(id);
        setNombre("id");
    },[]);

    
    return (
        <ScrollView style={styles.container}>
          <View>
            <Text style={styles.field}>Nombre:</Text>
            <TextInput value={nombre} style={styles.input}  
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
              <TouchableOpacity style={styles.buttonContainer} activeOpacity={0.8} >
                <Text style={styles.buttonText}  >Actualizar</Text>
              </TouchableOpacity>
            </View>
          </View>      
        </ScrollView>
    );
  };


  export default UpdateMenu;