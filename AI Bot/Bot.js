
import React , {useState}from 'react';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  FlatList,
  TextInput,
  TouchableOpacity,
  ImageBackground
} from 'react-native';
import axios from 'axios';
import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

export default function Bot(){
  const[data, setData] = useState([]);
  const apiKey= "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";
  const baseUrl= 'https://api.openai.com/v1/engines/text-davinci-002/completions';
  const [textInput, settextInput] = useState('');
  const handleSend = async () => {
    const prompt= textInput
    const response= await axios.post(baseUrl,{
      prompt:prompt,
      max_tokens:3000,
      temperature:0.5,
    },{
      headers:{
        'Content-Type' : 'application/json',
        'Authorization' : `Bearer ${apiKey}`
      }
    });
   const text= response.data.choices[0].text;  
   setData([...data,{type:'user' ,'text' :textInput}, {type:'bot','text':text}]);
   settextInput('');
  }

  return(
    <View style={styles.Container}>
        <ImageBackground
        source={{uri:'https://e1.pxfuel.com/desktop-wallpaper/496/334/desktop-wallpaper-navy-and-neon-lights-neon-tech-thumbnail.jpg'}}
        resizeMode="cover"
        style={styles.image}
        >
      <Text style={{color:'#02a9f7',fontSize:40,marginBottom:20,fontFamily:'Cochin',width:250
      ,borderBottomWidth:2,borderBottomColor:'#02a9f7',textAlign:'center',borderRadius:20}}
      >A.I. BOT</Text>
      <FlatList
        data={data}
        keyExtractor={(item,index) => index.toString()}
        renderItem={({item}) => (
          <View style={{flexDirection:'row',padding:10,width:300}}>
              <Text style={{fontWeight:'bold',color: item.type==='user'? '#d4f0fc': '#89d6fb'}}>{item.type==='user' ? 'Me': 'Bot'}: </Text>
              <Text style={{color:'white',marginRight:50}}>{item.text}</Text>
            </View>
        )}
      />
      <View style={{marginBottom:0}}>
      <TextInput
      style={styles.input}
      value={textInput}
      onChangeText = {text => settextInput(text)}
      placeholder='Ask me anything...'
      placeholderTextColor={'white'}
      />
      <TouchableOpacity onPress={handleSend}>
        <Text style={styles.button}>Enter</Text>
      </TouchableOpacity>
      </View>
      </ImageBackground>
    </View>
  )
}
const styles = StyleSheet.create({
  Container: {
    
    flex:1,
    alignItems:'center',
    backgroundColor:'#01303f'
  },
  input:{
      color:'white',
      backgroundColor:'#01303f',
      width:300,
      height:50,
      borderRadius:20,
      padding:10,
      marginBottom:10
  },
  button:{
    color:'#02a9f7',
    fontWeight:'bold',
    marginBottom:20,
    width:300,
    textAlign:'center',
    backgroundColor:'#01303f',
    borderRadius:20,
    height:30,
    fontSize:20
  },
  image:{
    flex: 1,
    justifyContent: 'center',
    width:600,
    alignItems:'center'
  }
});


