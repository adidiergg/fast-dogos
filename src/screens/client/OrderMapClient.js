import React,{useState,useContext} from 'react';
import {
  Text,StyleSheet,View,PermissionsAndroid, Button,FlatList,TouchableOpacity,
  Image,TextInput,Alert,
} from 'react-native';
import  MapView , {Marker,Polyline} from 'react-native-maps';
//import { Marker } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { styles } from '../../../assets/css/style';
import { constans } from '../../constants';
import { AuthContext } from '../../context/AuthContext';
import {decode} from "@mapbox/polyline"; 
//Geolocation.getCurrentPosition(info => console.log(info));


const OrderMapClient = ({navigation,route}) => {
    const {user} = useContext(AuthContext)
    const [direccion,setDireccion] = useState("")
    const [tiempo,setTiempo] = useState("Esperando aceptación y envio")
    const [region, setRegion] = useState({
      latitude: 0,
      longitude: 0,
      latitudeDelta: 0,
      longitudeDelta: 0,
    });

    const [coords, setCoords] = useState([]);

    const [pedido,setPedido] = useState([])
    const [cliente,setCliente] = useState({ latitude: 0,
        longitude: 0})

    const [repartidor,setRepartidor] = useState({ latitude: 0,
          longitude: 0})
    

    React.useEffect(() => {
      setRegion({
        latitude: Number(cliente.latitude),
        longitude: Number(cliente.longitude),
        latitudeDelta: 0.1,
        longitudeDelta: 0.1,
      });
      
    },[cliente]);

    React.useEffect(() => {
      
      
    },[region]);


    React.useEffect(() => {
      if(repartidor==="0"){
        return;
      }

      if(cliente.latitude!==0 && cliente.longitude!==0 && repartidor.latitude!==0   && repartidor.longitude!==0 ){
        //fetch the coordinates and then store its value into the coords Hook.
        
        getDirections(String(repartidor.latitude)+","+String(repartidor.longitude), String(cliente.latitude)+","+String(cliente.longitude))
          .then(coords => setCoords(coords))
          .catch(err => console.log("Something went wrong"));
        
        getTime(String(repartidor.longitude)+","+String(repartidor.latitude), String(cliente.longitude)+","+String(cliente.latitude))
          .then(tiempo => setTiempo(tiempo))
          .catch(err => console.log("Something went wrong"));


          console.log("ddddd");
          console.log(cliente);
          console.log(repartidor);

      }


      
      

      
    }, [cliente,repartidor]);

    

   


    React.useEffect(() => {
        const {id} = route.params;
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
              datos = JSON.parse(xhttp.responseText);
              
              ubicacion_cliente = JSON.parse(datos.ubicacion_cliente);
              setCliente(ubicacion_cliente);

              if(datos.ubicacion_repartidor !== "0"){
                ubicacion_repartidor = JSON.parse(datos.ubicacion_repartidor);
                setRepartidor(ubicacion_repartidor)
              }else{
                setRepartidor({latitude:0,longitude:0})
              }

              setDireccion(datos.direccion);
            }
        };
        xhttp.open("GET", constans.url_api+"/delivery/"+String(id), true);
        xhttp.send();
      
     
    },[]);


    


    const getAddress = ({latitude,longitude}) => {
      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
          if (this.readyState == 4 && this.status == 200) {
              localizacion = JSON.parse(xhttp.responseText);
              if(localizacion.status==="OK"){
                setDireccion(localizacion.results[0].formatted_address);
              }
              
              
          }    
        };
      xhttp.open("GET", "https://maps.googleapis.com/maps/api/geocode/json?latlng="+String(latitude)+","+String(longitude)+"&key=AIzaSyBnck7O3bkoeVLTkzNiJTBwF052lXIfUy0", true);
      xhttp.send();
      console.log(latitude,longitude)
    }



    const getDirections = async (startLoc, destinationLoc) => {
      try {
        
        const KEY = "AIzaSyBnck7O3bkoeVLTkzNiJTBwF052lXIfUy0"; //put your API key here.
        //otherwise, you'll have an 'unauthorized' error.
        let resp = await fetch(
          'https://maps.googleapis.com/maps/api/directions/json?origin='+startLoc+'&destination='+destinationLoc+'&key='+KEY
        );
        let respJson = await resp.json();
        let points = decode(respJson.routes[0].overview_polyline.points);
        let coords = points.map((point, index) => {
          return {
            latitude: point[0],
            longitude: point[1]
          };
        });
        return coords;
      } catch (error) {
        return error;
      }
    };


    const getTime = async (startLoc, destinationLoc) => {
      try {
        
        const KEY = "pk.eyJ1IjoiYWxhbmRkZ2ciLCJhIjoiY2xiNWpzM2xmMDJpZTNxbzZ3ODVzcXJyeiJ9.dH2Bd8cM_-hoktXw3dUVAw"; //put your API key here.
        //otherwise, you'll have an 'unauthorized' error.
        let resp = await fetch(
          'https://api.mapbox.com/directions/v5/mapbox/driving-traffic/'+startLoc+';'+destinationLoc+'?access_token='+KEY
        );
        
        let respJson = await resp.json();
        if(respJson.code=="Ok"){
          const time = Number(respJson.routes[0].duration)
          var minutes = Math.floor(time/60);
          //var seconds = time % 60;

          return  String(minutes) + " Minutos";
        }else{
          return "No se pudo obtener el tiempo estimado";
        }
        
        
        
      } catch (error) {
        return error;
      }
    };


    React.useEffect(() => {
      const timer = setTimeout(() => {
        const {id} = route.params;
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
              datos = JSON.parse(xhttp.responseText);
              
              ubicacion_cliente = JSON.parse(datos.ubicacion_cliente);
              setCliente(ubicacion_cliente);

              if(datos.ubicacion_repartidor !== "0"){
                ubicacion_repartidor = JSON.parse(datos.ubicacion_repartidor);
                setRepartidor(ubicacion_repartidor);
                
              }else{
                setRepartidor({latitude:0,longitude:0});
              }

              setDireccion(datos.direccion);
              //setPedido(datos);
            }
        };
        xhttp.open("GET", constans.url_api+"/delivery/"+String(id), true);
        xhttp.send();
      
      }, 3000);
      return () => clearTimeout(timer);
    });


    

    return (
        
      
        <View style={styles.container} >

         
            <>
            <View style={styles.containerMap}>
            
                <MapView
                //loadingEnabled={false}
                style={styles.map}
                region={region}
              
                >
                  <Marker coordinate={{
                        latitude: Number(cliente.latitude),
                        longitude: Number(cliente.longitude),
                        latitudeDelta: 0,
                        longitudeDelta:0,
                    }} 
                    >
                       <Image
                          source={{uri:'http://maps.google.com/mapfiles/ms/micons/homegardenbusiness.png'}}
                          style={{width: 30, height: 30}}
                          resizeMode="contain"
                        />

                    </Marker>


                    <Marker coordinate={{
                        latitude: Number(repartidor.latitude),
                        longitude: Number(repartidor.longitude),
                        latitudeDelta:0,
                        longitudeDelta: 0,
                        
                    }} 
                    


                    
                    >
                        <Image
                          source={{uri:'http://maps.google.com/mapfiles/ms/micons/motorcycling.png'}}
                          style={{width: 30, height: 30}}
                          resizeMode="contain"
                        />


                    </Marker>
  


                    
                    
                    {coords.length > 0 && <Polyline  strokeColor={'indigo'}
  strokeWidth={3} coordinates={coords} />}
                    

                </MapView>
            </View>
           

            <View style={styles.menu}>
            <Text style={{textAlign:'left',fontFamily:'Lato-Bold',color:'#A60703'}}>Dirección: 
            <Text style={{fontFamily:'Lato-Bold',color:'#3d3a35'}}> {direccion}</Text>
            
            </Text>

            <Text style={{textAlign:'left',fontFamily:'Lato-Bold',color:'#A60703'}}>Tiempo estimado: 
            <Text style={{fontFamily:'Lato-Bold',color:'#3d3a35'}}> {tiempo}</Text>
            
            </Text>
                
            </View>
            </>
            

        </View>

        
        
   
    );
  };



  
 
  export default OrderMapClient;


  /*
  
  <Marker coordinate={{
                        latitude: Number(cliente.latitude),
                        longitude: Number(cliente.longitude),
                        latitudeDelta: 0,
                        longitudeDelta:0,
                    }} 
                    >
                       <Image
                          source={{uri:'http://maps.google.com/mapfiles/ms/micons/homegardenbusiness.png'}}
                          style={{width: 30, height: 30}}
                          resizeMode="contain"
                        />

                    </Marker>

                    <Marker coordinate={{
                        latitude: Number(repartidor.latitude),
                        longitude: Number(repartidor.longitude),
                        latitudeDelta:0,
                        longitudeDelta: 0,
                        
                    }} 
                    


                    
                    >
                        <Image
                          source={{uri:'http://maps.google.com/mapfiles/ms/micons/motorcycling.png'}}
                          style={{width: 30, height: 30}}
                          resizeMode="contain"
                        />


                    </Marker>
  
  */ 