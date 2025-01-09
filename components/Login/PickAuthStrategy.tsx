import {Button, View} from "react-native";

export type AuthStrategy = "SMS"

type Props = {
  onStrategyPicked: (strategy: AuthStrategy) => void;
}

export default function PickAuthStrategy(props: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.buttonWrapper}>
        <Button title={"SMS"} onPress={() => props.onStrategyPicked("SMS")} />
      </View>
    </View>
  );
}

const styles = {
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  buttonWrapper: {
    width: "100%", // Makes the button expand horizontally
    paddingHorizontal: 20, // Add horizontal padding
    paddingVertical: 10, // Optional: Add vertical padding for spacing
  },
} as const;
