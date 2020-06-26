import React, { Component } from 'react'; 
import Menu from './MenuComponent';
import DishDetail from './DishdetailComponent';
import {View,Platform,StatusBar} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Home from './HomeComponent';
import About from './AboutComponent';
import Contact from './ContactComponent';

const MenuNavigator=createStackNavigator();
function MyStack() {
    return (
        <MenuNavigator.Navigator
        initialRouteName='Menu'
        screenOptions={{
            headerTintColor:'#fff',
            headerStyle:{backgroundColor:'#512DA8'},
            headerTitleStyle:{color:'#fff'}
        }}>
            <MenuNavigator.Screen name="Menu" component={Menu} 
                options={{ title: 'Menu' }}/>
            <MenuNavigator.Screen name="DishDetail" component={DishDetail} 
                options={{ title: 'Dish Details' }}/>
            
        </MenuNavigator.Navigator>
    );
}

const HomeNavigator = createStackNavigator();
function MyHome() {
    return (
        <HomeNavigator.Navigator
        initialRouteName='Home'
        screenOptions={{
            headerTintColor:'#fff',
            headerStyle:{backgroundColor:'#512DA8'},
            headerTitleStyle:{color:'#fff'}
        }}>
            <HomeNavigator.Screen name="Home" component={Home} 
                options={{ title: 'Home' }}/>
        </HomeNavigator.Navigator>
    );
}
const ContactNavigator = createStackNavigator();
function MyCont() {
    return (
        <HomeNavigator.Navigator
        initialRouteName='Contact'
        screenOptions={{
            headerTintColor:'#fff',
            headerStyle:{backgroundColor:'#512DA8'},
            headerTitleStyle:{color:'#fff'}
        }}>
            <HomeNavigator.Screen name="Contact" component={Contact} />
        </HomeNavigator.Navigator>
    );
}

const AboutNaviagtor = createStackNavigator();
function MyAbout() {
    return(
        <HomeNavigator.Navigator
        initialRouteName='Contact'
        screenOptions={{
            headerTintColor:'#fff',
            headerStyle:{backgroundColor:'#512DA8'},
            headerTitleStyle:{color:'#fff'}
        }}>
            <HomeNavigator.Screen name="About" component={About} />
        </HomeNavigator.Navigator>
    );
}

const MainNavigator = createDrawerNavigator();
function MyDrawer() {
    return (
      <MainNavigator.Navigator 
      drawerContentOptions={{
        activeTintColor: '#512DA8',
        itemStyle: { marginVertical: 5, drawerBackgroundColor: '#D1C4E9' },
      }}>
        <MainNavigator.Screen name='Home' 
            options={{drawerLabel: 'Home'}} 
            component={MyHome} />
        <MainNavigator.Screen name='About' 
            options={{drawerLabel: 'About Us'}} 
            component={MyAbout} />
        <MainNavigator.Screen name='Menu' 
            options={{drawerLabel: 'Menu'}} 
            component={MyStack} />
        
        <MainNavigator.Screen name='Contact' 
            options={{drawerLabel: 'Contact Us'}} 
            component={MyCont} />
        
      </MainNavigator.Navigator>
    );
}

class Main extends Component{
    render(){
        return(
            <View style={{flex:1,paddingTop:Platform.OS==='ios'?0:StatusBar.currentHeight}} >
                <NavigationContainer>
                    <MyDrawer />
                </NavigationContainer>
            </View>
        )
    }
}
export default Main;