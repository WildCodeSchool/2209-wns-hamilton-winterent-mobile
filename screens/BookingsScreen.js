import React from "react";
import { StyleSheet, ImageBackground, Text , View, Image } from "react-native";
import { Avatar } from "@rneui/themed";
import CardBooking from "./components/cardBooking";
import { Button } from "@rneui/base";


export default function BookingsScreen() {

  return (
   <View style={styles.bookingScreen}>
      <ImageBackground
        source={require('../assets/bg_home.jpg')}
        style={styles.backgroundImage}
      />
      <View style={styles.container}>
        <View style={styles.headerBooking}>
          <View style={styles.row}>
            <View style={styles.icone}></View>
            <View>
              <Text style={styles.stationTitle}>Alpes d'Huez Location</Text>
              <Text style={styles.shopTitle}>Haute Savoie</Text>
            </View>
            <View style={styles.avatarContainer}>
              <Avatar
                size={50}
                rounded
                source={{ uri: "https://randomuser.me/api/portraits/men/36.jpg" }}
              />
            </View>
          </View>
          <Button
            // onPress={onPressLearnMore}
            title="Catégorie & Filtre"
            style={styles.buttonStyle}
          />
        </View>
        <CardBooking style={styles.cardBooking}/>
        <CardBooking style={styles.cardBooking}/>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  bookingScreen: {
    flex: 1,
    backgroundColor:'#0F2641',
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    opacity: .3,
  },
  cardBooking: {
    position: 'relative',
  },
  container: {
    position: 'absolute',
    width: '100%',
  },
  headerBooking: { 
    width: '100%',
    padding: 15,
    paddingTop: 50,
    height: 160,
    backgroundColor: '#0F2641',
    marginBottom: 10,
  },
  row:{
    width: '100%',
    flexDirection: 'row',
  },
  icone:{
    width: 50,
  },
  stationTitle: {
    color: 'white',
    opacity: .7,
  },
  shopTitle:{
    color: 'white',
  },
  avatarContainer: {
    justifyContent: 'flex-end',
    left: 0,
  },
  buttonStyle: {
    marginTop: 10,
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 8,
  },

});
