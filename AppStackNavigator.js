import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import MainView from './MainView';
import SearchScreen from './SearchScreen';

const AppStackNavigator = createStackNavigator({
  Main:{
    screen: MainView // MainScreen 컴포넌트를 네비게이터에 등록
  },
  Search: {
      screen : SearchScreen
  },
});

export default createAppContainer(AppStackNavigator);