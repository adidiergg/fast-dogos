import React, { useState } from 'react';
import {
  Text,View,FlatList,TouchableOpacity
} from 'react-native';

import { styles } from '../../../assets/css/style';
import { constans } from '../../constants';


const Item = ({id,nombre,precio,cantidad}) => {
  return(
    <TouchableOpacity style={styles.item} activeOpacity={0.8}>
      <Text style={{fontFamily:'LilyScriptOne-Regular',textAlign:'center',color:'#A60703'}}>{nombre}</Text>
      <View style={styles.itemDelively}>
          <View>
            <Text style={{fontFamily:'Lato-Bold',fontSize:12,color:'#A60703'}}>Precio:  <Text style={{fontFamily:'Lato-Bold',textAlign:'center',color:'#3d3a35'}}>{precio} MXN </Text> </Text>
            <Text style={{fontFamily:'Lato-Bold',fontSize:12,color:'#A60703'}}>Cantidad:  <Text style={{fontFamily:'Lato-Bold',textAlign:'center',color:'#3d3a35'}}>{cantidad} </Text> </Text>
            <Text style={{fontFamily:'Lato-Bold',fontSize:12,textAlign:'right',color:'#A60703'}}>Subtotal:  <Text style={{fontFamily:'Lato-Bold',color:'#3d3a35'}}>{precio*cantidad} MXN</Text> </Text>
          </View>
          
        
      </View>
    </TouchableOpacity>
  );
}


const OrderDetailDelivery = ({navigation,route}) => {

    const [detalles,setDetalles] = useState({});
    const [total,setTotal] = useState(0);

    React.useEffect(() => {
      const {id} = route.params;
  
      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
          if (this.readyState == 4 && this.status == 200) {
            datos = JSON.parse(xhttp.responseText);
            console.log(datos)
            setDetalles(datos.pedido_detalles);
          }
      };
      xhttp.open("GET", constans.url_api+"/delivery/"+String(id), true);
      xhttp.send();
      
     
    },[]);


    React.useEffect(() => {
      const {id} = route.params;
  
      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
          if (this.readyState == 4 && this.status == 200) {
            datos = JSON.parse(xhttp.responseText);
            console.log(datos);
            setTotal(datos.total);
            //setDetalles(datos.pedido_detalles);
          }
      };
      xhttp.open("GET", constans.url_api+"/delivery/total/"+String(id), true);
      xhttp.send();
      
     
    },[]);
  


    const renderItem = ({ item }) => {
      return(
        <Item id={item.id} nombre={item.nombre}  precio={item.precio}  cantidad={item.cantidad}  ></Item>
      );
  
  
    }

    return (
      <View style={styles.container}>
        <FlatList
          data={detalles}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
        <View style={styles.menu}>
          <Text style={{textAlign:'right',fontFamily:'Lato-Bold',fontSize:18,color:'#A60703'}}>Total: 
          <Text style={{fontFamily:'Lato-Bold',fontSize:18,color:'#3d3a35'}}> {total} MXN</Text>
          </Text>
        </View>

      </View>
    );
  };


export default OrderDetailDelivery;