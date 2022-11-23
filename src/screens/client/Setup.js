import React ,{useState,useContext,} from 'react';
import {
    ScrollView,
  Text,
  TextInput,
  View,
  Alert,
  TouchableOpacity,
} from 'react-native';
import { styles } from '../../../assets/css/style';
import { useIsFocused } from '@react-navigation/native';
import { constans } from '../../constants';
import { AuthContext } from '../../context/AuthContext';

const Setup = ({navigation}) => {
  

  const {user} = useContext(AuthContext);
  const isFocused = useIsFocused();
  const [usuario,setUsuario] = useState("");
  const [nombre,setNombre] = useState("");
  const [celular,setCelular] = useState("");
  const [password,setPassword] = useState("");

  const reset = () => {
      if(password !== ""){
        var http = new XMLHttpRequest();
        var url = constans.url_api+"/user/reset/"+user;
        var params = 'password='+password;
        http.open('PUT', url, true);
        //Send the proper header information along with the request
        http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        http.onreadystatechange = function() {//Call a function when the state changes.
            if(http.readyState == 4 && http.status == 200) {
              Alert.alert("Ok",http.responseText);
              setPassword("")
            }
    
            if(http.readyState == 4 && http.status == 400) {
              Alert.alert("Error",http.responseText);
              setPassword("")
            }
    
    
        }
        http.send(params);

      }else{
        Alert.alert("Error","Es necesario ingresar la nueva contraseña");
      }
     
  }

  React.useEffect(() => {
    if (isFocused===true){
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
   
  },[isFocused]);

    return (
        <ScrollView style={styles.container}>
          <View>
          <Text style={styles.field}>Usuario:</Text>
            <TextInput value={usuario} style={styles.input} editable={false}  ></TextInput>
            <Text style={styles.field}>Nombre:</Text>
            <TextInput value={nombre} style={styles.input} editable={false}  ></TextInput>
            <Text style={styles.field}>Celular:</Text>
            <TextInput value={celular}  style={styles.input}  editable={false} ></TextInput>

            <View  style={styles.btn} >
              <TouchableOpacity  style={styles.buttonContainer} 
              activeOpacity={0.8} 
              onPress={() => navigation.navigate("editClient")}
              >
                <Text style={styles.buttonText}>Editar</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={{marginTop:20}}>
            <Text   style={styles.field}>Nueva contraseña:</Text>
            <TextInput value={password} onChangeText={(password) => setPassword(password)} secureTextEntry={true} style={styles.input} ></TextInput>
            <View  style={styles.btn} >
              <TouchableOpacity onPress={reset} style={styles.buttonContainer} activeOpacity={0.8} >
                <Text style={styles.buttonText}>Actualizar contraseña</Text>
            </TouchableOpacity>
          </View>
            
    </View>
            
        </ScrollView>
    );
  };


  export default Setup;