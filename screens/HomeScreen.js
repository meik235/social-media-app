import { SafeAreaView, StyleSheet, ScrollView, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import BottomTabs, { bottomTabIcons } from '../components/home/BottomTabs'
import Header from '../components/home/Header'
import Stories from '../components/home/Stories'
import Post from '../components/home/Post'
import { POSTS } from '../Data/posts'
import { db } from '../firebase'

const HomeScreen = ({navigation}) => {
  const [posts, setPosts] = useState([])
  
  useEffect(() => {
    db.collectionGroup('posts').onSnapshot(snapshot => {
        setPosts(snapshot.docs.map(post => ({id: post.id, ...post.data()})))
      })
  }, [])
  
  return (
    <SafeAreaView style={styles.container}>
      <Header navigation={navigation} />
      <Stories />
      <ScrollView >
        { posts.map((post, index) => (
          <Post post={post} key={index} />
        ))}
      </ScrollView>
      <BottomTabs icons={bottomTabIcons} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
    flex: 1,
    paddingTop: 15,
  }
})

export default HomeScreen