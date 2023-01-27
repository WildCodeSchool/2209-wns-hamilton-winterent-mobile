import { StyleSheet, Text, View } from "react-native";
import { Avatar, ListItem, Button } from '@rneui/themed';
import { Card } from '@rneui/themed';
import { Icon } from "@rneui/base";
import { ListItemContent } from "@rneui/base/dist/ListItem/ListItem.Content";
import { white } from "color-name";


export default function ProfileScreen({ navigation }) {
    return (
        <>
            <View style={styles.globalContainer}>
                <View style={styles.photoContainer}>
                    <Avatar
                        size={150}
                        rounded
                        source={{ uri: "https://randomuser.me/api/portraits/men/36.jpg" }}
                    />
                    <Text style={styles.paragraph}> nom prénom </Text>
                </View>
                <View style={styles.infosContainer}>
                    <Card containerStyle={styles.cardElement}>
                        <View style={{flexDirection: 'row', marginVertical : 15}}>
                            <Icon style={{marginRight : 25}} name="email-outline" type="material-community" color="white" />
                            <Text style={styles.paragraph}> user mail </Text>
                        </View>
                        <Card.Divider style={{marginVertical: 5}} />
                        <View style={{flexDirection: 'row', marginVertical : 15}}>
                            <Icon style={{marginRight : 25}} name="map-marker-outline" type="material-community" color="white" />
                            <Text style={styles.paragraph}> adresse </Text>
                        </View>
                    </Card>
                </View>
                <View style={styles.updateContainer}>
                    <ListItem containerStyle={{backgroundColor : 'rgba(255, 255, 255, 0.1)', borderTopEndRadius : 16, borderTopStartRadius : 16}}  onPress={() => navigation.navigate('EditProfileScreen')}>
                        <Icon name="pencil" type="material-community" color="white"/>
                        <ListItem.Title style={styles.paragraph}>Modifier mes infos</ListItem.Title>
                        <ListItem.Chevron />
                    </ListItem>
                    <ListItem containerStyle={{backgroundColor : 'rgba(255, 255, 255, 0.1)'}} onPress={() => navigation.navigate('EditProfileScreen')}>
                        <Icon name="headphones" type="material-community" color="white" />
                        <ListItem.Title style={styles.paragraph}>Aide</ListItem.Title>
                        <ListItem.Chevron />
                    </ListItem>
                </View>
                <View style={styles.logoutContainer}>
                    <Button radius={'sm'} type="clear">
                        <Icon name="logout" type="material-community" color="white" />
                        Déconnexion
                    </Button>
                </View>
            </View>

        </>);

}

const styles = StyleSheet.create({
    globalContainer: {
        flex: 1,
        backgroundColor: '#040c29',
    },
    photoContainer:
    {
        flex: 0.4,
        paddingTop : 10,
        alignItems: 'center',
        justifyContent: 'space-evenly',
    },
    infosContainer:
    {
        flex: 0.3,
        borderRadius : 16,
        // backgroundColor : 'yellow',
        margin : 15,
    },
    updateContainer:
    {
        flex: 0.25,
        justifyContent: 'center',
        margin : 30,
    },
    logoutContainer:
    {
        flex: 0.1,
        justifyContent: 'center',
    },
    cardElement :
    {
        flex : 0.9,
        borderRadius : 15,
        backgroundColor : 'rgba(255, 255, 255, 0.1)',
        borderColor : 'transparent',
    },
    paragraph :
    {
        color : 'white',
    },
    icons :
    {
        color : 'white',
    }
});