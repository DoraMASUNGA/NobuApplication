import { Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Colors from '../assets/Colors'

const Home = ({navigation}) => {
  return (
      <View style={styles.container}>
          <SafeAreaView/>
          <View style={styles.navbar}>
              <TouchableOpacity onPress={()=> navigation.navigate('CFmenu')}>
                  <Image source={require('../assets/icons/cook.png')} style={{width: 40, height: 40,} } />
              </TouchableOpacity>
          </View>
          <View style={styles.logocontainer}>
          <Image source={require('../assets/icons/Nobu.png')} style={styles.logo} />
          </View> 

          <TouchableOpacity onPress={() => navigation.navigate('fullMenu')} style={styles.enterButton}>
              <Text style={styles.BtnText}>
                  ENTER
              </Text>
        </TouchableOpacity>

    </View>
  )
}

export default Home

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.sand,
    },

    navbar: {
        alignItems: 'flex-end',
        paddingHorizontal: 30,
        flexDirection: 'row',
        alignSelf: 'flex-end'
    },

    logocontainer: {
        padding: 20,
    },

    logo: {
        width: "95%",
        height: '31%',
        top: 200,
        marginHorizontal: 10,

    },

    enterButton: {
        margin: 20,
        padding: 20,
        width: 300,
        backgroundColor: 'black',
        alignItems: 'center',
        borderRadius: 10,
        alignSelf: 'center',
        top: 90,

    },

    BtnText: {
        color: 'white',
    }
})