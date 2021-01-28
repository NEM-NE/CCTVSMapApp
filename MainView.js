import React, { useState } from 'react';
import { StyleSheet, Image, View, Text, TouchableOpacity, Button } from 'react-native';
import { Icon } from 'native-base'; // 추가된 코드
import { withNavigation, navigation } from 'react-navigation';
import MapView, { Marker, PROVIDER_GOOGLE, MAP_TYPES } from 'react-native-maps';
import iksonData from './ikson.json';

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
  }
});

function MainScreen(props) {
  const [region, setRegion] = useState({
    latitude: 35.962691,
    longitude: 126.97894,
    latitudeDelta: 0.0322,
    longitudeDelta: 0.0321,
  });
  const [showVehicleReader, setShowVehicleReader] = useState(-1);
  const [btnTitle, setBtnTitle] = useState('차량용 판독기만 보기');
  const [initRegion, setInitRegion] = useState({
    latitude: 35.962691,
    longitude: 126.97894,
    latitudeDelta: 0.0322,
    longitudeDelta: 0.0321,
  });

  //search screen에서 받아온 region 객체
  const new_region = props.navigation.getParam('region');
  let markers;


  const handleBtnPress = () => {
    setShowVehicleReader((showVehicleReader === -1) ? 0 : -1);
    setBtnTitle((btnTitle === '차량용 판독기만 보기') ? '전체 보기' : '차량용 판독기만 보기');
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

  //rendering!!!
  return (
    <View style={styles.container}>
      <MapView
        style={{ flex: 1 }}
        zoomEnabled={true}
        provider={PROVIDER_GOOGLE}
        mapType="hybrid"
        minZoomLevel={13}
        maxZoomLevel={19}
        /*
        Problem!!!!!!
        문제: 차량용 판독기 버튼을 눌렀을 때 위치가 검색했던 위치나 기본 베이스 위치로 이동함
        그래서 버튼을 눌렀을 때 지금 보고있는 위치에서 변경되고 싶음.

        이를 해결하려고 onRegionChange가 이동할 때마다 region을 반환하기 때문에 이를 이용하려고 했지만
        region 속성에 있는 {new_region || region} 값과 충돌이 일어남
        */
        region={region}
      >
        {markers}
      </MapView>
      <View>
        <Button
          title={btnTitle}
          color="#f194ff"
          onPress={handleBtnPress}
        />
      </View>
    </View>
  );
}

// navigationOptions 코드 추가
MainScreen.navigationOptions = ({ navigation }) => {
  return {
    headerLeft: () => <Image source={require('./assets/logo.jpg')} style={styles.iconImg} />,
    title: <Text style={styles.text}>9585부대 CSMap</Text>,
    headerRight: () =>
    (
      <TouchableOpacity onPress={() => navigation.navigate('Search')}>
        <Icon name='ios-search' style={{ paddingRight: 10 }} />
      </TouchableOpacity>
    ),
    headerTitleAlign: 'center',
  }
}

export default withNavigation(MainScreen);
