import { FlatList, Image, Pressable, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Feather } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, decrementQuantity, incrementQuantity, removeFromCart } from '../redux/CartReducer';
import { useNavigation } from '@react-navigation/native';
import SearchFilter from '../Components/SearchFilter';


const ProductScreen = () => {

    const [data, setData] = useState([]);
    const cart = useSelector((state) => state.cart.cart)
    const dispatch = useDispatch();
    const [additems, setAdditems] = useState(0);
    const [selectedItemId, setSelectedItemId] = useState(null); // Track selected item ID
    const navigation = useNavigation();
    const [input,setInput]=useState("");
    const total = cart.map((item) => item.price * item.quantity).reduce((curr, prev) => curr + prev, 0);
    console.log(total)


    useEffect(() => {
        // Fetch data from the API
        fetch('https://fakestoreapi.com/products')
            .then((res) => res.json())
            // .then((json) => setData(json));
            .then(response => {
                console.log(response);
                setData(response);

            })

    }, []);
    // const handleAddToCart = (item) => {
    //     if (selectedItemId === item.id) {
    //         // If the selected item is the same as the current item, increment the quantity
    //         setAdditems((c) => c + 1);
    //         dispatch(incrementQuantity(item));
    //     } else {
    //         setSelectedItemId(item.id); // Set the selected item
    //         setAdditems(1); // Initialize quantity to 1
    //         dispatch(addToCart(item));
    //     }
    // }

    // const handleRemoveFromCart = (item) => {
    //     if (selectedItemId === item.id && additems > 1) {
    //         // If the selected item is the same as the current item and quantity > 1, decrement the quantity
    //         setAdditems((c) => c - 1);
    //         dispatch(decrementQuantity(item));
    //     } else if (selectedItemId === item.id && additems === 1) {
    //         // If the selected item is the same as the current item and quantity is 1, remove from cart
    //         setSelectedItemId(null);
    //         setAdditems(0);
    //         dispatch(removeFromCart(item));
    //     }
    // }
    // const heart = () => {
    //     <FontAwesome5 name="shopping-cart" size={24} color="black" />
    // }
    const nextPage = () => {
        navigation.navigate("Mycart")
    }


    return (
        <LinearGradient colors={["#3494E6", "#904e95", "#EC6EAD"]} style={{ flex: 1 }}>
            <SafeAreaView style={styles.container}>
                <View style={styles.header}>
                    <View>
                        <Text style={{ fontSize: 23, fontWeight: 500, color: "black" }}>beespoke.ai</Text>
                    </View>
                    <TouchableOpacity onPress={nextPage}>
                        <FontAwesome5 name="shopping-cart" size={24} color="black" />
                    </TouchableOpacity>
                </View>


                <View style={styles.searchcontainer}>
                    <View style={styles.search}>
                        <Feather name="search" size={24} color="black" style={{ marginLeft: 1, marginRight: 4 }} />
                        <TextInput
                            value={input} onChangeText={(text) => setInput(text)}
                            style={{ fontSize: 15 }} placeholder="search" />
                    </View>
                    <AntDesign name="filter" size={24} color="black" style={styles.filtericon} />
                </View>

                <View style={{ margin: 10 }}>
                    <SearchFilter data={data} input={input} setInput={setInput}  />
                </View>


                {/* <View style={styles.products}>
                    <FlatList
                        data={data}
                        columnWrapperStyle={{ justifyContent: "space-evenly" }}
                        keyExtractor={(item) => item.id.toString()}
                        numColumns={2}
                        renderItem={({ item }) => (
                            <View>
                                <View style={styles.item}>
                                    <TouchableOpacity onPress={heart}>
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
                        )}

                    />
                </View> */}

            </SafeAreaView>
        </LinearGradient>

    )
}

export default ProductScreen

const styles = StyleSheet.create({
    container: {

    },
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