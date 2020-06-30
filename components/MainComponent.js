import React, { Component } from 'react'; 
import Menu from './MenuComponent';
import DishDetail from './DishdetailComponent';
import { View, Platform, StatusBar,Image, ScrollView, StyleSheet, Text, SafeAreaView} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator, DrawerItemList } from '@react-navigation/drawer';
import Home from './HomeComponent';
import About from './AboutComponent';
import Contact from './ContactComponent';
import { Icon } from 'react-native-elements';

const MenuNavigator=createStackNavigator();
function MyStack() {
    return (
        <MenuNavigator.Navigator
            initialRouteName='Menu'
            screenOptions={{
                headerTintColor:'#fff',
                headerStyle:{backgroundColor:'#512DA8'},
                headerTitleStyle:{color:'#fff'}
            }} >
                
            <MenuNavigator.Screen name="Menu" component={Menu} 
                options={ ({navigation}) => ({
                    headerLeft: () => ( <Icon name='menu' size={24} color='white' onPress={() => navigation.toggleDrawer()} />
                    ) }) }  />
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
                options={ ({navigation}) => ({
                    headerLeft: () => (
                        <Icon name='menu' size={24} color='white' onPress={() => navigation.toggleDrawer()} />
                    ) }) } />
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
            <HomeNavigator.Screen name="Contact" component={Contact} 
                options = { ({navigation}) => ({
                    headerLeft: () => (
                        <Icon name='menu' size={24} color='white' 
                            onPress={() => navigation.toggleDrawer()}
                        />
                    ) }) } />
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
            <HomeNavigator.Screen name="About" component={About}
                options={ ({navigation}) => ({
                    headerLeft: () => (
                        <Icon name='menu' size={24} color='white'
                            onPress={() => navigation.toggleDrawer()}
                        />
                    ) }) } />
        </HomeNavigator.Navigator>
    );
}

const CustomDrawerContentComponent = (props) => (
    <ScrollView>
        <View style={styles.drawerHeader}>
            <View style={{flex: 1}}>
                <Image 
                    source={require('./images/logo.png')}
                    style={styles.drawerImage}
                />
            </View>
            <View style={{flex: 2}}>
                <Text style={styles.drawerHeaderText}>
                    Ristorante Con Fusion
                </Text>
            </View>
        </View>
        <DrawerItemList {...props}/>
    </ScrollView>
);

const MainNavigator = createDrawerNavigator();
function MyDrawer() {
    return (
    <MainNavigator.Navigator  
        drawerContentOptions={{ activeTintColor: '#512DA8',
            itemStyle: { marginVertical: 5, drawerBackgroundColor: '#D1C4E9' } }}
        drawerContent={props => <CustomDrawerContentComponent {...props}/> }
        >
        <MainNavigator.Screen name='Home' 
            options={{drawerLabel: 'Home',
            drawerIcon: ({ tintColor, focused }) => (
                <Icon name='home' type='font-awesome' size={24} color={tintColor} />
            )}} 
            component={MyHome} />
        <MainNavigator.Screen name='About' 
            options={{drawerLabel: 'About Us', 
            drawerIcon: ({ tintColor, focused }) => (
                <Icon
                  name='info-circle'
                  type='font-awesome'            
                  size={24}
                  color={tintColor}
                />
              )}} 
            component={MyAbout} />
        <MainNavigator.Screen name='Menu' 
            options={{drawerLabel: 'Menu', drawerIcon: ({ tintColor, focused }) => (
                <Icon
                  name='list'
                  type='font-awesome'            
                  size={24}
                  color={tintColor}
                />
              )}} 
            component={MyStack} />
        <MainNavigator.Screen name='Contact' 
            options={{drawerLabel: 'Contact Us', drawerIcon: ({ tintColor, focused }) => (
                <Icon
                  name='address-card'
                  type='font-awesome'            
                  size={24}
                  color={tintColor}
                />
              )}} 
            component={MyCont} /> 
      </MainNavigator.Navigator>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    drawerHeader: {
      backgroundColor: '#512DA8',
      height: 140,
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1,
      flexDirection: 'row'
    },
    drawerHeaderText: {
      color: 'white',
      fontSize: 24,
      fontWeight: 'bold'
    },
    drawerImage: {
      margin: 10,
      width: 80,
      height: 60
    }
});

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