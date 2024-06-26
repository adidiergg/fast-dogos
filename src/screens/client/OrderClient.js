import React,{useState,useContext} from 'react';
import {
  Text,StyleSheet,View,PermissionsAndroid, Button,FlatList,TouchableOpacity,
  Image,TextInput,Alert,
} from 'react-native';
import  MapView , {Marker} from 'react-native-maps';
//import { Marker } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { styles } from '../../../assets/css/style';
import { CartContext } from '../../context/CartContext';
import { constans } from '../../constants';
import { AuthContext } from '../../context/AuthContext';
//Geolocation.getCurrentPosition(info => console.log(info));


const OrderClient = ({navigation}) => {
    const {user} = useContext(AuthContext)
    const {carrito,reset} = useContext(CartContext) 
    const [direccion,setDireccion] = useState("")
    const [coordenadas,setCoordenadas] = useState({ latitude: 0,
      longitude: 0,})
    const [region, setRegion] = useState({
      latitude: 0,
      longitude: 0,
      latitudeDelta: 0,
      longitudeDelta: 0,
    });

    

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
      setRegion({
        latitude: Number(currentLatitude),
        longitude: Number(currentLongitude),
        latitudeDelta: 0.1,
        longitudeDelta: 0.1,
      });
      getAddress({latitude:currentLatitude,longitude:currentLongitude})
    },[currentLatitude,currentLongitude]);

    

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


    const getOneTimeLocation = () => {
        setLocationStatus('Getting Location ...');
        Geolocation.getCurrentPosition(
          //Will give you the current location
          (position) => {
            setLocationStatus('You are Here');
     
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
            
            setLocationStatus('You are Here');
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

      setCoordenadas({latitude:latitude,longitude:longitude});
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


    const add = () => {


      const carrito_json = JSON.stringify(carrito);
      var http = new XMLHttpRequest();
      var url = constans.url_api+"/delivery";
      var params = 'carrito='+carrito_json+'&direccion='+direccion+'&cliente_id='+user+'&ubicacion_cliente='+'{"latitude":'+String(coordenadas.latitude)+',"longitude":'+String(coordenadas.longitude)+'}';
      console.log(params)
      //var params = 'cliente_id='+user+'&ubicacion_cliente=pp';
      http.open('POST', url, true);
      //Send the proper header information along with the request
      http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
      http.onreadystatechange = function() {//Call a function when the state changes.
          if(http.readyState == 4 && http.status == 200) {
            Alert.alert("Ok",http.responseText);
            reset();
            navigation.goBack();
          }
  
          if(http.readyState == 4 && http.status == 400) {
            Alert.alert("Error",http.responseText);
          }
  
  
      }
      http.send(params);
      
    }

    return (
        
      
        <View style={styles.container} >
            <View style={styles.containerMap}>
            
                <MapView
              
                style={styles.map}
                region={region}
                
                >


                    <Marker draggable coordinate={{
                        latitude: Number(currentLatitude),
                        longitude: Number(currentLongitude),
                        latitudeDelta: 0.015,
                        longitudeDelta: 0.0121,
                    }} 
                    
                    onDragEnd={(e) => getAddress(e.nativeEvent.coordinate)}
                    />

                </MapView>
            </View>
           

            <View style={styles.menu}>
            <Text style={{textAlign:'left',fontFamily:'Lato-Bold',color:'#A60703'}}>Dirección: 
            <Text style={{fontFamily:'Lato-Bold',color:'#3d3a35'}}> {direccion}</Text>
            </Text>
                <View  style={styles.btn} >
                    <TouchableOpacity onPress={add}  style={styles.buttonContainer} activeOpacity={0.8} >
                    <Text style={styles.buttonText}>Confirmar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>

        
        
   
    );
  };

/*
<View style={styles.containerMap}>
            
        <MapView
          
            style={styles.map}
            region={{
                latitude: Number(currentLatitude),
                longitude: Number(currentLongitude),
                latitudeDelta: 0.015,
                longitudeDelta: 0.0121,
            }}
            >
            </MapView>
        </View>

        <Text>aca</Text>
        <Text>{locationStatus}</Text>
        <Text>{currentLatitude}</Text>
        <Text>{currentLongitude}</Text>
        <Button title='prueba' onPress={getOneTimeLocation} ></Button>

*/

  
 
  export default OrderClient;