import React, {useState,} from 'react';
import {
  FlatList,
  ScrollView,
  View,
  Image,
  Text,
  TouchableOpacity,
} from 'react-native';
import { styles } from '../../../assets/css/style';
import { useIsFocused } from '@react-navigation/native';
import { constans } from '../../constants';



const Item = ({id,nombre,descripcion,precio,imagen,navigation}) => {
  return(
    <TouchableOpacity onPress={() => navigation.navigate("addCart",{id:id})} style={styles.item} activeOpacity={0.8}>
      <Text style={{fontFamily:'LilyScriptOne-Regular',textAlign:'center',color:'#A60703'}}>{nombre}</Text>
      <View style={styles.itemFood}>
         <View style={styles.itemFoodPhoto}>
            <Image style={{flex:1,width:null,height:null,borderRadius:10,}} resizeMode='contain' source={{uri:imagen}} ></Image>
          </View>
          <View style={styles.itemFoodDescription}>
            
            <Text style={{fontFamily:'Lato-Bold',fontSize:12}}>{descripcion}</Text>
            <Text style={{fontFamily:'Lato-Bold',textAlign:'center',color:'#A60703'}}>{precio} MXN</Text>
          </View>
          
        
      </View>
    </TouchableOpacity>
  );
}

const MenuClient = ({navigation}) => {
    

    const isFocused = useIsFocused();
    const [dogos,setDogos] = useState([]);

    React.useEffect(() => {
      if (isFocused===true){
  
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
              datos = JSON.parse(xhttp.responseText);
              setDogos(datos);
            }
        };
        xhttp.open("GET", constans.url_api+"/menu", true);
        xhttp.send();
      }
     
    },[isFocused]);


    const renderItem = ({ item }) => {
      return(
        <Item id={item.id} nombre={item.nombre}  descripcion={item.descripcion}  precio={item.precio}  imagen={item.imagen} navigation={navigation}></Item>
      );
    }


    return (

      

      <View style={styles.container}>
        <FlatList
          data={dogos}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
      </View>
        
    );
  };


export default MenuClient;