// var admin = require("firebase-admin");

// var serviceAccount = require("../../boozemart-firebase-adminsdk.json");

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
//   databaseURL: "jdbc:mariadb://localhost:3306/db1"
// });

export class TwilioNotification{
    send(phone: string, text: string){
      const accountSid = process.env.twilioAccountSID;
      const authToken = process.env.twilioAuthToken;
      const fromPhone = process.env.twilioFromPhone;
      const client = require('twilio')(accountSid, authToken);
      
      client.messages
      // .create({body: 'Hi there', from: '+16089676147', to: '+918655025343'})
      .create({body: text, from: '', to: phone})
      .then(message => console.log(message.sid), 
            error => console.log(error));
    }

}
