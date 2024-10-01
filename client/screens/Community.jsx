import React from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  Image, 
  SafeAreaView, 
  Dimensions 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Make sure to install expo vector icons
import { useNavigation } from "@react-navigation/native";
import axios from 'axios';
const { width, height } = Dimensions.get('window'); // Get screen dimensions

const Community = (navigate) => {
  return (
    <SafeAreaView style={styles.container}>
      
      {/* Header */}
      <View style={styles.header}>
        {/* Back Button */}
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigate.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        
        {/* Logo */}
        <Image
          source={{ uri: 'https://png.pngtree.com/png-vector/20211208/ourmid/pngtree-agricultural-logo-design-png-image_4051578.png' }} // Replace with your logo URL or local asset
          style={styles.logo}
        />
        
        {/* Header Text */}
        <Text style={styles.headerText}>Enhance your communication</Text>
      </View>

      {/* Full-Screen Image */}
      <Image
          source={{ uri: 'https://blog.telebu.com/wp-content/uploads/2023/02/How-to-Communicate-With-Farmers.jpg' }} // Replace with your image URL or local asset
          style={styles.img}
        />

      {/* Buttons Container */}
      <View style={styles.buttonContainer}>
        {/* Special Alerts Button */}
        <TouchableOpacity style={styles.button} onPress={() =>  useNavigation.navigate('SpecialNotices')}>
          <Text style={styles.buttonText}>Special alerts</Text>
        </TouchableOpacity>

        {/* Share Experience Button */}
        <TouchableOpacity style={styles.button} onPress={() => { /* Add your handler here */ }}>
          <Text style={styles.buttonText}>Share experience</Text>
        </TouchableOpacity>

        {/* Chat Button */}
        <TouchableOpacity style={styles.button} onPress={() => { /* Add your handler here */ }}>
          <Text style={styles.buttonText}>Chat</Text>
        </TouchableOpacity>
      </View>

    </SafeAreaView>
  );
};

// Stylesheet
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF', 
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 10,
    marginBottom: 30,
    marginTop: 20,
  },
  backButton: {
    marginRight: 15,
  },
  logo: {
    width: 40,
    height: 40,
    marginRight: 10,
    resizeMode: 'contain',
  },
  img: {
    width: 370,       
    height: height * 0.3, 
    resizeMode: 'cover', 
    marginBottom: 0,
    borderRadius: 10,   
  },
  headerText: {
    flex: 1,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'left',
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'center', 
    alignItems: 'center',     
  },
  button: {
    backgroundColor: '#4CAF50', 
    paddingVertical: 20,        
    paddingHorizontal: 60,      
    borderRadius: 10,
    marginBottom: 20,
    width: '80%',               
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3.84,
    elevation: 5,              
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Community;
