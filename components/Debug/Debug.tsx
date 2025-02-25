import React, {useEffect} from 'react';
import { View, Button, Alert } from 'react-native';
import * as Sharing from 'expo-sharing';
import * as FileSystem from 'expo-file-system';
import { Share } from 'react-native';

/**
 * Basic component for debugging new functionality in react-native.
 */
export function Debug() {

  const [sharingEnabled, setSharingEnabled] = React.useState(false);

  useEffect(() => {
    async function doAsync() {
      if (await Sharing.isAvailableAsync()) {
        setSharingEnabled(true);
      }

    }

    doAsync().catch(console.error);

  })

  if(! sharingEnabled) {
    return null;
  }

  function handlePress() {
    async function doAsync() {

      // const fileUri = `${FileSystem.cacheDirectory}shared-url.html`;

      const url = 'https://www.google.com'
      //
      // const html = `<html><body><a href="${url}">${url}</a></body></html>`;
      //
      // // Write the URL to a file
      // await FileSystem.writeAsStringAsync(fileUri, html);
      //
      // await Sharing.shareAsync(fileUri);

      await Share.share({
        message: url, // This will be used as the message body
      });

    }

    doAsync().catch(console.error);

  }

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Button title="Press Me" onPress={handlePress} />
    </View>
  );
}
