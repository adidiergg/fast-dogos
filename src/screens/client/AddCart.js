import React, { useContext, useEffect, useState } from 'react';
import {
  Text,
  ScrollView,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  Alert
} from 'react-native';
import { styles } from '../../../assets/css/style';
import { constans } from '../../constants';
import { CartContext } from '../../context/CartContext';

const AddCart = ({navigation,route}) => {
    const [dogo,setDogo] = useState({});
    const {push} =  useContext(CartContext);
    const [idDogo,setIdDogo] = useState("");
    const [cantidad,setCantidad] = useState("1");
    const [subtotal,setSubtotal] = useState(0);
    
    React.useEffect(() => {
        const {id} = route.params;
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                datos = JSON.parse(xhttp.responseText);
                setDogo(datos);

            }

            if (this.readyState == 4 && this.status == 400) {
                //datos = JSON.parse(xhttp.responseText);
                console.log(xhttp.responseText)
                //setDogo(datos);
            }
            
        };
        xhttp.open("GET", constans.url_api+"/menu/"+id, true);
        xhttp.send();

        setIdDogo(id);
    },[]);


    React.useEffect(() => {
      setSubtotal(dogo.precio*cantidad);
     },[dogo,cantidad]);

     

    const add = () => {

      if(subtotal!==0){
        Alert.alert("Ok","Se agrego a carrito");
        push({id:idDogo,cantidad:cantidad});
        navigation.goBack();
      }else{
        Alert.alert("Error","No se puede pedir 0 dogos");
      }
    }
    

    return (
        <ScrollView style={styles.container}>
          
            
          <Text style={{fontFamily:'LilyScriptOne-Regular',fontSize:20,textAlign:'center',color:'#A60703'}}>{dogo.nombre}</Text>

          <View style={styles.foodPhoto}>
              <Image onError={e => console.log(e)} style={{flex:1,width:null,height:null,borderRadius:10,}} resizeMode='contain' source={{uri:dogo.imagen}} ></Image>
          </View>

          <View >
            <Text style={{textAlign:'left',fontFamily:'Lato-Bold',color:'#A60703'}}>Descripción: 
              <Text style={{fontFamily:'Lato-Bold',color:'#3d3a35'}}> {dogo.descripcion} </Text>
            </Text>
            <Text style={{marginTop:20,textAlign:'left',fontFamily:'Lato-Bold',color:'#A60703'}}>Precio: 
              <Text style={{fontFamily:'Lato-Bold',color:'#3d3a35'}}> {dogo.precio} MXN</Text>
            </Text>
          </View>

          <View style={{marginTop:20}}>
            <Text style={styles.field}>Cantidad:</Text>
            <TextInput  onChangeText={(cantidad) => setCantidad(cantidad)} value={cantidad} keyboardType='numeric' style={styles.input} ></TextInput>
          </View>

          <View style={styles.menu}>
            <Text style={{textAlign:'right',fontFamily:'Lato-Bold',fontSize:18,color:'#A60703'}}>Total: 
            <Text style={{fontFamily:'Lato-Bold',fontSize:18,color:'#3d3a35'}}> {subtotal} MXN</Text>
            </Text>
            <View  style={styles.btn} >
              <TouchableOpacity onPress={add} style={styles.buttonContainer} activeOpacity={0.8} >
                <Text style={styles.buttonText}>Agregar a carrito</Text>
              </TouchableOpacity>
            </View>
          </View>
            
   
            
        </ScrollView>
    );
  };


  export default AddCart;