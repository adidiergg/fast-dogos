import React,{useState} from 'react';
import {
  FlatList,
  ScrollView,
  View,
  Image,
  Alert,
  Text,
  TouchableOpacity,
} from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { styles } from '../../../assets/css/style';
import { constans } from '../../constants';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


const Item = ({id,direccion,estado,setPedidos,navigation}) => {
    const [total,setTotal] = useState(0);


    React.useEffect(() => {
        
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
            datos = JSON.parse(xhttp.responseText);
            setTotal(datos.total);
            }
        };
        xhttp.open("GET", constans.url_api+"/delivery/total/"+String(id), true);
        xhttp.send();
    
    
    },[]);
  /*
  const add = () => {
      var http = new XMLHttpRequest();
      var url = constans.url_api+"/delivery/"+String(id);
      var params = 'estado=ACEPTADO';
      http.open('PUT', url, true);
      //Send the proper header information along with the request
      http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
      http.onreadystatechange = function() {//Call a function when the state changes.
          if(http.readyState == 4 && http.status == 200) {
            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                  datos = JSON.parse(xhttp.responseText);
                  console.log(datos)
                  setPedidos(datos);
                }
            };
            xhttp.open("GET", constans.url_api+"/delivery/iniciado", true);
            xhttp.send();
          }
  
          if(http.readyState == 4 && http.status == 400) {
            Alert.alert("Error","No se puedo aceptar");
          }
  
  
      }
      http.send(params);
  }
  */


  const remove = () => {
    var http = new XMLHttpRequest();
    var url = constans.url_api+"/delivery/"+String(id);
    var params = 'estado=CANCELADO';
    http.open('PUT', url, true);
    //Send the proper header information along with the request
    http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    http.onreadystatechange = function() {//Call a function when the state changes.
        if(http.readyState == 4 && http.status == 200) {
          var xhttp = new XMLHttpRequest();
          xhttp.onreadystatechange = function() {
              if (this.readyState == 4 && this.status == 200) {
                datos = JSON.parse(xhttp.responseText);
                console.log(datos)
                setPedidos(datos);
              }
          };
          xhttp.open("GET", constans.url_api+"/delivery/enviado", true);
          xhttp.send();
        }

        if(http.readyState == 4 && http.status == 400) {
          Alert.alert("Error","No se puedo aceptar");
        }


    }
    http.send(params);
  }

  return(
    <TouchableOpacity onPress={()=> navigation.navigate("orderDetailRestaurant",{id:id})} activeOpacity={0.8} style={styles.item}>
      <Text style={{fontFamily:'LilyScriptOne-Regular',textAlign:'center',color:'#A60703'}}>Numero de pedido: {id}</Text>
      <View style={styles.itemDelively}>
          <View>
            <Text style={{fontFamily:'Lato-Bold',fontSize:12,color:'#A60703'}}>Dirección:  <Text style={{fontFamily:'Lato-Bold',textAlign:'center',color:'#3d3a35'}}>{direccion} </Text> </Text>
            <Text style={{fontFamily:'Lato-Bold',fontSize:12,color:'#A60703'}}>Estado:  <Text style={{fontFamily:'Lato-Bold',textAlign:'center',color:'#3d3a35'}}>{estado} </Text> </Text>
            <Text style={{fontFamily:'Lato-Bold',fontSize:12,color:'#A60703'}}>Total:  <Text style={{fontFamily:'Lato-Bold',color:'#3d3a35'}}>{total} MXN</Text> </Text>
          </View>
          
        
      </View>

      <View style={{flexDirection:'row',alignSelf:'flex-end'}}>
      

      <TouchableOpacity 
        style={{marginHorizontal:10,backgroundColor:'#A60703',width:40,borderRadius:5}}  
        activeOpacity={0.8}
        onPress={() => navigation.navigate("orderMapClient",{id:id})}
      > 
        <Icon size={40} name="cellphone-marker" color="#f2f2f2" />
      </TouchableOpacity>

      <TouchableOpacity 
        style={{marginHorizontal:10,backgroundColor:'#A60703',width:40,borderRadius:5}}  
        activeOpacity={0.8}
        onPress={remove}
      > 
        <Icon size={40} name="close-circle" color="#f2f2f2" />
      </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

const OrdersDelivered = ({navigation}) => {

  const isFocused = useIsFocused();
  const [pedidos,setPedidos] = useState([]);

  const renderItem = ({ item }) => {
    return(
      <Item setPedidos={setPedidos} id={item.id} direccion={item.direccion}  estado={item.estado} navigation={navigation} ></Item>

    );


  }


  React.useEffect(() => {
    if (isFocused===true){
      
      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
          if (this.readyState == 4 && this.status == 200) {
            datos = JSON.parse(xhttp.responseText);
            console.log(datos)
            setPedidos(datos);
          }
      };
      xhttp.open("GET", constans.url_api+"/delivery/enviado", true);
      xhttp.send();
      
    }
   
  },[isFocused]);


  return (

    

    <View style={styles.container}>
      <FlatList
        data={pedidos}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </View>
      
  );
  };


export default OrdersDelivered;