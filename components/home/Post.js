import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Divider } from 'react-native-elements'
import { firebase, db } from '../../firebase';

const postFooterIcons = [
  {
    name: 'Like',
    imageUrl: 'https://img.icons8.com/ios/100/ffffff/like--v1.png',
    likedImageUrl: 'https://img.icons8.com/ios-filled/50/fa314a/like--v1.png',
  },
  {
    name: 'Comment',
    imageUrl: require('../../assets/icons-comment.png'),
  },
  {
    name: 'Share',
    imageUrl: require('../../assets/icons-share.png'),
  },
  {
    name: 'Save',
    imageUrl: require('../../assets/icons-save.png'),
  },
]

const Post = ({ post }) => {
  const handleLike = post => {
    const currentLikeStatus = !post.likes_by_users.includes(
      firebase.auth().currentUser.email
    )

    db.collection('users')
    .doc(post.owner_email)
    .collection('posts')
    .doc(post.id)
    .update({
      likes_by_users: currentLikeStatus 
        ? firebase.firestore.FieldValue.arrayUnion(
            firebase.auth().currentUser.email) 
        : firebase.firestore.FieldValue.arrayRemove(
            firebase.auth().currentUser.email),
    })
    .then(() => {
      console.log('Document successfully updated!')
    })
    .catch(error => {
      console.error('Error updating document: ', error)
    })

  }
  return (
    <View style={{ marginBottom: 30 }}>
      <Divider orientation="vertical" width={1} />
      <PostHeader post={post} />
      <PostImage post={post} />
      <View style={{ marginHorizontal: 15, marginTop: 10}}>
        <PostFooter post={post} handleLike={handleLike} />
        <Likes post={post} />
        <Caption post={post} />
        <CommentsSection post={post} />
        <Comments post={post} />
      </View>
    </View>
  );
};

const PostHeader = ({ post }) => (
    <View style={{
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        margin: 5, 
        alignItems: 'center'}}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Image source={{ uri: post.profile_picture }} style={styles.story}/>
            <Text style={{color:'white', marginLeft: 5, fontWeight: '700'}}>{post.user}</Text>
        </View>
        <View>
            <Text style={{color: 'white', fontWeight: '900'}}>...   </Text>
        </View>
    </View>
);

const PostImage = ({ post }) => (
    <View style={{ width: '100%', height: 450}}>
        <Image 
        source={{uri: post.imageUrl}} 
        style={{height: '100%', resizeMode: "cover"}} 
        />
  </View>
);

const PostFooter = ({ handleLike, post }) => (
  <View style={{ flexDirection:'row' }}>
    <View style={styles.leftFooterIconsContainer}>
      <TouchableOpacity onPress={() => handleLike(post)} >
        <Image 
          style={styles.footerIcon} 
          source={{uri: post.likes_by_users.includes(firebase.auth().currentUser.email) 
            ? postFooterIcons[0].likedImageUrl 
            : postFooterIcons[0].imageUrl,
          }} 
        />
      </TouchableOpacity>
      <Icon imgStyle={styles.footerIcon} imgUrl={postFooterIcons[1].imageUrl} />
      <Icon imgStyle={[styles.footerIcon, styles.shareIcon]} imgUrl={postFooterIcons[2].imageUrl} />
    </View>

    <View style={{ flex: 1, alignItems: 'flex-end'}}>
      <Icon imgStyle={styles.footerIcon} imgUrl={postFooterIcons[3].imageUrl} />
    </View>
  </View>
);

const Icon = ({ imgStyle , imgUrl }) => (
  <TouchableOpacity>
    <Image style={ imgStyle } source={ imgUrl } />
  </TouchableOpacity>
);

const Likes = ({ post }) => (
  <View style={{ flexDirection: 'row', marginTop: 4 }}>
    <Text style={{ color: 'white', fontWeight: '600' }}>
      {post.likes_by_users.length.toLocaleString('en')} likes
    </Text>
  </View>
);

const Caption = ({ post }) => (
  <View style={{ marginTop: 5 }}>
    <Text style={{ color: 'white' }}>
      <Text style={{ fontWeight: '600' }}>{post.user}</Text>
      <Text> {post.caption}</Text>
    </Text>
  </View>
);

const CommentsSection = ({ post }) => (
  <View style={{ marginTop: 5 }}>
    {!!post.comments.length && (
      <Text style={{ color: 'gray'}}>
        View{post.comments.length > 1 ? ' all' : ''} {post.comments.length}{' '}
        {post.comments.length > 1 ? 'comments' : 'comment'}
      </Text>
    )}
  </View>
);

const Comments = ({ post }) => (
  <>
    {post.comments.map((comment, index) => (
      <View key={index} style={{ flexDirection: 'row', marginTop: 5 }}>
        <Text style={{ color: 'white' }}>
          <Text style={{ fontWeight: '600' }}>{comment.user}</Text>
          {comment.comment}
        </Text>
      </View>
    ))}
  </>
);

const styles = StyleSheet.create({
  story: {
    width: 40,
    height: 40,
    borderRadius: 50,
    borderWidth: 2,
    marginLeft: 6,
    borderColor: '#5A29E7',
  },

  footerIcon: {
  width: 33,
  height: 33,
  },

  shareIcon: {
    transform: [{ rotate: '10deg' }],
    marginTop: -3,
  },

  leftFooterIconsContainer : {
    flexDirection: 'row',
    width: '32%',
    justifyContent : "space-between",
  },

});

export default Post