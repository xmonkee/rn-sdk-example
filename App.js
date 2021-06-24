import { StatusBar } from "expo-status-bar";
import React, { useState, useRef } from "react";
import { StyleSheet, SafeAreaView, Button, Text, View } from "react-native";
import { createCheckout } from "./backend";
import AptWebview from "./AptWebView";

export default function App() {
  const [status, setStatus] = useState("PENDING");
  const redirectUrl = useRef(null);

  async function startFlow() {
    setStatus("GETTING_TOKEN");
    const { redirectCheckoutUrl } = await createCheckout();
    redirectUrl.current = redirectCheckoutUrl;
    setStatus("IN_PROGRESS");
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.button}>
        <Button
          disabled={status === "GETTING_TOKEN"}
          style={styles.button}
          title="Afterpay It!"
          onPress={() => startFlow()}
        />
      </View>
      <Text style={styles.status}>Status: {status}</Text>
      {status === "IN_PROGRESS" ? (
        <View>
          <AptWebview
            redirectUrl={redirectUrl.current}
            onStatus={(status) => setStatus(status)}
          />
        </View>
      ) : null}
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    borderRadius: 5,
    backgroundColor: "#b2fce4",
    width: "50%",
    alignItems: "center",
    justifyContent: "center",
  },
  status: {
    margin: 10,
  },
});
