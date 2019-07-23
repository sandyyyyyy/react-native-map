import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { MapView } from "expo";
export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      markers: [],
    };
  }
  fetchMarkerData() {
    fetch('https://feeds.citibikenyc.com/stations/stations.json')
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({ 
          isLoading: false,
          markers: responseJson.stationBeanList, 
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }
  componentDidMount() {
    this.fetchMarkerData();
}
  render() {
    return (
      <MapView
    style={styles.map }
    region={{
      latitude: 40.76727216,
      longitude: -73.99392888,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    }}
>
        {this.state.isLoading ? null : this.state.markers.map((marker, index) => {
     const coords = {
        latitude: 40.76727216,
      longitude: -73.99392888,
     };

     const metadata = `Status: ${marker.statusValue}`;

     return (
         <MapView.Marker
            key={index}
            coordinate={coords}
            title={marker.stationName}
            description={metadata}
         />
     );
    })}
    </MapView>
    );
  }
}
const styles = StyleSheet.create({
    map: {
        height: 100,
        flex: 1
        }
});