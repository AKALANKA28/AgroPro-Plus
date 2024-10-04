import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
<<<<<<< Updated upstream
  Button,
  TextInput
} from 'react-native';
import axios from 'axios';

const API_URL = 'http://192.168.36.108:8070/notice';
=======
  TextInput,
} from 'react-native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/Feather'; // Import Feather for modern icons

const API_URL = 'http://192.168.238.108:8070/notice';
>>>>>>> Stashed changes

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
<<<<<<< Updated upstream
=======
      Alert.alert('Success', 'Notice added successfully');
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
  
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

=======
      const foundOne = notices.find((n) => n._id === id);
      let res = foundOne
        ? { heading: foundOne.heading, description: foundOne.description }
        : { heading: '', description: '' };
      setNewNotice(res);
      setUpdateId(id);
      setIsAdding(true);
      setIsAdd(false);
>>>>>>> Stashed changes
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.noticeContainer}>
<<<<<<< Updated upstream
=======
      {/* Modern Bell Alert Icon */}
      <Icon name="bell" size={24} color="#ff9800" style={styles.emergencyIcon} />
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
            onChangeText={(text) => setNewNotice({ ...newNotice, heading: text })}
=======
            onChangeText={(text) =>
              setNewNotice({ ...newNotice, heading: text })
            }
>>>>>>> Stashed changes
            style={styles.input}
          />
          <TextInput
            placeholder="Description"
            value={newNotice.description}
<<<<<<< Updated upstream
            onChangeText={(text) => setNewNotice({ ...newNotice, description: text })}
            style={styles.input}
          />
          <Button title={`${isAdd ? 'Add' : 'Update'} Notice`} onPress={() => isAdd ? addNotice() : updateNotice()} />
          <Button title="Cancel" onPress={() => setIsAdding(false)} />
        </View>
      ) : (
        <Button title="Add New Notice" onPress={() => {setIsAdding(true); setIsAdd(true);}} />
=======
            onChangeText={(text) =>
              setNewNotice({ ...newNotice, description: text })
            }
            style={styles.input}
          />
          <TouchableOpacity
            style={styles.button}
            onPress={() => (isAdd ? addNotice() : updateNotice())}
          >
            <Text style={styles.buttonText}>
              {isAdd ? 'Add Notice' : 'Update Notice'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.cancelButton]}
            onPress={() => setIsAdding(false)}
          >
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => {
            setIsAdding(true);
            setIsAdd(true);
          }}
        >
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
>>>>>>> Stashed changes
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
<<<<<<< Updated upstream
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
=======
    backgroundColor: '#fff',
  },
  headerText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2e7d32', // Dark green
    marginBottom: 20,
    textAlign: 'center',
  },
  noticeContainer: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 6,
    borderLeftWidth: 5,
    borderLeftColor: '#2e7d32',
    position: 'relative',
  },
  emergencyIcon: {
    position: 'absolute',
    top: 10,
    left: 10,
  },
  noticeHeading: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1b5e20',
    marginLeft: 40, // To align the text away from the icon
  },
  noticeDescription: {
    fontSize: 16,
    color: '#424242',
    marginTop: 8,
    marginLeft: 40, // To align the text away from the icon
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 10,
  },
  actionText: {
    color: '#ff9800',
    fontWeight: '500',
    marginLeft: 20,
  },
  addNoticeContainer: {
    marginTop: 20,
    backgroundColor: '#f9f9f9',
    padding: 20,
    borderRadius: 15,
    elevation: 6,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#bdbdbd',
    marginBottom: 15,
    padding: 10,
    fontSize: 16,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
  },
  button: {
    backgroundColor: '#2e7d32',
    padding: 12,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 10,
  },
  cancelButton: {
    backgroundColor: '#d32f2f',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  addButton: {
    position: 'absolute',
    right: 20,
    bottom: 30,
    backgroundColor: '#2e7d32',
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 8,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
>>>>>>> Stashed changes
  },
});

export default SpecialNotices;
