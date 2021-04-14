import React from 'react';
import { Text, View,ScrollView,StyleSheet,TextInput,TouchableOpacity } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import db from '../config'

export default class Searchscreen extends React.Component {
  constructor(props){
    super(props);
    this.state={
      allTransactions:[],
      lastVisibleTransaction:null,
      search:''
    }
  }
  componentDidMount=async()=>{
    var query= await db.collection("transaction").get();
    query.docs.map((doc)=>{
      this.setState({
        allTransactions:[...this.state.allTransactions,doc.data()],
        lastVisibleTransaction: doc
      })
    }

    )
  }
  fetchMoreTransactions = async ()=>{
    var text = this.state.search.toUpperCase()
    var enteredText = text.split("")

    
    if (enteredText[0].toUpperCase() ==='B'){
    const query = await db.collection("transaction").where('bookId','==',text).startAfter(this.state.lastVisibleTransaction).limit(10).get()
    query.docs.map((doc)=>{
      this.setState({
        allTransactions: [...this.state.allTransactions, doc.data()],
        lastVisibleTransaction: doc
      })
    })
  }
    else if(enteredText[0].toUpperCase() === 'S'){
      const query = await db.collection("transaction").where('studentId','==',text).startAfter(this.state.lastVisibleTransaction).limit(10).get()
      query.docs.map((doc)=>{
        this.setState({
          allTransactions: [...this.state.allTransactions, doc.data()],
          lastVisibleTransaction: doc
        })
      })
    }
}

  searchTransactions= async(text) =>{
    var enteredText = text.split("")  
    if (enteredText[0].toUpperCase() ==='B'){
      const transaction =  await db.collection("transaction").where('bookId','==',text).get()
      transaction.docs.map((doc)=>{
        this.setState({
          allTransactions:[...this.state.allTransactions,doc.data()],
          lastVisibleTransaction: doc
        })
      })
    }
    else if(enteredText[0].toUpperCase() === 'S'){
      const transaction = await db.collection('transaction').where('studentId','==',text).get()
      transaction.docs.map((doc)=>{
        this.setState({
          allTransactions:[...this.state.allTransactions,doc.data()],
          lastVisibleTransaction: doc
        })
      })
    }
  }
    render() {
      return (
        <View style={styles.container}>
        <View style={styles.searchBar}>
      <TextInput 
        style ={styles.bar}
        placeholder = "Enter Book Id or Student Id"
        onChangeText={(text)=>{this.setState({search:text})}}/>
        <TouchableOpacity
          style = {styles.searchButton}
          onPress={()=>{this.searchTransactions(this.state.search)}}
        >
          <Text>Search</Text>
        </TouchableOpacity>
        </View >
        <FlatList
        data={this.state.allTransactions}
        renderItem={({item})=>(
          <View style={{borderBottomWidth: 2,marginTop:50}}>
            <Text>{"Book Id: " + item.bookId}</Text>
            <Text>{"Student id: " + item.studentId}</Text>
            <Text>{"Transaction Type: " + item.transactionType}</Text>
            <Text>{"Date: " + item.date.toDate()}</Text>
          </View>
        )}
        keyExtractor= {(item, index)=> index.toString()}
        onEndReached ={this.fetchMoreTransactions}
        onEndReachedThreshold={0.5}
      /> 
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50
  },
  searchBar:{
    flexDirection:'row',
    height:40,
    width:'auto',
    borderWidth:0.5,
    alignItems:'center',
    backgroundColor:'grey',

  },
  bar:{
    borderWidth:2,
    height:30,
    width:300,
    paddingLeft:10,
  },
  searchButton:{
    borderWidth:1,
    height:30,
    width:50,
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:'green'
  }
})