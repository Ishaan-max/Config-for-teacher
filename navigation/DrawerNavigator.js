import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import StackNavigator from "./StackNavigator";
import Profile from "../screens/Profile";
import Logout from "../screens/Logout";
import firebase from 'firebase'
import CustomSideBarMenu from "../screens/CustomSideBarMenu"


const Drawer = createDrawerNavigator();
let customFonts = {
    "Bubblegum-Sans": require("../assets/fonts/BubblegumSans-Regular.ttf")
  };
  

export default class DrawerNavigator extends component {
    constructor(props){
        super(props);
        this.state={
            fontsLoaded: false,
            light_theme: true
        }
    }
    componentDidMount(){
        let theme;
        firebase
        .database()
        .ref("users/"+firebase.auth().currentUser.uid)
        .on("value",function(snapshot){
            theme=snapshot.val().current_theme
        })
        this.setState({light_theme:theme==="light"?true:false})

    }
    render(){
    return (
        <Drawer.Navigator
            drawerContentOptions={{activeTintColor:"red",
        inactiveTintColor:this.state.light_theme?"black":"white",
        itemStyle:{marginVertical:5},
        }}
        drawerContent={(props)=><CustomSideBarMenu{...props}/>}>

            <Drawer.Screen name="Home" component={StackNavigator} />

            <Drawer.Screen name="Profile" component={Profile} />
            <Drawer.Screen name="Logout" component={Logout} />
        </Drawer.Navigator>
    );
}}

