import { StatusBar } from "expo-status-bar";
import React, { useState, useRef } from "react";
import { StyleSheet, SafeAreaView, Button, Text, TextInput, View } from "react-native";
import { createCheckout } from "./backend";
import AptWebview from "./AptWebView";

function AmountBox({amount, setAmount}) {
  return (
    <TextInput
      style={styles.amountBox}
      onChangeText={(text) => setAmount(text)}
      value={amount}
      keyboardType="numeric"
    />
  );
}

export default function App() {
  const [status, setStatus] = useState("PENDING");
  const [amount, setAmount] = useState("100");
  const redirectUrl = useRef(null);

  async function startFlow() {
    setStatus("GETTING_TOKEN");
    const { redirectCheckoutUrl } = await createCheckout(parseFloat(amount));
    redirectUrl.current = redirectCheckoutUrl;
    setStatus("IN_PROGRESS");
  }

  return (
    <SafeAreaView style={styles.container}>
      <AmountBox amount={amount} setAmount={(amt) => setAmount(amt)} />
      <View style={styles.button}>
        <Button
          disabled={status === "GETTING_TOKEN" || isNaN(amount)}
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
    marginTop: 10,
  },
  amountBox: {
    height: 40,
    width: "50%",
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 20,
    padding: 5,
    borderRadius: 5,
    textAlign: "right"
  },
});
