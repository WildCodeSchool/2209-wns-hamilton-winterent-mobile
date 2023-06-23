import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const CardBooking = ({ description, date }) => {
  return (
    <>
    <View style={styles.container}>
       <Image style={styles.img} source={require('../../assets/ski2.png')}/>
       <View style={styles.detail}>
       <View style={styles.containerDate}>
        <Text style={styles.date}>{date}Depuis 2 jours</Text>
        </View>
        <Text style={styles.description}>{description}Alpine Ski Set (Fusion)</Text>
        <Text style={styles.level}>Intermédiaire - Avancé</Text>
        <Text style= {styles.price}>€19/Jour</Text>
       </View>
    </View>
    </>
    
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#305776',
    flexDirection: 'row',
    paddingTop: 30,
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
    marginLeft: 20,
    marginRight: 20,
  },
  containerDate: {
    backgroundColor: '#45627b',
    borderRadius: 15,
    width: 100,
    padding: 10,
    marginBottom: 10,
  },
  level: {
    fontSize: 12,
    marginBottom: 8,
    color: '#8e8e93'
  },
  description: {
    fontSize: 16,
    marginBottom: 8,
    color: 'white',
    fontWeight: 'bold',
  },
  date: {
    fontSize: 12,
    color: 'white'

  },
  img: {
    height: 100,
    width: 70
  }, 
  detail: {
    marginLeft: 80,
    color: 'white'
  }

});

export default CardBooking;
