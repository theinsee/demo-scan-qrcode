import React,{ useState } from "react";
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Button,
  ScrollView
} from "react-native";
import Constants from "expo-constants";

const DataScan = ( props)=> {
  // console.log( props.navigation.state.params.data);
  let data =props.navigation.state.params.data
    // console.log(props.state);
  // console.log("----------------");
  // console.log(data);
  // console.log("----------------");

  let list =[]
  const [select,setSelect] = useState({list})
  const [listdata,setListdata] = useState(data)
  const selectItem = (res) =>{
    // console.log(res);
    let item = select.list

    console.log(item);
    let checkItem =0
    item.forEach(e => {
      if(e == res){
        checkItem = 1
      }
    });
    if(checkItem){
      item = item.filter((e)=>{
        return e != res
      })
      // item.pop(res)
    }
    else{
      item.push(res)
    }
    setSelect({list: item})
    console.log(select);
  }
  const cutOut = () =>{
      let selectData =select.list;
      let data =listdata
      for (let i = 0; i < selectData.length; i++) {
        const element = selectData[i];
        // console.log(listdata);
         data = data.filter((res)=>{
          // console.log(res.id);
          return res.id != element
        })
      }
      setListdata(data)
      // console.log(data);
      setSelect({list:[]})
  }
  const cutIn = () =>{
      let selectData =select.list;
      let newData =listdata
      for (let i = 0; i < selectData.length; i++) {
        const list = selectData[i];
        // console.log(listdata);
        for (let i = 0; i < listdata.length; i++) {
          const ldata = listdata[i];
          if (list == ldata.id){
            newData.splice(newData.length,0,ldata)
          }
          console.log("newData");
        }
      }
      setListdata(newData)
      // console.log(data);
      setSelect({list:[]})
  }
  return (
  <SafeAreaView>
    
      <View style={styles.container}> 
        <Text style={{fontSize:24}}>{data[0].name}</Text>
      </View>
      <Button
        onPress={cutOut}
        title="ตัดสินค้า"
        color="#841584"
        // accessibilityLabel="Learn more about this purple button"
      />
      {/* <Button
        onPress={cutIn}
        title="เลือกสินค้าที่เหลือ"
        color="#158484"
        // accessibilityLabel="Learn more about this purple button"
      /> */}
      <ScrollView style={styles.scrollView}>
      
      <View style={styles.container}>
       <FlatList 
        // style={styles.container}
        // marginTop
        numColumns={5}
        horizontal={false}
        alignItems="center"
        // initialScrollIndex
        data={listdata} 
        keyExtractor={item => item.id}
        renderItem={({item}) =>{
          let color = '#000';
          let borderS = 1;
          let selectData = select.list;
          selectData.forEach(e => {
            if (e == item.id) {
              color = "blue"
              borderS = 1
            }
          });
          return (
            <TouchableOpacity 
            style={[{borderColor:color},styles.flexItem]}
           
            onPress={()=>selectItem(item.id)}
            >
              {/* <View  > */}
                {/* <Text style={{fontSize:10,width:"100%",textAlign:"center"}}>{item.name}</Text> */}
                <Text style={{fontSize:10,width:"100%",textAlign:"center"}}>{item.id}</Text>
              {/* </View> */}
            </TouchableOpacity>
            )
          }} />
        </View>
          </ScrollView>

  </SafeAreaView>);
}

const styles = StyleSheet.create({
  container: {
    // flex:1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    // textAlignVertical:'center',
    width:"100%",
    justifyContent: "center",
    padding:10,
    // paddingTop: Constants.statusBarHeight,
    backgroundColor: "#fff",
  },button: {
    marginTop:40,
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    backgroundColor: "#303940",
  },
  flexItem:{
    margin: 2,
    padding:10,
    height:60,
    width:60,
    fontSize:50,
    alignItems: "center",
    justifyContent:'center',
    borderStyle: "solid",
    borderWidth: 2
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
  boxItem:{
    width:100,
    height:100,
    borderStyle:"solid"
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
    marginHorizontal: 0,
    marginVertical:20,
    width:"100%",
    maxHeight:"90%"
    
  },
  hr: {
    width:"100%",
    height:"85%"
    
  },
});
export default  DataScan;