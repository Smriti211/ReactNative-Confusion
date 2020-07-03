import React, { Component } from 'react';
import {View,Text, ScrollView, FlatList, Image, Button, Modal, StyleSheet} from 'react-native';
import {Card, Icon, Rating, Input } from 'react-native-elements'; 
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import { postComment, postFavorite } from '../redux/ActionCreators';
import * as Animatable from 'react-native-animatable';

const mapStateToProps = state => {
    return {
      dishes: state.dishes,
      comments: state.comments,
      favorites: state.favorites
    }
}

const mapDispatchToProps = dispatch => ({
    postFavorite: (dishId) => dispatch(postFavorite(dishId)),
    postComment: (dishId, rating, author, comment) => dispatch(postComment(dishId, rating, author, comment))
})

function RenderDish(props){
    const dish=props.dish;
    if(dish!=null){
        return(
        <Animatable.View animation='fadeInDown' duration={2000} delay={1000}>
            <Card featuredTitle={dish.name} image={{uri: baseUrl + dish.image }}>
                <Text style={{margin:10}}>{dish.description}</Text>
                <View style={{flex:1,flexDirection:'row',justifyContent:'center'}}>
                    <Icon
                        raised
                        reverse
                        name={ props.favorite ? 'heart' : 'heart-o'}
                        type='font-awesome'
                        color='#f50'
                        onPress={() => props.favorite ? console.log('Already favorite') : props.onPress()}
                        />
                    <Icon
                        raised
                        reverse
                        name='pencil'
                        type='font-awesome'
                        color='#512DA8'
                        onPress={() => props.onClick()}
                        />
                </View>    
            </Card>
        </Animatable.View>
        );
    }
    else{
        return (<View></View>)
    }
}

function RenderComments(props) {
    const comments = props.comments;
    const renderCommentItem = ({item, index}) => {
        return(
            <View key={index} style={{margin: 10}}>
                <Text style={{fontSize:14}}>{item.comment}</Text>
                <Text style={{fontSize: 12}}>{item.rating} Stars</Text>
                <Text style={{fontSize: 12}}>{'-- ' + item.author + ', ' + item.date}</Text>
            </View>
        );
    }

    return(
        <Animatable.View animation='fadeInUp' duration={2000} delay={1000}>
            <Card title="Comments">
                <FlatList data={comments}
                    renderItem={renderCommentItem}
                    keyExtractor={item => item.id}
                    />
            </Card>
        </Animatable.View>
    );
}

class DishDetail extends Component{

    constructor(props){
        super(props);
        this.state = {
            rating: 0,
            author: '',
            comment: '',
            showModal: false
        }
    }

    toggleModal() {
        this.setState({showModal: !this.state.showModal});
    }
    
    handleForm(dishId) {
        this.props.postComment(dishId, this.state.rating, this.state.author, this.state.comment);
        this.toggleModal();
        this.resetForm();
    }

    resetForm() {
        this.setState({
            rating: 0,
            author: '',
            comment: ''
        })
    }

    markFavorite(dishId) {
        this.props.postFavorite(dishId);
    }

    render(){
        const dishId=this.props.route.params.dishId;
        return(
            <ScrollView>
                <RenderDish 
                    dish={this.props.dishes.dishes[+dishId]}
                    favorite={this.props.favorites.some(el => el === dishId)}
                    onPress={() => this.markFavorite(dishId)}
                    onClick={() => this.handleForm()} 
                    />
                <Modal 
                    animationType = {"slide"} 
                    transparent = {false}
                    visible = {this.state.showModal}
                    onDismiss = {() => this.toggleModal() }
                    onRequestClose = {() => this.toggleModal() }>
                    <View style = {styles.modal}>
                        <View style = {{justifyContent:'center'}}>
                            <Rating 
                                showRating
                                type = 'star'
                                fractions = {0}
                                imageSize = {40}
                                onFinishRating = {(rating) => this.setState({rating: rating})} />
                        </View>
                        <View>
                            <Input
                                placeholder= 'Author'
                                leftIcon={
                                    <Icon
                                        name='user-o'
                                        type='font-awesome'
                                        size={24} 
                                        />
                            }
                            onChangeText = {(value) => this.setState({author: value})}
                            />
                        </View>
                        <View>
                            <Input
                                placeholder= 'Comment'
                                leftIcon={
                                    <Icon
                                        name='comment-o'
                                        type='font-awesome'
                                        size={24} 
                                        />
                            }
                            onChangeText = {(value) => this.setState({comment: value})}
                            />
                        </View>
                        <View>
                            <Button 
                                color = "#512DA8"
                                title = 'SUBMIT'
                                onPress = {() => this.handleForm(dishId)}
                                />
                        </View>
                        <View style={{marginTop: 20}}>
                            <Button 
                                color = "#989898"
                                title = 'CLOSE'
                                onPress = {() => {this.toggleModal(); this.resetForm();}}
                                />
                        </View>  
                    </View>
                </Modal>    
                <RenderComments comments={this.props.comments.comments.filter((comment) => comment.dishId === dishId)} />
            </ScrollView>
        );
    }  
}

const styles = StyleSheet.create({
    modal: {
        justifyContent: 'center',
         margin: 20
     },
      modalTitle: {
          fontSize: 24,
          fontWeight: 'bold',
          backgroundColor: '#512DA8',
          textAlign: 'center',
          color: 'white',
          marginBottom: 20
      },
      modalText: {
          fontSize: 18,
          margin: 10
      }
})

export default connect(mapStateToProps, mapDispatchToProps)(DishDetail);