import React, {useEffect} from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  Platform,
  TextInput,
  Pressable,
  FlatList,
  Dimensions,
} from 'react-native';
import MapView, {Marker} from 'react-native-maps';

const MapComponent = React.memo(
  ({initialRegion, markers, loading = false, customMapStyle}) => {
    // useEffect(() => {

    //     (async () => {

    //     })();

    //     return () => {
    //         // clear/remove event listener

    //     }
    // }, []);

    return (
      <MapView
        style={{flex: 1}}
        initialRegion={initialRegion}
        customMapStyle={customMapStyle}>
        {markers.coordinate ? (
          <Marker title="Location" coordinate={markers.coordinate}>
            {loading ? (
              <Image
                source={require('../../assets/radar.gif')}
                style={{height: 175, width: 175}}
              />
            ) : (
              <Image
                source={require('../../assets/location.png')}
                style={{height: 35, width: 35}}
              />
            )}
          </Marker>
        ) : (
          ''
        )}
      </MapView>
    );
  },
);

export default MapComponent;
