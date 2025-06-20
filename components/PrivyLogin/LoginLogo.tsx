import {Image, StyleSheet} from "react-native";
import React from "react";

const Logo = require('../../assets/images/login-logo.png')

export default function LoginLogo() {
  return (
    <Image source={Logo} style={styles.logo} />
  )
}


const styles = StyleSheet.create({
  logo: {
    width: Math.floor(2312 * 0.1),
    height: Math.floor(450 * 0.1)
  },
});
