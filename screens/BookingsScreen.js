import React, { useState } from "react";
import { StyleSheet, ImageBackground, Text , View, Image } from "react-native";
import { Avatar } from "@rneui/themed";
import CardBooking from "./components/cardBooking";
import { Button, Icon } from "@rneui/base";
import { useQuery } from "@apollo/client";
import {USER_ORDERS} from "./components/usersQueries";
import { USER } from "./auth/graphql/user";


export default function BookingsScreen({ navigation, user}) {
  const [orders, setOrders] = useState([]);

  useQuery(USER_ORDERS, {
    variables: { userId: user?.user?.id },
    onCompleted(data) {
      const fetchOrders = data.getOrderByUserId;

      //const allOrders = []
     const allOrders = fetchOrders.map((order) => {
       return {id: order.id,
          date: order.date,
          status: order.status,
          user: order.user,
          total: 0,
          bookings: order.bookings
        }

      })

      //console.log("update", test)

      const updatedOrders = allOrders.map((order) => ({
        ...order,
        total: order.bookings.reduce(
          (total, booking) => total + booking.price,
          0
        ),
      }
        ));
      console.log("updatedOrders", updatedOrders)
      updatedOrders.sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return dateB.getTime() - dateA.getTime();
      });

      setOrders(updatedOrders);
    },
  });
  console.log("orders", orders)

  return (
   <View style={styles.bookingScreen}>
      <ImageBackground
        source={require('../assets/bg_home.jpg')}
        style={styles.backgroundImage}
      />
      <View style={styles.container}>
        <View style={styles.headerBooking}>
          <View style={styles.row}>
            <View style={styles.rowLocation}>
              <View style={styles.iconContainer}>
                <Icon
                  style={styles.icone}
                  name="map-marker-outline"
                  type="material-community"
                  color="white"
                />
              </View>
              <View style={styles.location}>
                <Text style={styles.stationTitle}>Alpes d'Huez Location</Text>
                <Text style={styles.shopTitle}>Haute Savoie</Text>
              </View>
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
        {orders.map((order) => (
          <CardBooking 
            key={order.id}
            order={order}
          />
        ))}
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
    width:'100%',
  },
  headerBooking: { 
    padding: 15,
    paddingTop: 50,
    height: 170,
    backgroundColor: '#0F2641',
    marginBottom: 10,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOpacity: 0.2,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  row:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  rowLocation:{
    flexDirection: 'row',
  },
  location: {
    marginLeft: 20,
    justifyContent: 'center',
  },
  icone:{
    width: 50,
  },
  iconContainer: {
    backgroundColor: '#657282',
    borderRadius: 50,
    justifyContent: 'center',
  },
  stationTitle: {
    color: 'white',
    opacity: .7,
  },
  shopTitle:{
    color: 'white',
  },
  avatarContainer: {
    alignItems:"flex-end",
    marginLeft: 10,
  },
  buttonStyle: {
    marginTop: 10,
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 8,
  },

});
