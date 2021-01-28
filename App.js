import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import MapScreen from './MapScreen';
import SearchScreen from './SearchScreen';


const AppStackNavigator = createStackNavigator({
  Main:{
    screen: MapScreen // MainScreen 컴포넌트를 네비게이터에 등록
  },
  Search: {
    screen : SearchScreen
},
});

export default createAppContainer(AppStackNavigator);