import React , {useState} from 'react';
import {
  FlatList,
  Alert,
  View,
  Image,
  Text,
  TouchableOpacity,
} from 'react-native';
import { styles } from '../../../../assets/css/style';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useIsFocused } from '@react-navigation/native';
import { constans } from '../../../constants';

const Item = ({id,nombre,descripcion,precio,imagen,navigation,setDogos}) => {

  const remove = () => {
    Alert.alert(
      "¿Está seguro?",
      "¿Está seguro de que desea eliminar el registro?",
      [
        // The "Yes" button
        {
          text: "Si",
          onPress: () => {
            var http = new XMLHttpRequest();
            http.onreadystatechange = function() {
                if(http.readyState == 4 && http.status == 200) {
                  Alert.alert("Ok",http.responseText);
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
        
                if(http.readyState == 4 && http.status == 400) {
                  Alert.alert("Error",http.responseText);
                }
            };
            http.open("DELETE", constans.url_api+"/menu/"+id, true);
            http.send();



            
          },
        },
        // The "No" button
        // Does nothing but dismiss the dialog when tapped
        {
          text: "No",
        },
      ]
    );
  }

  return(
    <View style={styles.item} activeOpacity={0.8}>
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

    
      <View style={{flexDirection:'row',alignSelf:'flex-end'}}>
      <TouchableOpacity 
        style={{marginHorizontal:10,backgroundColor:'#A60703',width:40,borderRadius:5}}  
        activeOpacity={0.8}
        onPress={() => navigation.navigate("updateMenu",{'id':id})}
        > 
        <Icon size={40} name="pencil-outline" color="#f2f2f2" />
      </TouchableOpacity>
      <TouchableOpacity 
        style={{marginHorizontal:10,backgroundColor:'#A60703',width:40,borderRadius:5}}  
        activeOpacity={0.8}
        onPress={remove}
      > 
        <Icon size={40} name="delete" color="#f2f2f2" />
      </TouchableOpacity>
      </View>
      
      
    </View>
  );
}

const IndexMenu= ({navigation}) => {

  const isFocused = useIsFocused();

  const [dogos,setDogos] = useState([]);

  const renderItem = ({ item }) => {
    return(
      <Item id={item.id} nombre={item.nombre}  descripcion={item.descripcion}  precio={item.precio}  imagen={item.imagen} navigation={navigation} setDogos={setDogos} ></Item>
    );
  }

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


  React.useEffect(() => {
    
  },[dogos]);


  return (

    

    <View style={styles.container}>
      <FlatList
        refreshing={true}
        data={dogos}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
      <TouchableOpacity style={{marginTop:10,alignSelf:'flex-end',backgroundColor:'#A60703',width:50,borderRadius:100}}  
      activeOpacity={0.8}
      onPress={() => navigation.navigate('insertMenu') }
      > 
        <Icon size={50} name="plus" color="#f2f2f2" />
      </TouchableOpacity>
    </View>
      
  );
};


export default IndexMenu ;