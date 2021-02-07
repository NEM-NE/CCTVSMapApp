import React, { useState, useEffect } from 'react';
import { StyleSheet, Image, View, TextInput, TouchableOpacity, Button,ScrollView,
  Animated, Text
 } from 'react-native';
import { NavigationEvents, withNavigation } from 'react-navigation';
import { Ionicons } from '@expo/vector-icons';
import MapView, { Marker, PROVIDER_GOOGLE, MAP_TYPES } from 'react-native-maps';
import iksonData from './ikson.json';
import Loading from "./Loading";

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'white' },
  text: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconImg: {
    width: 30,
    height: 30,
    padding: 10,
    marginLeft: 5,
  },
  searchBox: {
    position:'absolute', 
    marginTop: Platform.OS === 'ios' ? 40 : 20, 
    flexDirection:"row",
    backgroundColor: '#fff',
    width: '90%',
    alignSelf:'center',
    borderRadius: 5,
    padding: 10,
    shadowColor: '#ccc',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 10,
  },
  chipsScrollView: {
    position:'absolute', 
    top:Platform.OS === 'ios' ? 90 : 80, 
    paddingHorizontal:10
  },
  chipsIcon: {
    marginRight: 5,
  },
  chipsItem: {
    flexDirection:"row",
    backgroundColor:'#fff', 
    borderRadius:20,
    padding:8,
    paddingHorizontal:20, 
    marginHorizontal:10,
    height:35,
    shadowColor: '#ccc',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 10,
  },
  scrollView: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingVertical: 10,
  },
});

function MapScreen({route, navigation}) {
  const [isLoading, setIsLoading] = useState(true);
  const [region, setRegion] = useState({
    latitude: 35.962691,
    longitude: 126.97894,
    latitudeDelta: 0.0322,
    longitudeDelta: 0.0321,
  });
  const [findRegion, setFindRegion] = useState({
    latitude: null,
    longitude: null,
    latitudeDelta: null,
    longitudeDelta: null,
  });
  const [showVehicleReader, setShowVehicleReader] = useState(-1);
  const [btnTitle, setBtnTitle] = useState('차량용 판독기만 보기');
  const new_region = route.params?.region;
  // const new_region = props.navigation.getParam('region');
  
  let markers;

  useEffect(() => {
    setTimeout(() => {setIsLoading(false)},1000);
  })

  const handleBtnPress = () => {
    setShowVehicleReader((showVehicleReader === -1) ? 0 : -1);
    setBtnTitle((btnTitle === '차량용 판독기만 보기') ? '전체 보기' : '차량용 판독기만 보기');
  }

  const goSearch = (e) => {
    e.preventDefault();
    navigation.navigate('Search');
  }

  //  -1은 전체 0은 차량용 판독기만, 1은 차량용 판독기 제외
  if (showVehicleReader === 1) {
    markers = <View>
      {iksonData.map((item) =>
        (item.purpose !== '차량번호판독용') ?
          <Marker
            key={item.id}
            title={item.id + "번 CCTV"}
            description={item.lotAddress}
            coordinate={{
              latitude: parseFloat(item.latitude),
              longitude: parseFloat(item.longitude),
            }}
          />
          :
          null
      )}
    </View>
  } else if (showVehicleReader === 0) {
    markers = <View>
      {iksonData.map((item) =>
        (item.purpose === '차량번호판독용') ?
          <Marker
            key={item.id}
            title={item.id + "번 CCTV"}
            description={item.lotAddress}
            coordinate={{
              latitude: parseFloat(item.latitude),
              longitude: parseFloat(item.longitude),
            }}
            pinColor={'blue'}
          />
          :
          null
      )}
    </View>
  } else {
    markers = <View>
      {iksonData.map((item) =>
        (item.purpose === '차량번호판독용') ?
          <Marker
            key={item.id}
            title={item.id + "번 CCTV"}
            description={item.lotAddress}
            coordinate={{
              latitude: parseFloat(item.latitude),
              longitude: parseFloat(item.longitude),
            }}
            pinColor={'blue'}
          />
          :
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
    </View>
  }

  if(isLoading){
    return(
      <Loading/>
    );
  }else{
//rendering!!!
return (
  <View style={styles.container}>
    <MapView
      style={{ flex: 1 }}
      zoomEnabled={true}
      provider={PROVIDER_GOOGLE}
      mapType="hybrid"
      minZoomLevel={9}
      maxZoomLevel={19}
      initialRegion={
        {
          latitude: 35.962691,
          longitude: 126.97894,
          latitudeDelta: 0.0322,
          longitudeDelta: 0.0321,
        }
      }
      /*
      Problem!!!!!!
      문제: 차량용 판독기 버튼을 눌렀을 때 위치가 검색했던 위치나 기본 베이스 위치로 이동함
      그래서 버튼을 눌렀을 때 지금 보고있는 위치에서 변경되고 싶음.

      이를 해결하려고 onRegionChange가 이동할 때마다 region을 반환하기 때문에 이를 이용하려고 했지만
      region 속성에 있는 {new_region || region} 값과 충돌이 일어남
      */
      region={new_region || region}
    >
      {markers}
    </MapView>
    <View style={styles.searchBox}>
        <TextInput 
          placeholder="Search here"
          placeholderTextColor="#000"
          autoCapitalize="none"
          style={{flex:1,padding:0}}
          onFocus={(e) => 
            goSearch(e)
          }
        />
        <Ionicons name="ios-search" size={20} />
    </View>
    <ScrollView
        horizontal
        scrollEventThrottle={1}
        showsHorizontalScrollIndicator={false}
        height={50}
        style={styles.chipsScrollView}
        contentInset={{ // iOS only
          top:0,
          left:0,
          bottom:0,
          right:20
        }}
        contentContainerStyle={{
          paddingRight: Platform.OS === 'android' ? 20 : 0
        }}
      >
          <TouchableOpacity key={0} style={styles.chipsItem} onPress={handleBtnPress}>
          <Ionicons name="ios-car" style={styles.chipsIcon} size={18} />
            <Text>{'차량용판독기 카메라 보기'}</Text>
          </TouchableOpacity>
          <TouchableOpacity key={1} style={styles.chipsItem}>
          <Ionicons name="ios-camera" style={styles.chipsIcon} size={18} />
            <Text>{'전체 카메라 보기'}</Text>
          </TouchableOpacity>
          <TouchableOpacity key={2} style={styles.chipsItem}>
          <Ionicons name="navigate" style={styles.chipsIcon} size={18} />
            <Text>{'현재 위치 보기'}</Text>
          </TouchableOpacity>
      </ScrollView>
  </View>
);
  }
}

export default withNavigation(MapScreen);
