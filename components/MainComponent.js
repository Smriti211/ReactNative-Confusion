import React, { Component } from 'react'; 
import Menu from './MenuComponent';
import DishDetail from './DishdetailComponent';
import { View, Platform, StatusBar,Image, ScrollView, StyleSheet, Text, SafeAreaView, ToastAndroid } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator, DrawerItemList } from '@react-navigation/drawer';
import Home from './HomeComponent';
import About from './AboutComponent';
import Contact from './ContactComponent';
import Reservation from './ReservationComponent';
import Favorites from "./FavoriteComponent";
import { Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import { fetchDishes, fetchComments, fetchPromos, fetchLeaders } from '../redux/ActionCreators';
import Login from './LoginComponent';
import NetInfo from '@react-native-community/netinfo';

const mapStateToProps = state => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    promotions: state.promotions,
    leaders: state.leaders
  }
}

const mapDispatchToProps = dispatch => ({
    fetchDishes: () => dispatch(fetchDishes()),
    fetchComments: () => dispatch(fetchComments()),
    fetchPromos: () => dispatch(fetchPromos()),
    fetchLeaders: () => dispatch(fetchLeaders())
})

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

const LoginNavigator = createStackNavigator();
function MyLogin() {
    return (
        <LoginNavigator.Navigator
            initialRouteName='Login'
            screenOptions={{
                headerTintColor:'#fff',
                headerStyle:{backgroundColor:'#512DA8'},
                headerTitleStyle:{color:'#fff'}
            }}>
            <LoginNavigator.Screen name="Login" component={Login} 
                options={ ({navigation}) => ({
                    headerLeft: () => (
                        <Icon name='menu' size={24} color='white' onPress={() => navigation.toggleDrawer()} />
                    ) }) } />
        </LoginNavigator.Navigator>
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
        <ContactNavigator.Navigator
            initialRouteName='Contact'
            screenOptions={{
                headerTintColor:'#fff',
                headerStyle:{backgroundColor:'#512DA8'},
                headerTitleStyle:{color:'#fff'}
            }}>
            <ContactNavigator.Screen name="Contact" component={Contact} 
                options = { ({navigation}) => ({
                    headerLeft: () => (
                        <Icon name='menu' size={24} color='white' 
                            onPress={() => navigation.toggleDrawer()}
                        />
                    ) }) } />
        </ContactNavigator.Navigator>
    );
}

const AboutNavigator = createStackNavigator();
function MyAbout() {
    return(
        <AboutNavigator.Navigator
            initialRouteName='Contact'
            screenOptions={{
                headerTintColor:'#fff',
                headerStyle:{backgroundColor:'#512DA8'},
                headerTitleStyle:{color:'#fff'}
            }}>
            <AboutNavigator.Screen name="About" component={About}
                options={ ({navigation}) => ({
                    headerLeft: () => (
                        <Icon name='menu' size={24} color='white'
                            onPress={() => navigation.toggleDrawer()}
                        />
                    ) }) } />
        </AboutNavigator.Navigator>
    );
}

const ReservationNavigator = createStackNavigator();
function MyReserve() {
    return(
        <ReservationNavigator.Navigator
            initialRouteName='Reservation'
            screenOptions={{
                headerTintColor:'#fff',
                headerStyle:{backgroundColor:'#512DA8'},
                headerTitleStyle:{color:'#fff'}
            }}>
            <ReservationNavigator.Screen name="Reservation" component={Reservation}
                options={ ({navigation}) => ({
                    headerLeft: () => (
                        <Icon name='menu' size={24} color='white'
                            onPress={() => navigation.toggleDrawer()}
                        />
                    ) 
                }) } />
        </ReservationNavigator.Navigator>
    );
}

const FavoriteNavigator = createStackNavigator();
function MyFav() {
    return(
        <FavoriteNavigator.Navigator
            initialRouteName='Favorites'
            screenOptions={{
                headerTintColor:'#fff',
                headerStyle:{backgroundColor:'#512DA8'},
                headerTitleStyle:{color:'#fff'}
            }}>
            <FavoriteNavigator.Screen name="Favorites" component={Favorites}
                options={ ({navigation}) => ({
                    headerLeft: () => (
                        <Icon name='menu' size={24} color='white'
                            onPress={() => navigation.toggleDrawer()}
                        />
                    ) 
                }) } />
        </FavoriteNavigator.Navigator>
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
        initialRouteName={Home}
        drawerContentOptions={{ activeTintColor: '#512DA8',
            itemStyle: { marginVertical: 5, drawerBackgroundColor: '#D1C4E9' } }}
        drawerContent={props => <CustomDrawerContentComponent {...props}/> }
        >
        <MainNavigator.Screen name='Login' 
            options={{drawerLabel: 'Login',
            drawerIcon: ({ tintColor, focused }) => (
                <Icon name='sign-in' type='font-awesome' size={24} color={tintColor} />
            )}} 
            component={MyLogin} />
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
        <MainNavigator.Screen name='Favorites' 
            options={{drawerLabel: 'My Favorite',
            drawerIcon: ({ tintColor, focused }) => (
                <Icon name='heart' type='font-awesome' size={24} color={tintColor} />
            )}} 
            component={MyFav} />
        <MainNavigator.Screen name='Reservation' 
            options={{drawerLabel: 'Reserve Table', drawerIcon: ({ tintColor, focused }) => (
                <Icon
                  name='cutlery'
                  type='font-awesome'            
                  size={24}
                  color={tintColor}
                />
              )}} 
            component={MyReserve} />         
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
    componentDidMount() {
        this.props.fetchDishes();
        this.props.fetchComments();
        this.props.fetchPromos();
        this.props.fetchLeaders();
        NetInfo.fetch().then((connectionInfo) => {
            ToastAndroid.show('Initial Network Connectivity Type: '
                + connectionInfo.type, ToastAndroid.LONG)
        });
        
        NetInfo.addEventListener(connectionChange => this.handleConnectivityChange(connectionChange))
    }
    
    componentWillUnmount() {
        NetInfo.removeEventListener(connectionChange => this.handleConnectivityChange(connectionChange))
    }

    handleConnectivityChange = (connectionInfo) => {
        switch (connectionInfo.type) {
          case 'none':
            ToastAndroid.show('You are now offline!', ToastAndroid.LONG);
            break;
          case 'wifi':
            ToastAndroid.show('You are now connected to WiFi!', ToastAndroid.LONG);
            break;
          case 'cellular':
            ToastAndroid.show('You are now connected to Cellular!', ToastAndroid.LONG);
            break;
          case 'unknown':
            ToastAndroid.show('You now have unknown connection!', ToastAndroid.LONG);
            break;
          default:
            break;
        }
    }

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
export default connect(mapStateToProps, mapDispatchToProps)(Main);