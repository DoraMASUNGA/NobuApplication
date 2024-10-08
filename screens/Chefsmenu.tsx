import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, Alert, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-picker/picker';
import Colors from '../assets/Colors';

const Chefsmenu = ({navigation}) => {
  const [dishName, setDishName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [courseType, setCourseType] = useState('Starter'); // Default course type
  const [menuItems, setMenuItems] = useState([]);

  // Load menu items from AsyncStorage when the component mounts
  useEffect(() => {
    loadMenuItems();
  }, []);

  // Function to save a new dish
  const saveDish = async () => {
    if (!dishName || !description || !price) {
      Alert.alert('Error', 'Please fill in all the fields');
      return;
    }

    const newDish = { dishName, description, price, courseType };
    const updatedMenuItems = [...menuItems, newDish];
    
    try {
      await AsyncStorage.setItem('menuItems', JSON.stringify(updatedMenuItems));
      setMenuItems(updatedMenuItems); // Update the state
      // Clear inputs
      setDishName('');
      setDescription('');
      setPrice('');
      setCourseType('Starter');
    } catch (error) {
      Alert.alert('Error', 'Failed to save the dish');
    }
  };

  // Function to load menu items from AsyncStorage
  const loadMenuItems = async () => {
    try {
      const storedItems = await AsyncStorage.getItem('menuItems');
      if (storedItems) {
        setMenuItems(JSON.parse(storedItems));
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to load dishes');
    }
  };

  // Function to delete an item
  const deleteDish = async (index) => {
    const updatedMenuItems = menuItems.filter((_, i) => i !== index);
    try {
      await AsyncStorage.setItem('menuItems', JSON.stringify(updatedMenuItems));
      setMenuItems(updatedMenuItems); // Update the state
    } catch (error) {
      Alert.alert('Error', 'Failed to delete the dish');
    }
  };
    //to calculate how many items
    const courseCount = menuItems.length;

    return (  
        <ScrollView style={styles.pageScrollView}>
                        
    <View style={styles.container}>
      <View style={styles.chefselection}>
        <TextInput 
          placeholder='Dish name' 
          style={styles.input} 
          value={dishName} 
          onChangeText={setDishName} 
        />
        <TextInput 
          placeholder='Description' 
          style={styles.input} 
          value={description} 
                  onChangeText={setDescription} 
        />
        <TextInput 
          placeholder='Price' 
          style={styles.input} 
          keyboardType="numeric" 
          value={price} 
          onChangeText={setPrice} 
        />
        
        
        {Platform.OS === 'ios' ? (
  <Picker
    selectedValue={courseType}
    style={styles.picker}
    onValueChange={(itemValue) => setCourseType(itemValue)}
  >
    <Picker.Item label="Starter" value="Starter" />
    <Picker.Item label="Main Meal" value="Main" />
    <Picker.Item label="Dessert" value="Dessert" />
  </Picker>
) : (
  <Picker
    selectedValue={courseType}
    style={styles.picker}
    onValueChange={(itemValue) => setCourseType(itemValue)}
  >
    <Picker.Item label="Starter" value="Starter" />
    <Picker.Item label="Main Meal" value="Main" />
    <Picker.Item label="Dessert" value="Dessert" />
  </Picker>
                    )}
                    
      </View>

      {/* Add Item Button */}
      <TouchableOpacity style={styles.Addbutton} onPress={saveDish}>
        <Text style={{ color: 'white' }}>Add Item</Text>
                </TouchableOpacity>
                
             <TouchableOpacity onPress={()=> navigation.navigate('fullMenu')} style={styles.menuButton}>
              <Text style={styles.BtnText}>
                  Full Menu
             </Text>
                </TouchableOpacity>
                
                {/* Counter for Total Courses */}
        <View style={styles.counterContainer}>
          <Text style={styles.counterText}>Total Courses Added: {courseCount}</Text>
        </View>

      {/* ScrollView to display added dishes */}
      <ScrollView style={styles.scrollView}>
        {menuItems.map((item, index) => (
          <View key={index} style={styles.dishCard}>
            <Text style={styles.dishText}>Dish Name: {item.dishName}</Text>
            <Text style={styles.dishText}>Description: {item.description}</Text>
            <Text style={styles.dishText}>Price: {item.price}</Text>
            <Text style={styles.dishText}>Course Type: {item.courseType}</Text>
            <TouchableOpacity onPress={() => deleteDish(index)} style={styles.deleteButton}>
              <Text style={{ color: 'white' }}>Remove</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
            </View>
            </ScrollView>
  );
};

export default Chefsmenu;

    const styles = StyleSheet.create({
     pageScrollView: { 
     flex: 1,
     backgroundColor: Colors.lightsand,
 },
  container: {
    flex: 1,
    backgroundColor: Colors.lightsand,
    padding: 20,
  },
  
  chefselection: {
    alignItems: 'center',
    gap: 20,
  },
  input: {
    padding: 15,
    borderWidth: 2,
    borderColor: 'grey',
    width: "100%",
    marginVertical: 10,
  },
    picker: {
    paddingBottom: 200,
    height: 50,
    width: '100%',
    borderWidth: 2,
    borderColor: 'grey',
  },
  Addbutton: {
    padding: 20,
    backgroundColor: 'black',
    alignItems: 'center',
    marginVertical: 20,
  },
  scrollView: {
    flex: 1,
    marginTop: 20,
  },
  dishCard: {
    padding: 20,
    backgroundColor: '#f2f2f2',
    marginVertical: 10,
    borderRadius: 10,
  },
  dishText: {
    fontSize: 16,
    marginBottom: 5,
  },
  deleteButton: {
    backgroundColor: 'red',
    padding: 10,
    alignItems: 'center',
    marginTop: 10,
    borderRadius: 5,
                },
                menuButton: {
                    borderBlockColor: 'black',
                    borderWidth: 1,
                    padding:12,
                    
                    
                },
                BtnText: {
                    textAlign: 'center'
                
                    
        },
    
        counterContainer: {
            borderBlockColor: 'black',
            borderWidth: 1,
            padding:12,
            
        },
        
        counterText: {
            
        },
});
