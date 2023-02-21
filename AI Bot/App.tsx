
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
  TouchableOpacity
} from 'react-native';
import axios from 'axios';
import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

export default function App(){
  const[data, setData] = useState([]);
  const apiKey= "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";
  const baseUrl= 'htpps://api.openai.com/v1/engines/text-davinci-002/completions';
  const [textInput, settextInput] = useState('');
  const handleSend = async () => {
    const prompt= textInput
    const response= await axios.post(baseUrl,{
      prompt:prompt,
      max_tokens:1024,
      temperature:0.5,
    },{
      headers:{
        'Content-Type' : 'application/json',
        'Authorization' : `Bearer ${apiKey}`
      }
    });
   const item= response.data.choices[0].text;  
   setData([...data,]);
   settextInput('');
  }

  return(
    <View style={styles.Container}>
      <Text style={{color:'green',fontSize:40}}>Hello User</Text>
      <FlatList
        data={data}
        keyExtractor={(item,index) => index.toString()}
        renderItem={({item}) => (
          <View style={{flexDirection:'row',padding:10}}>
              <Text style={{fontWeight:'bold',color:'green'}}></Text>
              <Text style={{color:'white'}}>{item.item}</Text>
            </View>
        )}
      />
      {
        data.map(item =>(
          <View style={{flexDirection:'row',padding:10}}>
              <Text style={{fontWeight:'bold',color:'green'}}></Text>
              <Text style={{color:'white'}}>{item.item}</Text>
            </View>
        ))
      }
      <TextInput
      style={styles.input}
      value={textInput}
      onChangeText = {text => settextInput(text)}
      placeholder='ask me anythign'
      />
      <TouchableOpacity onPress={handleSend}>
        <Text style={{color:'red',fontWeight:'bold'}}>Bas</Text>
      </TouchableOpacity>
    </View>
  )
}
const styles = StyleSheet.create({
  Container: {
    
    flex:1,
    alignItems:'center',
    backgroundColor:'black'
  },
  input:{
      color:'white',
      backgroundColor:'red',
      width:300,
      height:50
  }
});


