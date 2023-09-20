import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import ProductScreen from "./Screens/ProductScreen";

import { Ionicons, Entypo, Foundation } from '@expo/vector-icons';

import SettingsScreen from "./Screens/SettingsScreen";
import LoginScreen from "./Screens/LoginScreen";
import SignupScreen from "./Screens/SignupScreen";
import { LinearGradient } from "expo-linear-gradient";
import AddToCart from "./Screens/AddToCart";
const Navigation = () => {
    const Stack = createNativeStackNavigator();
    const Tab = createBottomTabNavigator();



    function BottomTabs() {
        return (
<LinearGradient colors={["#3494E6","#904e95" ,"#EC6EAD"]} style={{ flex: 1 }}>
            <Tab.Navigator
                screenOptions={{
                    headerShown: false,
                    gestureEnabled: true,
                    gestureDirection: 'horizontal',
                    tabBarStyle: {
                       borderRadius:35,
                        alignItems: "center",
                        backgroundColor:"white",
                        width:"70%",
                        marginLeft:"auto",
                        marginRight:"auto",
                        marginBottom:10,
                        marginTop:10
                    },
                }}
            >
                <Tab.Screen name="Homez" component={ProductScreen}
                    options={{
                        tabBarShowLabel: false,
                        tabBarLabelStyle: { color: "black" },
                        headerShown: false,
                        tabBarIcon: ({ focused }) =>
                            focused ? (
                                <Ionicons name="home" size={24} color="#E3735E" />
                            ) : (
                                <Ionicons name="home-outline" size={24} color="black" />
                            ),

                    }}
                />
                <Tab.Screen name="Setting" component={SettingsScreen}
                    options={{
                        tabBarShowLabel: false,
                        tabBarLabelStyle: { color: "black" },
                        headerShown: false,
                        tabBarIcon: ({ focused }) =>
                            focused ? (
                                <Ionicons name="settings" size={24} color="#E3735E" />
                            ) : (
                                <Ionicons name="settings-outline" size={24} color="black" />
                            ),

                    }}
                />


            </Tab.Navigator>
            </LinearGradient>
        )

    }



    return (

        <NavigationContainer>

            <Stack.Navigator>
            <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Signup" component={SignupScreen} options={{ headerShown: false }} />

                <Stack.Screen name="Main" component={BottomTabs} options={{ headerShown: false }} />
                <Stack.Screen name="Mycart" component={AddToCart} options={{ headerShown: true}} />

           




            </Stack.Navigator>

        </NavigationContainer>
    )
}
export default Navigation;