import { View, Text, StyleSheet } from "react-native";
import React, { useState } from "react";
import MapView from "react-native-maps";
import { TouchableOpacity } from "@gorhom/bottom-sheet";
import Colors from "@/constants/Colors";
import { useNavigation } from "expo-router";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { Ionicons } from "@expo/vector-icons";

// process.env.EXPO_PUBLIC_GOOGLE_API_KEY
const LocationSearch = () => {
  const navigation = useNavigation();
  const [location, setLocation] = useState({
    // nigeria#
    latitude: 6.4530555,
    longitude: 3.406095,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  return (
    <View style={styles.map}>
      <GooglePlacesAutocomplete
        placeholder="Search or move the map"
        fetchDetails={true}
        styles={{
          container: {
            flex: 0,
          },
          textInputContainer: {
            padding: 8,
            backgroundColor: Colors.light.background,
          },
          textInput: {
            borderRadius: 10,
            paddingLeft: 35,
            backgroundColor: Colors.grey,
          },
        }}
        renderLeftButton={() => (
          <View style={styles.boxIcon}>
            <Ionicons name="search" size={24} color={Colors.medium} />
          </View>
        )}
        onPress={(data, details = null) => {
          const point = details?.geometry?.location;
          if (!point) return;
          setLocation({
            ...location,
            latitude: point.lat,
            longitude: point.lng,
          });
          console.log(data, details);
        }}
        query={{
          key: process.env.EXPO_PUBLIC_GOOGLE_API_KEY,
          language: "en",
          components: "country:ng",
          types: "(cities)",
          radius: 1000,
          strictBounds: true,
          location: `${location.latitude},${location.longitude}`,
        }}
      />

      <MapView style={{ flex: 1 }} region={location} showsUserLocation={true} />
      <View style={styles.absoluteBox}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.buttonText}>Confirm</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
  absoluteBox: {
    position: "absolute",
    bottom: 20,
    width: "100%",
  },
  button: {
    backgroundColor: Colors.primary,
    padding: 16,
    margin: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: Colors.light.background,
    fontWeight: "bold",
  },
  boxIcon: {
    position: "absolute",
    left: 15,
    top: 18,
    zIndex: 1,
  },
});
export default LocationSearch;
