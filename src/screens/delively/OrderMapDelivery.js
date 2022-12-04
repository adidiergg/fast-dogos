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


const OrderMapDelivery = ({navigation,route}) => {
    const {user} = useContext(AuthContext)
    const [direccion,setDireccion] = useState("")
    const [tiempo,setTiempo] = useState("")
    const [region, setRegion] = useState({
      latitude: 0,
      longitude: 0,
      latitudeDelta: 0,
      longitudeDelta: 0,
    });

    const [coords, setCoords] = useState([]);

    const [pedido,setPedido] = useState([])
    const [cliente,setCliente] = useState({ latitude: 0,
        longitude: 0,})
    

    const [
        currentLongitude,
        setCurrentLongitude
      ] = useState(0);
      const [
        currentLatitude,
        setCurrentLatitude
      ] = useState(0);
      const [
        locationStatus,
        setLocationStatus
      ] = useState('');


      React.useEffect(() => {
        
        console.log(locationStatus);
      },[locationStatus]);


    React.useEffect(() => {
      setRegion({
        latitude: Number(currentLatitude),
        longitude: Number(currentLongitude),
        latitudeDelta: 0.1,
        longitudeDelta: 0.1,
      });
      
    },[currentLatitude,currentLongitude]);


    React.useEffect(() => {

      if(cliente.latitude!==0 && cliente.longitude!==0){
        //fetch the coordinates and then store its value into the coords Hook.
      getDirections(String(currentLatitude)+","+String(currentLongitude), String(cliente.latitude)+","+String(cliente.longitude))
        .then(coords => setCoords(coords))
        .catch(err => console.log("Something went wrong"));

      getTime(String(currentLongitude)+","+String(currentLatitude), String(cliente.longitude)+","+String(cliente.latitude))
        .then(tiempo => setTiempo(tiempo))
        .catch(err => console.log("Something went wrong"));

      }
      

      
    }, [currentLatitude,currentLongitude,cliente]);

    

    React.useEffect(() => {
        const requestLocationPermission = async () => {
              try {
                const granted = await PermissionsAndroid.request(
                  PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                  {
                    title: 'Location Access Required',
                    message: 'This App needs to Access your location',
                  },
                );
                if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                  //To Check, If Permission is granted
                  subscribeLocationLocation();
                  getOneTimeLocation();
                } else {
                  setLocationStatus('Permission Denied');
                }
              } catch (err) {
                console.warn(err);
              }
            
          };
          requestLocationPermission();
          return () => {
            Geolocation.clearWatch(watchID);
          };
    },[]);


    React.useEffect(() => {
        const {id} = route.params;
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
              datos = JSON.parse(xhttp.responseText);
              console.log(datos)
              ubicacion_cliente = JSON.parse(datos.ubicacion_cliente);
              setCliente(ubicacion_cliente);
              console.log(ubicacion_cliente);
              setDireccion(datos.direccion);
              //setPedido(datos);
            }
        };
        xhttp.open("GET", constans.url_api+"/delivery/"+String(id), true);
        xhttp.send();
      
     
    },[]);


    const getOneTimeLocation = () => {
        Geolocation.getCurrentPosition(
          //Will give you the current location
          (position) => {
            setLocationStatus('Ok');
     
            //getting the Longitude from the location json
            const currentLongitude = 
              JSON.stringify(position.coords.longitude);
     
            //getting the Latitude from the location json
            const currentLatitude = 
              JSON.stringify(position.coords.latitude);
     
            //Setting Longitude state
            setCurrentLongitude(currentLongitude);
            
            //Setting Longitude state
            setCurrentLatitude(currentLatitude);
          },
          (error) => {
            setLocationStatus(error.message);
          },
          {
            enableHighAccuracy: false,
            
            timeout: 12000, maximumAge: 30000, showLocationDialog: true,
          },
        );
      };
     
      const subscribeLocationLocation = () => {
        watchID = Geolocation.watchPosition(
          (position) => {
            //Will give you the location on location change
            
            setLocationStatus('Ok');
            console.log(position);
     
            //getting the Longitude from the location json        
            const currentLongitude =
              JSON.stringify(position.coords.longitude);
     
            //getting the Latitude from the location json
            const currentLatitude = 
              JSON.stringify(position.coords.latitude);
     
            //Setting Longitude state
            setCurrentLongitude(currentLongitude);
     
            //Setting Latitude state
            setCurrentLatitude(currentLatitude);
          },
          (error) => {
            setLocationStatus(error.message);
          },
          {
            enableHighAccuracy: false,
            maximumAge: 1000
          },
        );
      };


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
        console.log(respJson.routes[0].traffic_speed_entry);
        let points = decode(respJson.routes[0].overview_polyline.points);
        console.log(points);
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
        console.log(respJson)
        
        if(respJson.code=="Ok"){
          console.log(respJson.routes[0].duration)
          console.log("----------");
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
        getOneTimeLocation();
      }, 5000);
      return () => clearTimeout(timer);
    });


    

    return (
        
      
        <View style={styles.container} >

          {  locationStatus === 'Ok'  ?
            <>
            <View style={styles.containerMap}>
            
                <MapView
              
                style={styles.map}
                region={region}

                onRegionChange={region => console.log("--------"+region)} 
                

                
                >


                    <Marker coordinate={{
                        latitude: Number(cliente.latitude),
                        longitude: Number(cliente.longitude),
                        latitudeDelta: 0.015,
                        longitudeDelta: 0.0121,
                    }} 
                    />

                    <Marker coordinate={{
                        latitude: Number(currentLatitude),
                        longitude: Number(currentLongitude),
                        latitudeDelta: 0.015,
                        longitudeDelta: 0.0121,
                    }} 
                    />
                    
                    {coords.length > 0 && <Polyline coordinates={coords} />}
                    

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
            :
            <Text style={{textAlign:'center',fontFamily:'Lato-Bold',fontSize:18,color:'#A60703'}}>Error : 
              <Text style={{fontFamily:'Lato-Bold',fontSize:18,color:'#3d3a35'}}>  Favor de activar la ubicación</Text>
            </Text>

          }

        </View>

        
        
   
    );
  };



  
 
  export default OrderMapDelivery;