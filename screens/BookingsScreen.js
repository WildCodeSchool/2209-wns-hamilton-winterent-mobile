import React, { useState, useEffect } from "react";
import { StyleSheet, ImageBackground, Text, View } from "react-native";
import { Avatar } from "@rneui/themed";
import CardBooking from "./components/cardBooking";
import { Button, Icon } from "@rneui/base";
import { useLazyQuery, useQuery } from "@apollo/client";
import { USER_ORDERS } from "./components/usersQueries";
import { USER } from "./auth/graphql/user";
import personPlaceholder from "../assets/person_placeholder.jpeg";

export default function BookingsScreen({ user }) {
  const [orders, setOrders] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
console.log(orders, "order")
  useQuery(USER, {
    variables: { userId: user?.user?.id },
    async onCompleted(data) {
      console.log("data", data);
      try {

        const capitalizeFirstLetter = (string) => {
          if (!string) return ''; 
          return string.charAt(0).toUpperCase() + string.slice(1);
        };
        
        const firstname = data.user.firstname;
        const lastname = data.user.lastname;

        setCurrentUser({
          firstname: firstname === firstname.toUpperCase() ? firstname : capitalizeFirstLetter(firstname),
          lastname: lastname === lastname.toUpperCase() ? lastname : capitalizeFirstLetter(lastname),
          email: data.user.email,
        });
      } catch (e) {
        alert("Failed to fetch the data to the storage");
      }
    },
    onError(error) {
      console.log(error.message);
    },
  });

  useQuery(USER_ORDERS, {
    variables: { userId: user?.user?.id },
    onCompleted(data) {
      const fetchOrders = data.getOrderByUserId;

      const allOrders = fetchOrders.map((order) => {
        return {
          id: order.id,
          date: order.date,
          status: order.status,
          user: order.user,
          total: 0,
          bookings: order.bookings,
        };
      });

      const updatedOrders = allOrders.map((order) => ({
        ...order,
        total: order.bookings.reduce(
          (total, booking) => total + booking.price,
          0
        ),
      }));
      updatedOrders.sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return dateB.getTime() - dateA.getTime();
      });

      setOrders(updatedOrders);
    },
  });


  return (
    <>
      <View style={styles.bookingScreen}>
        <ImageBackground
          source={require("../assets/bg_home.jpg")}
          style={styles.backgroundImage}
        />
        <View style={styles.container}>
          <View style={styles.headerBooking}>
            <View style={styles.row}>
              <View style={styles.rowLocation}>
                <View style={styles.logoContainer}>
                  <ImageBackground
                    style={styles.logo}
                    source={require("../assets/Logo_winterent-light.png")}
                  />
                </View>
                <View style={styles.location}>
                  <Text style={styles.stationTitle}>{currentUser.firstname} {currentUser.lastname}</Text>
                  <Text style={styles.shopTitle}>Vos commandes :</Text>
                </View>
              </View>
              <View style={styles.avatarContainer}>
                <Avatar size={50} rounded source={personPlaceholder} />
              </View>
            </View>
            {/* <Button
              // onPress={onPressLearnMore}
              title="Mes commandes"
              style={styles.buttonStyle}
            /> */}
          </View>
          {orders.map((order) => (
            <CardBooking key={order.id} order={order} />
          ))}
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  bookingScreen: {
    flex: 1,
    backgroundColor: "#0F2641",
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    opacity: 0.3,
  },
  cardBooking: {
    position: "relative",
  },
  container: {
    position: "absolute",
    width: "100%",
  },
  headerBooking: {
    padding: 15,
    paddingTop: 50,
    height: 170,
    backgroundColor: "#0F2641",
    marginBottom: 10,
    ...Platform.select({
      ios: {
        shadowColor: "black",
        shadowOpacity: 0.2,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  rowLocation: {
    flexDirection: "row",
    flex:1,
    justifyContent: "space-between",
    alignItems: "center",
  },
  location: {
    marginRight: 10,
    alignItems: "flex-end",
    justifyContent: "center",
  },
  logo: {
    width: 50,
    height: 50,
  },
  logoContainer: {
    justifyContent: "center",
  },
  stationTitle: {
    color: "white",
    opacity: 0.7,
  },
  shopTitle: {
    color: "white",
  },
  avatarContainer: {
    alignItems: "flex-end",
    marginLeft: 10,
  },
  buttonStyle: {
    marginTop: 10,
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 8,
  },
});
