import React, { useContext, useRef, useState} from 'react';
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
import { constans } from '../../constants';



const Item = ({position,id,cantidad,setTotal,total}) => {
  const [dogo,setDogo] = useState({});
  const [subtotal,setSubtotal] = useState(0);
  const {carrito,pop} = useContext(CartContext) 

  React.useEffect(() => {
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

  
  },[carrito]);


  React.useEffect(() => {
   setSubtotal(dogo.precio*cantidad);
   
   //setTotal(total+1);
  },[dogo]);

  React.useEffect(() => {
    
   
    if (!isNaN(subtotal)){
      setTotal(total+Number(subtotal));
      console.log("---")
      console.log(dogo);
      console.log(subtotal);
    }
    
    //setTotal(total+subtotal);
    //setTotal(Number(subtotal));
   },[subtotal]);


   const remove = ()=>{
      pop({position:position})
      setTotal(total-Number(subtotal));
   }

  

  return(
    <View style={styles.item}>
      <View style={{flexDirection:'row',alignSelf:'flex-end'}}>
        <TouchableOpacity 
        onPress={remove}
        style={{marginHorizontal:10,backgroundColor:'#A60703',width:40,borderRadius:5}}  
        activeOpacity={0.8}
        
        > 
        <Icon size={40} name="close" color="#f2f2f2" />
        </TouchableOpacity>
      </View>
     
      <Text style={{fontFamily:'LilyScriptOne-Regular',textAlign:'center',color:'#A60703'}}>{dogo.nombre}
      
      </Text>
      <View style={styles.itemFood}>
         <View style={styles.itemFoodPhoto}>
            <Image style={{flex:1,width:null,height:20,borderRadius:10,}} resizeMode='contain' source={{uri:dogo.imagen}} ></Image>
          </View>
          <View style={styles.itemFoodDescription}>
            <Text style={{textAlign:'left',fontFamily:'Lato-Bold',color:'#A60703'}}>Cantidad: 
            <Text style={{fontFamily:'Lato-Bold',color:'#3d3a35'}}> {cantidad}</Text>
            </Text>
            
           
            <Text style={{textAlign:'left',fontFamily:'Lato-Bold',color:'#A60703'}}>Precio: 
            <Text style={{fontFamily:'Lato-Bold',color:'#3d3a35'}}> {dogo.precio} MXN</Text>
            </Text>

            <Text style={{textAlign:'left',fontFamily:'Lato-Bold',color:'#A60703'}}>SubTotal: 
            <Text style={{fontFamily:'Lato-Bold',color:'#3d3a35'}}> {subtotal} MXN</Text>
            </Text>
          </View>
          
        
      </View>
    </View>

 

  );
}

const CartClient = ({navigation}) => {

    const {carrito,pop} = useContext(CartContext) 
    const [total,setTotal] = useState(0);
    //const prevTotal = usePrevious(total)
    //const total = useRef(0);
    
    React.useEffect(() => {
      if(carrito.length === 0){
        setTotal(0);
      }
     
     
      /*
      carrito.map(producto => {
        
        let xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                datos = JSON.parse(xhttp.responseText);
                setTotal(total+(Number(datos.precio)*producto.cantidad))
                //total.current = total.current +  (Number(datos.precio)*producto.cantidad);

                console.log(xhttp.responseText)
                console.log(producto)
            }      
        };
        xhttp.open("GET", constans.url_api+"/menu/price/"+String(producto.id), true);
        xhttp.send();

        

      });
      */
      
      
     },[carrito]);


     

     React.useEffect(() => {
      console.log(total);
     },[total]);

 

    const renderItem = ({ item }) => {
      return(
        <Item  position={item.position} id={item.id} cantidad={item.cantidad} total={total} setTotal={setTotal} ></Item>
      );
    }


  

  return (

    

    <View style={styles.container}>
      

      {  carrito.length===0 ? 
      <>
      
      <Text style={{textAlign:'center',fontFamily:'Lato-Bold',fontSize:18,color:'#A60703'}}>Bienvenido : 
        <Text style={{fontFamily:'Lato-Bold',fontSize:18,color:'#3d3a35'}}>  Carrito vacio</Text>
      </Text>

      </>
      :
      <>
      <FlatList
        data={carrito}
        renderItem={renderItem}
        keyExtractor={item => item.position}
      />
      <View style={styles.menu}>
        <Text style={{textAlign:'right',fontFamily:'Lato-Bold',fontSize:18,color:'#A60703'}}>Total: 
        <Text style={{fontFamily:'Lato-Bold',fontSize:18,color:'#3d3a35'}}> {total} MXN</Text>
        </Text>
      <View  style={styles.btn} >
        <TouchableOpacity  onPress={() => navigation.navigate("orderClient")} style={styles.buttonContainer} activeOpacity={0.8} >
          <Text style={styles.buttonText}>Pedir</Text>
        </TouchableOpacity>
      </View>
      </View>
      </>
      }


    </View>

      
  );
};


export default CartClient;