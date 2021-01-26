import React, { Component, useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE, MAP_TYPES } from 'react-native-maps';
import iksonData from './ikson.json';
import LoadingView from './MainView.js';


function App() {
        const [isLoading, setIsLoading] = useState(false);
        
        if(isLoading){
            return(
                <LoadingView/>
            );
            setTimeout(() => {
            }, 1000);
            setIsLoading(true);
        }else{
            return (
                <MapView
                    style={{ flex: 1 }}
                    zoomEnabled={true}
                    provider={PROVIDER_GOOGLE}
                    mapType="satellite"
                    minZoomLevel={10}
                    maxZoomLevel={18}
                    initialRegion={{
                        latitude: 35.962691,
                        longitude: 126.97894,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}
                >
                    {iksonData.data.map((item, index) => 
                            <Marker
                                key={index}
                                title={index + "번 CCTV"}
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

export default App;