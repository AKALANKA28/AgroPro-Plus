// src/components/SearchPrompt.jsx
import React, { useState } from 'react';
import { View, Text, TextInput, Button, Modal, StyleSheet, Alert } from 'react-native';

const SearchPrompt = ({ onSearch }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [fertiName, setFertiName] = useState('');

  const handleSearch = () => {
    if (fertiName.trim()) {
      onSearch(fertiName);
      setModalVisible(false);
    } else {
      Alert.alert('Please enter a fertilizer name.');
    }
  };

  return (
    <>
      <Button title="Search Fertilizer" onPress={() => setModalVisible(true)} />
      <Modal
        transparent={true}
        animationType="slide"
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalView}>
          <Text>What is the searching fertilizer?</Text>
          <TextInput
            placeholder="Enter fertilizer name"
            value={fertiName}
            onChangeText={setFertiName}
            style={styles.input}
          />
          <Button title="Search" onPress={handleSearch} />
          <Button title="Cancel" onPress={() => setModalVisible(false)} />
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  modalView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    width: '80%',
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});

export default SearchPrompt;
