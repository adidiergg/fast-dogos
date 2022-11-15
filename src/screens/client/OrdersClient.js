import React from 'react';
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


const DATA = [{
  num:1,
  direccion:' PLAYA TECOLUTLA NO. 415, REFORMA IZTACCIHUATL SUR, 08840',
  estado:"Esperando",
  total:80,
},
{
  num:2,
  direccion:' PLAYA TECOLUTLA NO. 415, REFORMA IZTACCIHUATL SUR, 08840',
  estado:"Esperando",
  total:80,
},
{
  num:3,
  direccion:' PLAYA TECOLUTLA NO. 415, REFORMA IZTACCIHUATL SUR, 08840',
  estado:"Esperando",
  total:80,
},
{
  num:4,
  direccion:' PLAYA TECOLUTLA NO. 415, REFORMA IZTACCIHUATL SUR, 08840',
  estado:"Esperando",
  total:80,
},
{
  num:5,
  direccion:' PLAYA TECOLUTLA NO. 415, REFORMA IZTACCIHUATL SUR, 08840',
  estado:"Esperando",
  total:80,
}

];

const Item = ({num,direccion,estado,total}) => {
  return(
    <TouchableOpacity style={styles.item} activeOpacity={0.8}>
       
      
      <Text style={{fontFamily:'LilyScriptOne-Regular',textAlign:'center',color:'#A60703'}}>Numero de pedido: {num}</Text>
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


const OrdersClient = () => {

  const renderItem = ({ item }) => {
    return(
      <Item num={item.num} direccion={item.direccion}  estado={item.estado}  total={item.total}  ></Item>

    );


  }


  return (

    

    <View style={styles.container}>
      <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={item => item.num}
      />
    </View>
      
  );
  };


export default OrdersClient;