import React from 'react';
import { StyleSheet, Image, View, Text, TouchableOpacity } from 'react-native';
import { Icon } from 'native-base'; // 추가된 코드
import { withNavigation, navigation } from 'react-navigation';
import MapView, { Marker, PROVIDER_GOOGLE, MAP_TYPES } from 'react-native-maps';
import iksonData from './ikson.json';
import SearchBtn from './SearchBtn';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    text: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    iconImg: {
        width:30,
        height:30,
        padding:10,
        marginLeft:5,
    }
  });

class MainScreen extends React.Component {
  constructor(props) {
    super(props);
    this.handleLatChange = this.handleLatChange.bind(this);
    this.handleLonChange = this.handleLonChange.bind(this);
    this.state = {
      lat:this.props.navigation.getParam('lat') || 35.962691,
      lon:this.props.navigation.getParam('lon') ||126.97894,
    }
  }

  handleLatChange(input) {
    this.setState({lat: input});
  }

  handleLonChange(input) {
    this.setState({lon: input});
  }

  componentDidMount() {
    const lat = this.props.navigation.getParam('lat');
    const lon = this.props.navigation.getParam('lon');
    if(lat != null && lon != null){
      this.setState({lat: lat});
      this.setState({lon: lon});
    }
  }

  // navigationOptions 코드 추가
  static navigationOptions = ({navigation}) => {
      return {
        headerLeft: () => <Image source={require('./assets/logo.jpg')} style={styles.iconImg} />,
        title: <Text style={styles.text}>9585부대 CSMap</Text>,
        headerRight: () => <SearchBtn navigation={navigation} onLatChange={this.handleLatChange} onLonChange= {this.handleLonChange}/>,
        headerTitleAlign: 'center', 
      }
  }

  render() {
    return (
        <MapView
            style={{ flex: 1 }}
            zoomEnabled={true}
            provider={PROVIDER_GOOGLE}
            mapType="satellite"
            minZoomLevel={13}
            maxZoomLevel={20}
            initialRegion={{
                latitude: this.state.lat,
                longitude: this.state.lon,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            }}
        >
            {iksonData.map((item) => 
                    <Marker
                        key={item.id}
                        title={item.id + "번 CCTV"}
                        description={item.lotAddress}
                        coordinate={{
                            latitude: parseFloat(item.latitude),
                            longitude: parseFloat(item.longitude),
                        }}                
                    />
            )}
        </MapView>
    );
  }
}

export default withNavigation(MainScreen);
