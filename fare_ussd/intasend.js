const IntaSend = require('intasend-node');

let intasend = new IntaSend(
  process.env.INTA_PUB_KEY,
  process.env.INTA_SEC_KEY,
  true, // Test ? Set true for test environment
);

exports.intaSTKPush = async (payInfo) => {
  let collection = intasend.collection();
  try {
    const response = await collection.mpesaStkPush({
      amount: payInfo.amount,
      phone_number: payInfo.phone,
      api_ref: 'test',
    });
    // Redirect user to URL to complete payment
    console.log(`STK Push Resp:`, response);
    return response; // Return the response received from the API
  } catch (err) {
    console.error(`STK Push Resp error:`, err);
    throw err;
  }
};