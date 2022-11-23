import React from 'react';
import {
  Text,StyleSheet,View,
} from 'react-native';
import MapView from 'react-native-maps';


const OrderClient = () => {

    return (
        <View style={styles.container}>
            <MapView
          
            style={styles.map}
            region={{
                latitude: 20.659698,
                longitude: -103.349609,
                latitudeDelta: 0.015,
                longitudeDelta: 0.0121,
            }}
            >
            </MapView>
        </View>
    );
  };




  const styles = StyleSheet.create({
    container: {
      ...StyleSheet.absoluteFillObject,
      //height: 400,
      height: '40%',
      width: '100%',
      justifyContent: 'flex-end',
      alignItems: 'center',
    },
    map: {
      ...StyleSheet.absoluteFillObject,
    },
   });
  export default OrderClient;