import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { decrementQuantity, incrementQuantity } from '../redux/CartReducer';

const AddToCart = () => {
  const cart = useSelector((state) => state.cart.cart);
  const dispatch = useDispatch();
  const total=cart
  .map((item) => item.price*item.quantity)
  .reduce((curr,prev)=>curr+prev, 0);

  return (
    <ScrollView style={{marginTop:"50"}}>
      {total > 0 ?(
<>
<View style={{ marginTop: 16, marginHorizontal: 15, }}>
      {cart.map((item, index) => (
        <View style={styles.container} key={index}>

          <Text style={{ width: 140, fontSize: 16, fontWeight: "500" }}>{item.title}</Text>
          <Pressable style={styles.buttons}>

            <Pressable onPress={() => {
              dispatch(decrementQuantity(item))
            }}>
              <Text style={styles.operatorm}>-</Text>
            </Pressable>

            <Pressable>
              <Text style={styles.operatornum}>{item.quantity}</Text>
            </Pressable>

            <Pressable onPress={() => {
              dispatch(incrementQuantity(item))
            }}>
              <Text style={styles.operatorp}>+</Text>
            </Pressable>

          </Pressable>
          <Text style={{ fontSize: 16, fontWeight: "bold" }}>$ {item.price * item.quantity}</Text>
        </View>
      ))}
      <View style={{marginTop:40,flexDirection: "row",alignItems: "center",justifyContent:"space-between",borderTopWidth:1,padding:10,borderBottomWidth:1}}>
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>Total</Text>
        <Text style={{ fontSize: 20, fontWeight: "bold",padding:4 }}>$ {total}</Text>

      </View>

    </View>
</>
      ):(
        <View style={{flex:1,alignItems:'center',justifyContent:'center',marginTop:300}}> 
          <Text style={{textAlign:"center",fontSize:20,fontWeight:"600"}}>Your Cart is Empty !!!</Text>
        </View>
      )}
    
    </ScrollView>
  )
}

export default AddToCart

const styles = StyleSheet.create({
  buttons: {
    flexDirection: "row",
    paddingHorizontal: 10,
    paddingVertical: 5,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#BEBEBE",
    borderRadius: 10
  },
  operatorm: {
    fontWeight: "600",
    color:"#EC6EAD",
    paddingHorizontal: 6,
    fontSize: 20
  },
  operatorp: {
    fontWeight: "600",
    color:"#3494E6",
    paddingHorizontal: 6,
    fontSize: 20
  },
  operatornum: {
    fontWeight: "600",
    color:"#904e95",
    paddingHorizontal: 6,
    fontSize: 20
  },

  container: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
    justifyContent: "space-between",

  }
})