const UssdMenu = require('ussd-builder');
const vehicle = require('./vehicles');
const mpesa = require('./mpesa');
const STKPush = require('./intasend')

let sessions = {};
let menu = new UssdMenu();


menu.startState({
  run: () => {
    menu.con(`Welcome to TumaFare \n\n Please enter the vehicle fleet number:`);
  },
  next: {
    '*\\w': 'inputAmount'
  }
});

menu.state('inputAmount', {
  run: () => {
    let fleet = menu.val;
    let session = getSession(menu.args.sessionId);
    session.set('fleet_no', fleet);
    menu.con(`Enter the amount`);
  },
  next: {
    '*\\d+': 'confirmInput'
  }
});

menu.state('confirmInput', {
  run: () => {
    let amnt = menu.val;
    let session = getSession(menu.args.sessionId);
    session.set('amount', amnt);
    menu.con(`You are about to pay ${amnt} to TumaFare Inc. Please confirm:
        \n1. Confirm` +
      `\n2. Cancel`)
  },
  next: {
    '1': 'confirmPay',
    '2': 'cancelPay'
  }
});

menu.state('confirmPay', {
  run: async () => {
    try {
      // Retrieve session data
      let session = getSession(menu.args.sessionId);

      // Prepare payment information
      const payInfo = {
        phone: menu.args.phoneNumber.substring(1), // Get phone number from USSD args
        amount: 10 // Get amount from session data
      };

      console.log('Payment Info:', payInfo);

      // Initiate M-Pesa STK push payment using the payment service
      const paymentResponse = await STKPush.intaSTKPush(payInfo);

      // Log payment response (optional)
      console.log('Payment Response:', paymentResponse);

      // End the USSD session with a confirmation message
      menu.end(`Thank you for using Tuma Fare service. Enter your MPesa pin when prompted.`);
    } catch (error) {
      // Log and handle any errors
      console.error('Error confirming payment:', error);
      // End the USSD session with an error message
      menu.end(`An error occurred. Please try again later.`);
    }
  }
});


menu.state('cancelPay', {
  run: () => {
    menu.end(`You have cancelled the transaction. Thank you for using Tuma Fare.`)
  }
});

exports.initUssd = async (req, res) => {
  let args = {
    phoneNumber: req.body.phoneNumber,
    sessionId: req.body.sessionId,
    serviceCode: req.body.serviceCode,
    Operator: req.body.networkCode || req.body.Operator,
    text: req.body.text
  };
  console.log(args);
  menu.run(args, ussdResult => {
    res.send(ussdResult);
  });
};