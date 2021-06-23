import React from "react";
import { WebView } from "react-native-webview";
import { Modal, Platform, SafeAreaView } from "react-native";

export default function AptWebview({ redirectUrl, onClose, onStatus }) {
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
        onClose();
      }}
    >
      <SafeAreaView>
        <WebView
          useWebKit={Platform.OS == "ios"}
          domStorageEnabled={true}
          startInLoadingState={true}
          onNavigationStateChange={(event) => handleAfterpayResponse(event)}
          javaScriptEnabled={true}
          originWhitelist={["*"]}
          source={{ uri: redirectUrl }}
        />
      </SafeAreaView>
    </Modal>
  );
}
