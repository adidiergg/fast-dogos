import React ,{useState,useContext,} from 'react';
import {
    ScrollView,
    Alert,
  Text,
  TextInput,
  View,
  TouchableOpacity,
} from 'react-native';
import { styles } from '../../../assets/css/style';
import { useIsFocused } from '@react-navigation/native';
import { constans } from '../../constants';
import { AuthContext } from '../../context/AuthContext';


const EditClient = ({navigation,route}) => {

    const {user} = useContext(AuthContext);

    const [usuario,setUsuario] = useState("");
    const [nombre,setNombre] = useState("");
    const [celular,setCelular] = useState("");

    const fetchUser = () => {
      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
          if (this.readyState == 4 && this.status == 200) {
          datos = JSON.parse(xhttp.responseText);
          setUsuario(datos.usuario);
          setNombre(datos.nombre);
          setCelular(datos.celular);
              
          }
      };
      xhttp.open("GET", constans.url_api+"/user/"+user, true);
      xhttp.send();
    }

    React.useEffect(() => {
        fetchUser();
    },[]);


    const update = () =>{
      var http = new XMLHttpRequest();
      var url = constans.url_api+"/user/"+user;
      var params = 'usuario='+usuario+'&nombre='+nombre+'&celular='+celular;
      http.open('PUT', url, true);
      //Send the proper header information along with the request
      http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
      http.onreadystatechange = function() {//Call a function when the state changes.
          if(http.readyState == 4 && http.status == 200) {
            Alert.alert("Ok",http.responseText);
            fetchUser();
          }
  
          if(http.readyState == 4 && http.status == 400) {
            Alert.alert("Error",http.responseText);
            fetchUser();
          }
  
  
      }
      http.send(params);
    }

    return (
        <ScrollView style={styles.container}>
          <View>
          <Text style={styles.field}>Usuario:</Text>
            <TextInput value={usuario} 
            style={styles.input}
            onChangeText={(usuario) => setUsuario(usuario)}
            ></TextInput>

            <Text style={styles.field}>Nombre:</Text>
            <TextInput value={nombre} 
            style={styles.input}
            onChangeText={(nombre) => setNombre(nombre)}
            ></TextInput>
            <Text style={styles.field}>Celular:</Text>
            <TextInput value={celular}  
            style={styles.input}
            onChangeText={(celular) => setCelular(celular)}
            ></TextInput>

            <View  style={styles.btn} >
              <TouchableOpacity onPress={update} style={styles.buttonContainer} activeOpacity={0.8} >
                <Text style={styles.buttonText}>Actualizar</Text>
              </TouchableOpacity>
            </View>
          </View>
          
          
            
        </ScrollView>
    );
  };


  export default EditClient;