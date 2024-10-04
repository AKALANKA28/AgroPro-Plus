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
  Modal, 
  ScrollView 
} from 'react-native';
import * as ImagePicker from 'expo-image-picker'; // Import ImagePicker

const ShareExperience = () => {
  const [experience, setExperience] = useState('');
  const [posts, setPosts] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editedExperience, setEditedExperience] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  // State to manage the expanded view
  const [expandedPost, setExpandedPost] = useState(null);
  const [expandedModalVisible, setExpandedModalVisible] = useState(false);

  useEffect(() => {
    fetchPosts();
  }, []);

  // Fetch posts from the server
  const fetchPosts = async () => {
    try {
      const response = await fetch('http://192.168.238.108:8070/post'); // Replace with your actual IP or URL
      const data = await response.json();
      setPosts(data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  // Handle posting a new experience
  const handlePost = async () => {
    if (experience.trim()) {
      const post = { text: experience, image: selectedImage };
      try {
        const response = await fetch('http://192.168.238.108:8070/post', { // Replace with your actual IP or URL
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(post),
        });
        const newPost = await response.json();
        setPosts([newPost, ...posts]); // Fixing the setPost error
        setExperience('');
        setSelectedImage(null);
      } catch (error) {
        console.error('Error adding post:', error);
      }
    }
  };

  // Pick an image from the device's library
  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission to access media library is required.');
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    }
  };

  // Handle expanding a post to show in a modal
  const handleExpandPost = (post) => {
    setExpandedPost(post);
    setExpandedModalVisible(true);
  };

  // Handle closing the expanded post modal
  const handleCloseExpandedModal = () => {
    setExpandedModalVisible(false);
    setExpandedPost(null);
  };

  // Handle updating a post
  const handleUpdate = async () => {
    if (editedExperience.trim() && editingIndex !== null) {
      const updatedPost = { text: editedExperience, image: posts[editingIndex].image };
      try {
        const response = await fetch(`http://192.168.238.108:8070/post/${posts[editingIndex]._id}`, { // Replace with your actual IP or URL
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedPost),
        });
        const updatedPostData = await response.json();
        const newPosts = [...posts];
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

  // Handle deleting a post
  const handleDelete = async (postId) => {
    try {
      await fetch(`http://192.168.238.108:8070/post/${postId}`, {
        method: 'DELETE',
      });
      setPosts(posts.filter(post => post._id !== postId));
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  // Render each post
  const renderItem = ({ item, index }) => (
    <View style={styles.postContainer}>
      <TouchableOpacity onPress={() => handleExpandPost(item)}>
        <Text style={styles.postText}>{item.text}</Text>
        {item.image && <Image source={{ uri: item.image }} style={styles.postImage} />}
      </TouchableOpacity>
      <View style={styles.buttonContainer}>
        <Button title="Edit" onPress={() => {
          setEditingIndex(index);
          setEditedExperience(item.text);
          setModalVisible(true);
        }} />
        <Button title="Delete" color="red" onPress={() => handleDelete(item._id)} />
      </View>
    </View>
  );

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.headerText}>Share Your Experience</Text>

        <Image
          source={{ uri: 'https://d1g9yur4m4naub.cloudfront.net/images/Article_Images/ImageForArticle_1111_16825011217071293.jpg' }} 
          style={styles.headerImage}
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
            scrollEnabled={false}  // Disable FlatList scrolling so ScrollView takes over
          />
        </View>

        {/* Expanded Post Modal */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={expandedModalVisible}
          onRequestClose={handleCloseExpandedModal}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              {expandedPost && (
                <>
                  <Text style={styles.modalPostText}>{expandedPost.text}</Text>
                  {expandedPost.image && (
                    <Image source={{ uri: expandedPost.image }} style={styles.modalPostImage} />
                  )}
                  <Button title="Close" onPress={handleCloseExpandedModal} />
                </>
              )}
            </View>
          </View>
        </Modal>

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
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
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
  headerImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
  },
  imagePreview: {
    width: '100%',
    height: 150,
    borderRadius: 10,
    marginBottom: 20,
    resizeMode: 'cover',
  },
  recentPostsContainer: {
    marginTop: 30,
  },
  recentPostsHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#4CAF50',
  },
  postContainer: {
    backgroundColor: '#FFFFFF',
    padding: 10,
    borderRadius: 10,
    marginBottom: 20,
    width: '48%',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  postText: {
    fontSize: 16,
    marginBottom: 10,
    color: '#333333',
  },
  postImage: {
    width: '100%',
    height: 150, 
    borderRadius: 10,
    resizeMode: 'cover',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 10,
    width: '90%',
    alignItems: 'center',
  },
  modalInput: {
    height: 100,
    borderColor: '#CCCCCC',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    textAlignVertical: 'top',
  },
  modalPostText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginBottom: 10,
  },
  modalPostImage: {
    width: '100%',
    height: 300,
    borderRadius: 10,
    resizeMode: 'cover',
    marginBottom: 20,
  },
});

export default ShareExperience;
