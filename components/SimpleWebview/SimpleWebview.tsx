import {View} from "react-native";
import WebView from "react-native-webview";

export default function SimpleWebview() {

  return (
    <View
      style={{
        flex: 1,
      }}
    >

      <WebView
        source={{ uri: 'https://example.com/' }}
      />

    </View>
  );
}
