import React from 'react';
import { StyleSheet, Image, View, Text, TouchableOpacity } from 'react-native';
import { Icon } from 'native-base'; // 추가된 코드
import { withNavigation } from 'react-navigation';

class SearchBtn extends React.Component {
    render() {
        return (
            <TouchableOpacity onPress={() => this.props.navigation.navigate('Search')}>
                <Icon name='ios-search' style={{ paddingRight: 10 }} />
            </TouchableOpacity>
        );
    }
}

export default withNavigation(SearchBtn);

