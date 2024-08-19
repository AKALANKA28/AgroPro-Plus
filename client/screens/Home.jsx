import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  RefreshControl,
} from "react-native";
import React, { useContext, useState, useCallback, useEffect } from "react";
import { AuthContext } from "../context/authContext";
import NavigationBar from "../components/Menus/NavigationBar";
// import { PostContext } from "../context/postContext";
// import PostCard from "../components/PostCard";

const Home = () => {
  //global state
  const [state] = useContext(AuthContext);
  // const [posts, getAllPosts] = useContext(PostContext);
  const [refreshing, setRefreshing] = useState(false);
  useEffect(() => {}, []);
  // useEffect(() => {}, [getAllPosts]);

  //refresh controll
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    // getAllPosts;
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);
  return (
    <View style={styles.container}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {/* <PostCard posts={posts} /> */}
        <Text>{JSON.stringify(state, null, 4)}</Text>
      </ScrollView>
      <View style={{ backgroundColor: "#ffffff" }}>
        <NavigationBar />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
    justifyContent: "space-between",
  },
});

export default Home;
