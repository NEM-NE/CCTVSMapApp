/*
구현 해야될 리스트

1. 검색 스크린 리스트에 CCTV번호를 title로 주소나 CCTV종류를 description으로 만들기
2. 클릭시 위도, 경도 변경
3. 클릭시 변경 후 맵으로 자동 이동 goback()

*/
// https://aboutreact.com/react-native-search-bar-filter-on-listview/

// import React in our code
import React, { useState, useEffect } from 'react';

// import all the components we are going to use
import { SafeAreaView, Text, StyleSheet, View, FlatList, TouchableOpacity } from 'react-native';
import { SearchBar } from 'react-native-elements';
// 익산 데이터
import iksonData from './ikson.json';

const SearchScreen = (props) => {
  const { navigation } = props;
  const [search, setSearch] = useState('');
  //filter했을 때 나오는 리스트
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  // 아무것도 검색안할 때 나와야되는 전체 리스트
  const [masterDataSource, setMasterDataSource] = useState([]);

  useEffect(() => {
    setFilteredDataSource(iksonData);
    setMasterDataSource(iksonData);
  }, []);

  const searchFilterFunction = (text) => {
    // Check if searched text is not blank
    if (text) {
      // Inserted text is not blank
      // Filter the masterDataSource
      // Update FilteredDataSource
      const newData = masterDataSource.filter(function (item) {
        const itemData = item.title
          ? item.title.toUpperCase()
          : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredDataSource(newData);
      setSearch(text);
    } else {
      // Inserted text is blank
      // Update FilteredDataSource with masterDataSource
      setFilteredDataSource(masterDataSource);
      setSearch(text);
    }
  };

  // flatlist item 부분
  const ItemView = ({ item }) => {
    return (
      // Flat List Item
      <Text style={styles.itemStyle} onPress={() => getItem(item)}>
        <View style={{ alignItems: "center", flex: 1 }}>
          <TouchableOpacity>
            <Text style={{ fontWeight: "bold" }}>{item.id + "번 CCTV"}</Text>
            <Text>{'주소: ' + item.lotAddress}</Text>
            <Text>{'목적: ' + item.purpose}</Text>
          </TouchableOpacity>
        </View>
      </Text>
    );
  };

  const ItemSeparatorView = () => {
    return (
      // Flat List Item Separator
      <View
        style={{
          height: 0.5,
          width: '100%',
          backgroundColor: '#C8C8C8',
        }}
      />
    );
  };

  const getItem = (item) => {
    const lon = navigation.getParam("onLonChange");
    alert(lon);
    props.onLonChange(item.longitude);
  };


  // flatlist의 data는 객체배열
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <SearchBar
          round
          searchIcon={{ size: 24 }}
          onChangeText={(text) => searchFilterFunction(text)}
          onClear={(text) => searchFilterFunction('')}
          placeholder="Type Here..."
          value={search}
        />
        <FlatList
          data={filteredDataSource}
          keyExtractor={(item, index) => index.toString()}
          ItemSeparatorComponent={ItemSeparatorView}
          renderItem={ItemView}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
  itemStyle: {
    padding: 10,
  },
});

export default SearchScreen;