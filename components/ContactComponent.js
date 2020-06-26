import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Card } from 'react-native-elements';


class Contact extends Component {
    render() {
        return(
            <View>
                <Card title='Contact Information' titleStyle={{textAlign: 'center'}}>
                <Text>121, Clear Water Bay Road</Text>
                <Text>Clear Water Bay, Kowloon</Text>
                <Text>HONG KONG</Text>
                <Text>Tel: +852 1234 5678</Text>
                <Text>Email:confusion@food.net</Text>
                <Text>Fax: +852 8765 4321</Text>
                </Card>
            </View>
        );
    }
}
export default Contact;