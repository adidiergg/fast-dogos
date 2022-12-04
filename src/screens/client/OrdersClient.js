import React, { useContext,useState } from 'react';
import {
  FlatList,
  ScrollView,
  View,
  Image,
  Text,
  TouchableOpacity,
} from 'react-native';
import { styles } from '../../../assets/css/style';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { CartContext } from '../../context/CartContext';
import { useIsFocused } from '@react-navigation/native';
import { constans } from '../../constants';
import { AuthContext } from '../../context/AuthContext';


const Item = ({id,direccion,estado,navigation}) => {

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

  return(
    <TouchableOpacity onPress={() => navigation.navigate("orderDetailClient",{id:id})} style={styles.item} activeOpacity={0.8}>
       
      
      <Text style={{fontFamily:'LilyScriptOne-Regular',textAlign:'center',color:'#A60703'}}>Numero de pedido: {id}</Text>
      <View style={styles.itemDelively}>
          <View>
            <Text style={{fontFamily:'Lato-Bold',fontSize:12,color:'#A60703'}}>Dirección:  <Text style={{fontFamily:'Lato-Bold',textAlign:'center',color:'#3d3a35'}}>{direccion} </Text> </Text>
            <Text style={{fontFamily:'Lato-Bold',fontSize:12,color:'#A60703'}}>Estado:  <Text style={{fontFamily:'Lato-Bold',textAlign:'center',color:'#3d3a35'}}>{estado} </Text> </Text>
            <Text style={{fontFamily:'Lato-Bold',fontSize:12,textAlign:'right',color:'#A60703'}}>Total:  <Text style={{fontFamily:'Lato-Bold',color:'#3d3a35'}}>{total} MXN</Text> </Text>
          </View>
          
        
      </View>
    </TouchableOpacity>
  );
}


const OrdersClient = ({navigation}) => {

  const isFocused = useIsFocused();
  const {user} = useContext(AuthContext)
  const [pedidos,setPedidos] = useState([]);

  const renderItem = ({ item }) => {
    return(
      <Item id={item.id} direccion={item.direccion}  estado={item.estado} navigation={navigation} ></Item>

    );


  }


  React.useEffect(() => {
    if (isFocused===true){

      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
          if (this.readyState == 4 && this.status == 200) {
            datos = JSON.parse(xhttp.responseText);
            console.log(datos)
            setPedidos(datos.pedidos);
          }
      };
      xhttp.open("GET", constans.url_api+"/delivery/user/"+user, true);
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


export default OrdersClient;