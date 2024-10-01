import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  Button, 
  StyleSheet, 
  FlatList, 
  Image, 
  TouchableOpacity, 
  Alert, 
  Modal 
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const ShareExperience = () => {
  const [experience, setExperience] = useState('');
  const [posts, setPosts] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editedExperience, setEditedExperience] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await fetch('http://192.168.36.108:8070/notice/post');
      const data = await response.json();
      setPosts(data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  const handlePost = async () => {
    if (experience.trim()) {
      const post = { text: experience, image: selectedImage };
      try {
        const response = await fetch('http://192.168.36.108:8070/notice/post', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(post),
        });
        const newPost = await response.json();
        setPost([newPost, ...post]);
        setExperience('');
        setSelectedImage(null);
      } catch (error) {
        console.error('Error adding post:', error);
      }
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.uri);
    }
  };

  const handleUpdate = async () => {
    if (editedExperience.trim() && editingIndex !== null) {
      const updatedPost = { text: editedExperience, image: post[editingIndex].image };
      try {
        const response = await fetch(`http://192.168.36.108:8070/notice/post/${post[editingIndex]._id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedPost),
        });
        const updatedPostData = await response.json();
        const newPosts = [...post];
        newPosts[editingIndex] = updatedPostData;
        setPosts(newPosts);
        setModalVisible(false);
        setEditingIndex(null);
        setEditedExperience('');
      } catch (error) {
        console.error('Error updating post:', error);
      }
    }
  };

  const handleDelete = async (id) => {
    Alert.alert(
      'Delete Post',
      'Are you sure you want to delete this post?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: async () => {
            try {
              await fetch(`http://192.168.36.108:8070/notice/post/${id}`, {
                method: 'DELETE',
              });
              const newPosts = posts.filter(post => post._id !== id);
              setPosts(newPosts);
            } catch (error) {
              console.error('Error deleting post:', error);
            }
          },
        },
      ],
      { cancelable: false }
    );
  };

  const showOptions = (index) => {
    Alert.alert(
      'Options',
      'What would you like to do?',
      [
        {
          text: 'Update',
          onPress: () => {
            setEditingIndex(index);
            setEditedExperience(posts[index].text);
            setModalVisible(true);
          },
        },
        {
          text: 'Delete',
          onPress: () => handleDelete(posts[index]._id),
        },
        {
          text: 'Cancel',
          style: 'cancel',
        },
      ],
      { cancelable: true }
    );
  };

  const renderItem = ({ item, index }) => (
    <View style={styles.postContainer}>
      <Text style={styles.postText}>{item.text}</Text>
      {item.image && <Image source={{ uri: item.image }} style={styles.postImage} />}
      <TouchableOpacity style={styles.optionsButton} onPress={() => showOptions(index)}>
        <Text style={styles.optionsButtonText}>⋮</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Share Your Experience</Text>

      <Image
        source={{ uri: 'https://d1g9yur4m4naub.cloudfront.net/images/Article_Images/ImageForArticle_1111_16825011217071293.jpg' }} 
        style={styles.imge}
      />

      <TextInput
        style={styles.textInput}
        placeholder="Write your experience here..."
        value={experience}
        onChangeText={setExperience}
        multiline
      />

      <TouchableOpacity style={styles.imageButton} onPress={pickImage}>
        <Text style={styles.imageButtonText}>Add an Image</Text>
      </TouchableOpacity>

      {selectedImage && (
        <Image source={{ uri: selectedImage }} style={styles.imagePreview} />
      )}
      
      <Button 
        title="Post Experience"
        onPress={handlePost}
        disabled={!experience.trim()}
      />
      
      <View style={styles.recentPostsContainer}>
        <Text style={styles.recentPostsHeader}>Recent Posts</Text>
        <FlatList
          data={posts}
          keyExtractor={(item) => item._id}
          renderItem={renderItem}
          numColumns={2}
          columnWrapperStyle={styles.gridContainer}
        />
      </View>

      {/* Modal for updating post */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
          setEditingIndex(null);
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TextInput
              style={styles.modalInput}
              placeholder="Update your experience..."
              value={editedExperience}
              onChangeText={setEditedExperience}
              multiline
            />
            <Button title="Update" onPress={handleUpdate} />
            <Button title="Cancel" onPress={() => setModalVisible(false)} color="red" />
          </View>
        </View>
      </Modal>
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
    fontSize: 30,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#4CAF50',
    marginTop: 40,
    marginBottom: 25,
  },
  textInput: {
    height: 100,
    borderColor: '#CCCCCC',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 40,
    textAlignVertical: 'top',
  },
  imageButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    alignItems: 'center',
  },
  imageButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  imge: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 40,
    resizeMode: 'cover',
  },
  imagePreview: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 15,
    resizeMode: 'cover',
  },
  recentPostsContainer: {
    marginTop: 20,
  },
  recentPostsHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginBottom: 10,
  },
  gridContainer: {
    justifyContent: 'space-between',
  },
  postContainer: {
    backgroundColor: '#E0F7FA',
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    width: '48%',
    position: 'relative', // To position the 3-dot button
  },
  postText: {
    fontSize: 16,
    color: '#333333',
  },
  postImage: {
    width: '100%',
    height: 150,
    borderRadius: 10,
    marginTop: 10,
    resizeMode: 'cover',
  },
  optionsButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#4CAF50',
    padding: 5,
    borderRadius: 15,
  },
  optionsButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalInput: {
    width: '100%',
    height: 100,
    borderColor: '#CCCCCC',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
  },
});

export default ShareExperience;
