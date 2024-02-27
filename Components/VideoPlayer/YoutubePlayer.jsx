import React from 'react';
import { View, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';

const YoutubePlayer = ({ videoUrl }) => {
  return (
    <View style={styles.container}>
      <WebView
        source={{ uri: videoUrl }}
        style={styles.webview}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  webview: {
    flex: 1,
  },
});

export default YoutubePlayer;
