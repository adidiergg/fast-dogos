import React,{useState} from 'react';
import {
  Text,ScrollView,View,TouchableOpacity,Alert,
} from 'react-native';
import { styles } from '../../../assets/css/style';
import DropDownPicker from 'react-native-dropdown-picker';
import { constans } from '../../constants';

const AssignDeliver = ({navigation,route}) => {

    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([]);

    const select = () => {
      const {id} = route.params;
      console.log(value);
      if (value===null){
        Alert.alert("Error","Favor de seleccionar a un repartidor");
      }else{
        var http = new XMLHttpRequest();
        var url = constans.url_api+"/delivery/"+String(id);
        var params = 'estado=ENVIADO'+'&repartidor_id='+value;
        http.open('PUT', url, true);
        //Send the proper header information along with the request
        http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        http.onreadystatechange = function() {//Call a function when the state changes.
            if(http.readyState == 4 && http.status == 200) {
              Alert.alert("Ok","Se selecciono correctamente");
              navigation.goBack();
            }
    
            if(http.readyState == 4 && http.status == 400) {
              Alert.alert("Error","No se puedo seleccionar");
            }
    
    
        }
        http.send(params);
      }
    }

    React.useEffect(() => {
      
        
      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
          if (this.readyState == 4 && this.status == 200) {
            datos = JSON.parse(xhttp.responseText);
            console.log(datos)
            setItems(datos);
          }
      };
      xhttp.open("GET", constans.url_api+"/user/deliver", true);
      xhttp.send();
        
      
     
    },[]);

    return (
      <View style={styles.container}>
        <DropDownPicker
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
        />
        <View style={{marginTop:20}}>

              <TouchableOpacity  onPress={select} style={styles.buttonContainer} activeOpacity={0.8} >
                <Text style={styles.buttonText}>Seleccionar</Text>
            </TouchableOpacity>
        </View>
      
      
        
    </View>
    );
  };


export default AssignDeliver;