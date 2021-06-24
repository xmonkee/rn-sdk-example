import React from "react";
import { WebView } from "react-native-webview";
import { Modal, Platform } from "react-native";

export default function AptWebview({ redirectUrl, onStatus }) {
  function handleAfterpayResponse(event) {
    const path = event.url || "";
    if (path.includes("status=CANCELLED")) {
      onStatus("CANCELLED");
    } else if (path.includes("status=SUCCESS")) {
      onStatus("SUCCESS");
    }
  }

  return (
    <Modal
      onRequestClose={() => {
        onStatus("CANCELLED");
      }}
    >
      <WebView
        style={{ marginTop: 18 }}
        useWebKit={Platform.OS == "ios"}
        domStorageEnabled={true}
        startInLoadingState={true}
        onNavigationStateChange={(event) => handleAfterpayResponse(event)}
        javaScriptEnabled={true}
        originWhitelist={["*"]}
        source={{ uri: redirectUrl }}
      />
    </Modal>
  );
}
