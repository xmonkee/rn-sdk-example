export async function createCheckout(amount) {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({"amount":amount});

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };

  return fetch("https://apt-test-backend.glitch.me/", requestOptions)
    .then(response => response.json())
}
