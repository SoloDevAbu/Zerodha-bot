import { KiteConnect } from "kiteconnect";

const apiKey = "your_api_key";
const apiSecret = "your_api_secret";
const requestToken = "your_request_token";

const kc = new KiteConnect({ api_key: apiKey });

let accessToken = '';
async function init() {
  try {
    await generateSession();
    await getProfile();
  } catch (err) {
    console.error(err);
  }
}

async function generateSession() {
  try {
    const response = await kc.generateSession(requestToken, apiSecret);
    kc.setAccessToken(response.access_token);
    console.log("Session generated:", response);
  } catch (err) {
    console.error("Error generating session:", err);
  }
}

async function setAccessToken() {
  kc.setAccessToken(accessToken);
}

async function getProfile() {
  try {
    const profile = await kc.getProfile();
    console.log("Profile:", profile);
  } catch (err) {
    console.error("Error getting profile:", err);
  }
}
// Initialize the API calls
init();

export async function placeOrder(tradingsymbol: string, quantity: number, type: 'BUY' | 'SELL') {
  try {
    setAccessToken();
    const order = await kc.placeOrder("regular", {
      exchange: 'NSE',
      tradingsymbol,
      transaction_type: type,
      quantity,
      product: 'CNC',
      order_type: 'MARKET'
    })
  } catch (error) {
    console.error(error);
  }
}