import React, { Component } from 'react'; 
import Menu from './MenuComponent';
import DishDetail from './Dishdetailcomponent';
import {View,Platform,StatusBar} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

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

class Main extends Component{
    render(){
        return(
            <View style={{flex:1,paddingTop:Platform.OS==='ios'?0:StatusBar.currentHeight}} >
                <NavigationContainer>
                    <MyStack/>
                </NavigationContainer>
            </View>
        )
    }
}
export default Main;