import React from 'react';
import { View, Text, ScrollView, Image, StyleSheet } from 'react-native';
// import { LinearGradient } from 'expo-linear-gradient';
// import { LinearGradient } from 'react-native-linear-gradient';
import { USERS } from '../../Data/users';

USERS;

const Stories = () => {
  return (
    <View style={{ marginBottom: 13 }}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {USERS.map((story, index) => (
          <View key={index} style={{ alignItems: 'center' }}>
            <Image source={{ uri: story.image }} style={styles.story} />
            <Text style={{ color: 'white' }}>
              {story.users.length > 9
                ? story.users.slice(0, 6).toLowerCase() + '...'
                : story.users.toLowerCase()}
            </Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  story: {
    width: 70,
    height: 70,
    borderRadius: 50,
    marginLeft: 18,
    borderWidth: 3,
    borderColor: '#5A29E7',
  },

});

export default Stories;