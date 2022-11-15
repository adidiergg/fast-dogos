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
  id:1,
  nombre:'MEXA',
  descripcion:"Pan natural, salchicha Bratwurst (100% carne de cerdo). Aguacate, tocino y mayonesa de jalapeño.",
  precio:80,
  imagen:'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.tripadvisor.com.mx%2FShowUserReviews-g150798-d10325587-r612100257-Furter_Hot_Dogs_Gourmet-Guadalajara_Guadalajara_Metropolitan_Area.html&psig=AOvVaw2lEXRO90tI2RzMeUrhMhZo&ust=1668138689835000&source=images&cd=vfe&ved=0CBAQjRxqFwoTCKCS6ILbovsCFQAAAAAdAAAAABAK'
},
{
  id:2,
  nombre:'MEXA',
  descripcion:"Pan natural, salchicha",
  precio:80,
  imagen:'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.tripadvisor.com.mx%2FShowUserReviews-g150798-d10325587-r612100257-Furter_Hot_Dogs_Gourmet-Guadalajara_Guadalajara_Metropolitan_Area.html&psig=AOvVaw2lEXRO90tI2RzMeUrhMhZo&ust=1668138689835000&source=images&cd=vfe&ved=0CBAQjRxqFwoTCKCS6ILbovsCFQAAAAAdAAAAABAK'
},
{
  id:3,
  nombre:'MEXA',
  descripcion:"Pan natural, salchicha Bratwurst (100% carne de cerdo). Aguacate, tocino y mayonesa de jalapeño.",
  precio:80,
  imagen:'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.tripadvisor.com.mx%2FShowUserReviews-g150798-d10325587-r612100257-Furter_Hot_Dogs_Gourmet-Guadalajara_Guadalajara_Metropolitan_Area.html&psig=AOvVaw2lEXRO90tI2RzMeUrhMhZo&ust=1668138689835000&source=images&cd=vfe&ved=0CBAQjRxqFwoTCKCS6ILbovsCFQAAAAAdAAAAABAK'
},
{
  id:4,
  nombre:'MEXA',
  descripcion:"Pan natural, salchicha Bratwurst (100% carne de cerdo). Aguacate, tocino y mayonesa de jalapeño.",
  precio:80,
  imagen:'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.tripadvisor.com.mx%2FShowUserReviews-g150798-d10325587-r612100257-Furter_Hot_Dogs_Gourmet-Guadalajara_Guadalajara_Metropolitan_Area.html&psig=AOvVaw2lEXRO90tI2RzMeUrhMhZo&ust=1668138689835000&source=images&cd=vfe&ved=0CBAQjRxqFwoTCKCS6ILbovsCFQAAAAAdAAAAABAK'
}

];

const CartClient = () => {

  const renderItem = ({ item }) => {
    return(
      <Item id={item.id} nombre={item.nombre}  descripcion={item.descripcion}  precio={item.precio}  imagen={item.imagen}  ></Item>

    );


  }


  const Item = ({id,nombre,descripcion,precio,imagen}) => {
    return(
      <View style={styles.item}>
       <TouchableOpacity activeOpacity={0.8}> 
        <Text style={{textAlign:'right'}}><Icon size={15} name="close" color="#A60703" /></Text>
       </TouchableOpacity>
        <Text style={{fontFamily:'LilyScriptOne-Regular',textAlign:'center',color:'#A60703'}}>{nombre}
        
        </Text>
        <View style={styles.itemFood}>
           <View style={styles.itemFoodPhoto}>
              <Image style={{flex:1,width:null,height:20,borderRadius:10,}} resizeMode='contain' source={{uri:"https://pixabay.com/get/g8eaac65e73f0d9c446795b83bad842a9ff0681fc0abf2498205d4a67dfa07e8229a05a095cadc78f2daba59c5785d7e265f10b28abaca0e1f4592fa8d8105d66_1920.jpg"}} ></Image>
            </View>
            <View style={styles.itemFoodDescription}>
              <Text style={{textAlign:'left',fontFamily:'Lato-Bold',color:'#A60703'}}>Cantidad: 
              <Text style={{fontFamily:'Lato-Bold',color:'#3d3a35'}}> 1</Text>
              </Text>
              
             
              <Text style={{textAlign:'left',fontFamily:'Lato-Bold',color:'#A60703'}}>Precio: 
              <Text style={{fontFamily:'Lato-Bold',color:'#3d3a35'}}> 1 MXN</Text>
              </Text>

              <Text style={{textAlign:'left',fontFamily:'Lato-Bold',color:'#A60703'}}>SubTotal: 
              <Text style={{fontFamily:'Lato-Bold',color:'#3d3a35'}}> 1 MXN</Text>
              </Text>
            </View>
            
          
        </View>
      </View>

   

    );
  }

  return (

    

    <View style={styles.container}>
      <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
      <View style={styles.menu}>
        <Text style={{textAlign:'right',fontFamily:'Lato-Bold',fontSize:18,color:'#A60703'}}>Total: 
        <Text style={{fontFamily:'Lato-Bold',fontSize:18,color:'#3d3a35'}}> 100 MXN</Text>
        </Text>
      <View  style={styles.btn} >
        <TouchableOpacity style={styles.buttonContainer} activeOpacity={0.8} >
          <Text style={styles.buttonText}>Pedir</Text>
        </TouchableOpacity>
      </View>
      </View>
    </View>

      
  );
};


export default CartClient;