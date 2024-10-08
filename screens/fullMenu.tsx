import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Colors from '../assets/Colors';

const FullMenu = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [mealCount, setMealCount] = useState(0); // State for meal count

  // Load menu items from AsyncStorage when the component mounts
  useEffect(() => {   
    loadMenuItems();
  }, []);

  // Function to load menu items from AsyncStorage
  const loadMenuItems = async () => {
    try {
      const storedItems = await AsyncStorage.getItem('menuItems');
      if (storedItems) {
        const items = JSON.parse(storedItems);
        setMenuItems(items);
        setFilteredItems(items); // Initially show all items
        setMealCount(items.length); // Set initial count to all items
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to load dishes');
    }
  };

  // Function to filter dishes by course type and update the meal count
  const filterDishes = (type) => {
    setSelectedFilter(type); // Set the selected filter to show active state
    if (type === 'All') {
      setFilteredItems(menuItems); // Show all items
      setMealCount(menuItems.length); // Update meal count for all
    } else {
      const filtered = menuItems.filter((item) => item.courseType === type);
      setFilteredItems(filtered);
      setMealCount(filtered.length); // Update meal count for filtered items
    }
  }; 

  return (
    <ScrollView style={styles.pageScrollView}>
      <View style={styles.container}>
        {/* Filter Buttons */}
        <View style={styles.filterContainer}>
          <TouchableOpacity
            style={[styles.filterButton, selectedFilter === 'All' && styles.selectedFilter]}
            onPress={() => filterDishes('All')}
          >
            <Text style={styles.filterText}>All</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.filterButton, selectedFilter === 'Starter' && styles.selectedFilter]}
            onPress={() => filterDishes('Starter')}
          >
            <Text style={styles.filterText}>Starters</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.filterButton, selectedFilter === 'Main' && styles.selectedFilter]}
            onPress={() => filterDishes('Main')}
          >
            <Text style={styles.filterText}>Main Meals</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.filterButton, selectedFilter === 'Dessert' && styles.selectedFilter]}
            onPress={() => filterDishes('Dessert')}
          >
            <Text style={styles.filterText}>Desserts</Text>
          </TouchableOpacity>
        </View>

        {/* Display meal count */}
        <Text style={styles.mealCountText}>Total Meals: {mealCount}</Text>

        {/* Display Filtered Dishes */}
        <ScrollView style={styles.scrollView}>
          {filteredItems.map((item, index) => (
            <View key={index} style={styles.dishCard}>
              <Text style={styles.dishText}>Dish Name: {item.dishName}</Text>
              <Text style={styles.dishText}>Description: {item.description}</Text>
              <Text style={styles.dishText}>Price: R {item.price}</Text>
              <Text style={styles.dishText}>Course Type: {item.courseType}</Text>
            </View>
          ))}
        </ScrollView>
      </View>
    </ScrollView>
  );
};

export default FullMenu;

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
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  filterButton: {
    padding: 10,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
    backgroundColor: '#f2f2f2',
  },
  selectedFilter: {
    backgroundColor: 'black',
    borderColor: 'white',
  },
  filterText: {
    color: 'black',
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
  mealCountText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
});
