import { FlatList, Image, Pressable, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, decrementQuantity, incrementQuantity, removeFromCart } from '../redux/CartReducer';
import { useNavigation } from '@react-navigation/native';

const SearchFilter = ({data,input}) => {
 
    const cart = useSelector((state) => state.cart.cart)
    const dispatch = useDispatch();
    const [additems, setAdditems] = useState(0);
    const [selectedItemId, setSelectedItemId] = useState(null); // Track selected item ID
    const navigation = useNavigation();
    
    const total = cart.map((item) => item.price * item.quantity).reduce((curr, prev) => curr + prev, 0);
    console.log(total)

    const handleAddToCart = (item) => {
      if (selectedItemId === item.id) {
          // If the selected item is the same as the current item, increment the quantity
          setAdditems((c) => c + 1);
          dispatch(incrementQuantity(item));
      } else {
          setSelectedItemId(item.id); // Set the selected item
          setAdditems(1); // Initialize quantity to 1
          dispatch(addToCart(item));
      }
  }

  const handleRemoveFromCart = (item) => {
      if (selectedItemId === item.id && additems > 1) {
          // If the selected item is the same as the current item and quantity > 1, decrement the quantity
          setAdditems((c) => c - 1);
          dispatch(decrementQuantity(item));
      } else if (selectedItemId === item.id && additems === 1) {
          // If the selected item is the same as the current item and quantity is 1, remove from cart
          setSelectedItemId(null);
          setAdditems(0);
          dispatch(removeFromCart(item));
      }
  }


  
  return (
    <View style={{}}>
      
      <FlatList
       data={data} 
       columnWrapperStyle={{ justifyContent: "space-evenly" }}
       keyExtractor={(item) => item.id.toString()}
      numColumns={2}
      renderItem={({item})=>{
      if(input===" "){
        return (
          <View>
          <View style={styles.item}>
              <TouchableOpacity >
                  <Entypo name="heart-outlined" size={24} color="black" />
              </TouchableOpacity>
              <Image style={styles.image} source={{ uri: item.image }} />

              <View>
                  <Text style={styles.description}>{item.title}</Text>

                  <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                      <View>
                          <Text style={styles.price}>$ {item.price}</Text>
                      </View>
                      {selectedItemId === item.id ? (
                          <View style={styles.buttonsStyle}>

                              <Pressable onPress={() => handleRemoveFromCart(item)}>

                                  <AntDesign name="minuscircleo" size={18} color="#EC6EAD" />

                              </Pressable>

                              <Pressable>
                                  <Text style={{ fontSize: 16, color: "#904e95", fontWeight: "500" }}>{additems}</Text>
                              </Pressable>


                              <Pressable onPress={() => handleAddToCart(item)}>

                                  <AntDesign name="pluscircleo" size={18} color="#3494E6" />
                              </Pressable>
                          </View>

                      ) : (
                          <View style={{ flexDirection: "row", gap: 7, marginTop: 10, }}>
                              <Pressable onPress={() => handleAddToCart(item)}>
                                  <View style={styles.Add}>

                                      <Text style={{ fontSize: 15, fontWeight: "500", color: "#EC6EAD" }}>ADD</Text>

                                      <AntDesign name="shoppingcart" size={20} color="#3494E6" />

                                  </View>
                              </Pressable>

                          </View>
                      )}

                  </View>

              </View>

          </View>
      </View>
        )
      }
      if(item.title.toLowerCase().includes(input.toLowerCase())){
        return (
          <ScrollView>
          <View style={styles.item}>
              <TouchableOpacity >
                  <Entypo name="heart-outlined" size={24} color="black" />
              </TouchableOpacity>
              <Image style={styles.image} source={{ uri: item.image }} />

              <View>
                  <Text style={styles.description}>{item.title}</Text>

                  <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                      <View>
                          <Text style={styles.price}>$ {item.price}</Text>
                      </View>
                      {selectedItemId === item.id ? (
                          <View style={styles.buttonsStyle}>

                              <Pressable onPress={() => handleRemoveFromCart(item)}>

                                  <AntDesign name="minuscircleo" size={18} color="#EC6EAD" />

                              </Pressable>

                              <Pressable>
                                  <Text style={{ fontSize: 16, color: "#904e95", fontWeight: "500" }}>{additems}</Text>
                              </Pressable>


                              <Pressable onPress={() => handleAddToCart(item)}>

                                  <AntDesign name="pluscircleo" size={18} color="#3494E6" />
                              </Pressable>
                          </View>

                      ) : (
                          <View style={{ flexDirection: "row", gap: 7, marginTop: 10, }}>
                              <Pressable onPress={() => handleAddToCart(item)}>
                                  <View style={styles.Add}>

                                      <Text style={{ fontSize: 15, fontWeight: "500", color: "#EC6EAD" }}>ADD</Text>

                                      <AntDesign name="shoppingcart" size={20} color="#3494E6" />

                                  </View>
                              </Pressable>

                          </View>
                      )}

                  </View>

              </View>

          </View>
          
    
      </ScrollView>
        )
      }
      }}/>
    </View>
  )
}

export default SearchFilter

const styles = StyleSheet.create({
  searchcontainer: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginBottom: 15
},
search: {
    padding: 10,
    flexDirection: "row",
    width: "80%",
    borderRadius: 25,
    alignItems: "center",
    backgroundColor: "white"
},
filtericon: {
    backgroundColor: "white",
    padding: 8,
    borderRadius: 10
},
header: {
    flexDirection: "row",
    marginBottom: 12,
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 20
},
item: {

    height: 300,
    borderRadius: 20,
    marginBottom: 15,
    margin: 10,
    marginHorizontal: 2,
    padding: 15,
    backgroundColor: "white",
    width: 190

},
image: {

    margin: 10,
    flex: 1,
    resizeMode: 'contain',
},
price: {
    color: "#301934",
    marginTop: 7,
    fontSize: 16,
    fontWeight: 'bold',
},
description: {
    color: "#36454F",
    marginTop: 10,
    fontSize: 13,
    fontWeight: "500",

},
buttonsStyle: {
    flexDirection: "row",
    gap: 6,
    marginTop: 10,
    borderWidth: 1,
    alignItems: "center",
    padding: 3,
    borderRadius: 7,
    borderColor: "grey"
},
Add: {
    flexDirection: "row",
    borderWidth: 1,
    padding: 4,
    gap: 5,
    borderRadius: 7
}
})