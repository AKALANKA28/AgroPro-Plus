import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
  Button,
  TextInput
} from 'react-native';
import axios from 'axios';

const API_URL = 'http://192.168.36.108:8070/notice';

const SpecialNotices = () => {
  const [notices, setNotices] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  const [isAdd, setIsAdd] = useState(false);
  const [newNotice, setNewNotice] = useState({ heading: '', description: '' });
  const [updateId, setUpdateId] = useState(null);

  useEffect(() => {
    fetchNotices();
  }, []);

  const fetchNotices = async () => {
    try {
      const response = await axios.get(API_URL);
      setNotices(response.data);
    } catch (error) {
      console.error('Error fetching notices:', error);
    }
  };

  const addNotice = async () => {
    if (!newNotice.heading || !newNotice.description) {
      Alert.alert('Error', 'Please fill out both fields');
      return;
    }

    try {
      await axios.post(API_URL, newNotice);
      setNewNotice({ heading: '', description: '' });
      setIsAdding(false);
      fetchNotices();
    } catch (error) {
      console.error('Error adding notice:', error);
    }
  };

  const updateNotice = async () => {
    if (!newNotice.heading || !newNotice.description) {
      Alert.alert('Error', 'Please fill out both fields');
      return;
    }

    try {
      await axios.put(`${API_URL}/${updateId}`, newNotice);
      setNewNotice({ heading: '', description: '' });
      setIsAdding(false);
      setUpdateId(null);
      fetchNotices();
    } catch (error) {
      console.error('Error updating notice:', error);
    }
  };

  const deleteNotice = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchNotices();
    } catch (error) {
      console.error('Error deleting notice:', error);
    }
  };

  const handleNoticeAction = (id, action) => {
    if (action === 'delete') {
      Alert.alert('Confirm', 'Are you sure you want to delete this notice?', [
        { text: 'Cancel' },
        {
          text: 'Delete',
          onPress: () => deleteNotice(id),
        },
      ]);
    } else if (action === 'update') {
  
      const foundOne = notices.find((n) => n._id === id)
      let res
      if (foundOne) {
          res = {heading: foundOne.heading, description: foundOne.description};
      } else {
          res =  {heading: '', description: ''};
      }
      // console.log(res)
      setNewNotice(res)
      setUpdateId(id);
      setIsAdding(true);
      setIsAdd(false);
      // You might want to provide a way to update the notice
      // Alert.alert('Update', 'Update functionality not implemented.');

    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.noticeContainer}>
      <Text style={styles.noticeHeading}>{item.heading}</Text>
      <Text style={styles.noticeDescription}>{item.description}</Text>
      <View style={styles.actions}>
        <TouchableOpacity onPress={() => handleNoticeAction(item._id, 'update')}>
          <Text style={styles.actionText}>Update</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleNoticeAction(item._id, 'delete')}>
          <Text style={styles.actionText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Special Notices</Text>
      <FlatList
        data={notices}
        keyExtractor={(item) => item._id}
        renderItem={renderItem}
      />
      {isAdding ? (
        <View style={styles.addNoticeContainer}>
          <TextInput
            placeholder="Heading"
            value={newNotice.heading}
            onChangeText={(text) => setNewNotice({ ...newNotice, heading: text })}
            style={styles.input}
          />
          <TextInput
            placeholder="Description"
            value={newNotice.description}
            onChangeText={(text) => setNewNotice({ ...newNotice, description: text })}
            style={styles.input}
          />
          <Button title={`${isAdd ? 'Add' : 'Update'} Notice`} onPress={() => isAdd ? addNotice() : updateNotice()} />
          <Button title="Cancel" onPress={() => setIsAdding(false)} />
        </View>
      ) : (
        <Button title="Add New Notice" onPress={() => {setIsAdding(true); setIsAdd(true);}} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FFFFFF',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginTop: 25,
    marginBottom: 20,
  },
  noticeContainer: {
    backgroundColor: '#E0F7FA',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3.84,
    elevation: 5,
  },
  noticeHeading: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 5,
  },
  noticeDescription: {
    fontSize: 14,
    color: '#666666',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  actionText: {
    color: '#007BFF',
    fontWeight: 'bold',
  },
  addNoticeContainer: {
    marginTop: 20,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    marginBottom: 10,
    padding: 8,
  },
});

export default SpecialNotices;
