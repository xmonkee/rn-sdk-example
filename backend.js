export async function createCheckout() {
  var resp = await fetch("https://emphasized-nice-homburg.glitch.me");
  var json = await resp.json();
  return json;
}
