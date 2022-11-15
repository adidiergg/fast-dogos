import React from 'react';
import {
    ScrollView,
  Text,
  TextInput,
  View,
  TouchableOpacity,
} from 'react-native';
import { styles } from '../../../assets/css/style';



const Setup = () => {

    return (
        <ScrollView style={styles.container}>
          <View>
            <Text style={styles.field}>Nombre:</Text>
            <TextInput style={styles.input} editable={false}  ></TextInput>
            <Text style={styles.field}>Celular:</Text>
            <TextInput style={styles.input}  editable={false} ></TextInput>

            <View  style={styles.btn} >
              <TouchableOpacity style={styles.buttonContainer} activeOpacity={0.8} >
                <Text style={styles.buttonText}>Editar</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={{marginTop:20}}>
            <Text style={styles.field}>Nueva contraseña:</Text>
            <TextInput style={styles.input} ></TextInput>
            <View  style={styles.btn} >
              <TouchableOpacity style={styles.buttonContainer} activeOpacity={0.8} >
                <Text style={styles.buttonText}>Actualizar contraseña</Text>
            </TouchableOpacity>
          </View>
            
    </View>
            
        </ScrollView>
    );
  };


  export default Setup;