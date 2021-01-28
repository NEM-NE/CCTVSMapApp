import React from 'react';
import { StyleSheet, Text, View, Image } from "react-native";

const Loading = (props) => {

    return (
        <View style={styles.container}>
            <Image source={require("./assets/logo.jpg")}>
            </Image>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default Loading;