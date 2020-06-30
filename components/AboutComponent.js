import React, { Component } from 'react';
import { Text, ScrollView } from 'react-native';
import { Card, ListItem } from 'react-native-elements';
import { FlatList } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';

const mapStateToProps = state => {
    return {
      leaders: state.leaders
    }
  }

class About extends Component {

    render() {

        const renderLeaders = ({item,index}) => {
            return(
                <ListItem
                key={index}
                title={item.name}
                titleStyle = {{color: 'black'}}
                subtitle={item.description}
                hideChevron={true}
                leftAvatar={{source:{ uri: baseUrl + item.image }}}
                />
            );
        }
        const {navigate}=this.props.navigation;
        return(
            <ScrollView>
                <Card title='Our History' titleStyle={{textAlign:'center'}}>
                    <Text>Started in 2010, Ristorante con Fusion quickly established itself as a culinary icon par excellence in Hong Kong. With its unique brand of world fusion cuisine that can be found nowhere else, it enjoys patronage from the A-list clientele in Hong Kong.  Featuring four of the best three-star Michelin chefs in the world, you never know what will arrive on your plate the next time you visit us.
</Text>
                    <Text>The restaurant traces its humble beginnings to The Frying Pan, a successful chain started by our CEO, Mr. Peter Pan, that featured for the first time the world's best cuisines in a pan.</Text>
                </Card>
                <Card title='Corporate Leadership' titleStyle={{textAlign: 'center'}}>
                    <FlatList  
                        data = {this.props.leaders.leaders}
                        renderItem={renderLeaders}
                        keyExtractor={item => item.id.toString()} />
                </Card>
            </ScrollView>
        );
    }
}
export default connect(mapStateToProps)(About);