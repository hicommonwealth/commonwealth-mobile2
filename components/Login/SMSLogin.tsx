import { Button, TextInput, View, StyleSheet } from "react-native";
import { useState } from "react";
import {useMagic} from "@/hooks/useMagic";

type Props = {
  onCancel: () => void
};

export default function SMSLogin(props: Props) {
  const [phoneNumber, setPhoneNumber] = useState("");

  const magic = useMagic()

  const handleSubmit = () => {
    if (phoneNumber.trim()) {
      // TODO: handle the phone number here.

      console.log("Trying to auth via SMS")

      async function doAsync() {

        const bearer = await magic.auth.loginWithSMS({
          phoneNumber: phoneNumber.trim()
        })

        console.log("Got bearer token: ", bearer)

      }

      doAsync().catch(console.error)

    } else {
      alert("Please enter a valid phone number.");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputWrapper}>
        <TextInput
          style={styles.input}
          placeholder="Enter your phone number"
          keyboardType="phone-pad"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
        />
      </View>
      <View style={styles.buttonWrapper}>
        <Button title="Cancel" onPress={props.onCancel} color="red" />
      </View>
      <View style={styles.buttonWrapper}>
        <Button title="Submit" onPress={handleSubmit} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  inputWrapper: {
    width: "100%",
    marginBottom: 20,
  },
  input: {
    height: 50,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    fontSize: 16,
    width: "100%",
  },
  buttonWrapper: {
    width: "100%",
  },
});
