import React, { useState } from "react";
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  ScrollView
} from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import Constants from "expo-constants";
import ScannerView from "./ScannerView";
import { stockData } from "./data";
import { FlatList } from "react-native-gesture-handler";


const ScanQrCode = ( {navigation})=> {
  
  const [scanned, setScanned ]= useState(null);
  const [hasPermission, setHasPermission] = useState(null);
  const [qrcodeData, setQrcodeData] = useState(null);

  const startScan = () => {
    setScanned(false);

    // Request camera permission
    if (!hasPermission) {
      (async () => {
        const { status } = await BarCodeScanner.requestPermissionsAsync();
        setHasPermission(status === "granted");
      })();
    }
  };

  const handleBarCodeScanned = ({ data }) => {
    setScanned(true);
    console.log(data);
    let dataid = data;
    // console.log(stockData);
    let dataset  = stockData.filter((data)=>{
        return data.shelf.indexOf(dataid) !== -1;
    })
    // console.log(dataset);
    // setQrcodeData(`${dataset}`)
    navigation.navigate('DataScan',{data:dataset})
    // alert(`Scanned QR code with data: "${data}"`);
  };
  
  const ShowList = () =>{
    // console.log(props);
    let dataid = qrcodeData
    // console.log(dataid);
    // console.log(Object.keys(propsdata).length);
    let dataset  = stockData.filter((data)=>{
        return data.shelf.indexOf(dataid) !== -1;
    })

    // console.log(stockData);
    // console.log("----");
    // console.log(dataset);
  
    return ( 
      <FlatList 
        
        marginTop
        keyExtractor={item => item.id}
        data={dataset} 
        renderItem={({item}) =>{
          return (
          <View >
            <Text >{item.id}</Text>
            <Text >{item.name}</Text>
            <Text >{item.date}</Text>
          </View>)
      }} />
    )
    // // let listdataa = propsdata.map((data) =>{
    // //   <Text>{data.name} : วันที่ผลิต {data.date}</Text>
    // // })
    // // console.log(listdataa);
   
    // return <><Text>gg</Text></>
  }
  return (
    <SafeAreaView style={styles.container}>
      {!scanned && hasPermission && (
        <View style={{ flex: 1 }}>
          {/* https://docs.expo.io/versions/latest/sdk/bar-code-scanner/ */}
          <BarCodeScanner
            style={StyleSheet.absoluteFillObject}
            onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
            barCodeTypes={[BarCodeScanner.Constants.BarCodeType.qr]}
          />

          <View style={styles.helpTextWrapper}>
            <Text style={styles.helpText}>Find QR Code to scan</Text>
          </View>
        </View>
      )}

      <View style={styles.content}>
        {scanned !== null && hasPermission === null && (
          <Text style={styles.helpText}>Requesting for camera permission</Text>
        )}

        {scanned !== null && hasPermission === false && (
          <Text style={styles.helpText}>No access to camera</Text>
        )}

        {scanned === false && hasPermission && (
         
            <ScannerView scanned={scanned} />
          
          
        )}

        {(scanned !== false) && (
          <>
          
          
          <TouchableOpacity style={styles.button} onPress={startScan}>
            
            <Text style={styles.buttonText}>
              {scanned === null ? "Scan now" : "Scan again"}
            </Text>
           
          </TouchableOpacity>
          {/* <TouchableOpacity style={styles.button} onPress={showData}>
            <Text style={styles.buttonText}>
              {scanned === null ? "no data" : "Scan again"}
            </Text>
           
          </TouchableOpacity> */}
          {/* {qrcodeData === null ? "Scan now" :  ""} */}
          {/* <showData/> */}
          <View style={styles.hr}>
              { 
              (qrcodeData === null || qrcodeData === undefined) ? 
                <Text style={styles.buttonText}></Text> :  
              (
              <View style={styles.hr}>
                  
               
                  {/* <ShowList/> */}
              </View>)
              }
          </View>
          </>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    backgroundColor: "#fff",
  },
  content: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
  },
  helpTextWrapper: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 15,
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.6)",
  },
  helpText: {
    color: "#fff",
  },
  button: {
    marginTop:40,
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    backgroundColor: "#303940",
  },
  buttonText: {
    color: "#fff",
  },
  scrollView: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginVertical:20,
    maxHeight:"90%"
    
  },
  hr: {
    width:"100%",
    height:"85%"
    
  },
});
export default  ScanQrCode;