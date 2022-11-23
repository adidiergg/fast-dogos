import { StyleSheet ,StatusBar } from 'react-native'

export const styles = StyleSheet.create({
    container:{
        
        flex:1,
        backgroundColor:"#FCDC8B",
        padding:10,
        color:"#000",
    },
    
    item:{
      padding:5,
      backgroundColor:'#FFE6A6',
      borderRadius:10,
      marginVertical: 2,
      
    },
    itemFood:{
      flexDirection:'row',
      flexWrap: "wrap",
      alignItems: 'center',
     
    },
    itemDelively:{
     
    },
    itemFoodDescription:{
      textAlignVertical: 'center',
      paddingLeft:10,
      width:'50%',
     
    },
    itemFoodPhoto:{
      width:'50%',
      aspectRatio: 1*1.4,
    },
    buttonContainer: {
      marginTop:15,
      elevation: 8,
      backgroundColor: "#A60703",
      borderRadius: 10,
      paddingVertical: 15,
      paddingHorizontal: 12
    },
    buttonText: {
      fontSize: 15,
      color: "#fff",
      fontWeight: "bold",
      alignSelf: "center",
      textTransform: "uppercase"
    },
      
      title:{
          fontFamily:'LilyScriptOne-Regular',
          fontSize:45,
          color:"#A60703",
          textAlign:"center",
      },
      logo:{
          height:125,
          resizeMode:"contain",
          alignSelf:'center',
      },
      foodPhoto:{
        resizeMode:"contain",
        alignSelf:'center',
        width:'60%',
        aspectRatio: 1*1.4,
      },
      input:{
          borderWidth:1,
          fontSize:20,
          backgroundColor:"#fff",
          marginTop:10,
          marginBottom:10,
          elevation: 8,
          borderColor: "#FCDC8B",
          borderRadius: 10,
          
      },
      field:{
        fontFamily:'Lato-Bold',
        color:'#A60703',
      },
      menu:{
        padding:10,
      }
    });
