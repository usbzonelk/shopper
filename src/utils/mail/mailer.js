const ElasticEmail = require("@elasticemail/elasticemail-client");
const dotenv = require("dotenv").config();

const defaultClient = ElasticEmail.ApiClient.instance;

const apikey = defaultClient.authentications["apikey"];
apikey.apiKey = process.env.MAIL_API;

const emailsApi = new ElasticEmail.EmailsApi();

const mailBodyTemplate = [
  {
    ContentType: "HTML",
    Charset: "utf-8",
    Content: "<strong>Mail content.<strong>",
  },
  {
    ContentType: "PlainText",
    Charset: "utf-8",
    Content: "Mail content.",
  },
];

const emailData = {
  Recipients: {
    To: [""],
  },
  Content: {
    Body: null,
    From: "",
    Subject: "",
  },
};

const callbackReturnValues = {
  error: false,
  success: false,
};
const callbackReturn = () => {
  console.log(callbackReturnValues);
};

const callback = (error, data, response) => {
  if (error) {
    callbackReturnValues.error = error.message;
  } else {
    callbackReturnValues.success = true;
  }
  callbackReturn();
};

const mailSender = (
  receipts = [],
  body = mailBodyTemplate,
  subject = "Hi",
  fromAddress = "nushy.sx@pm.me"
) => {
  emailData.Recipients.To = receipts;
  emailData.Content.From = fromAddress;
  emailData.Content.Subject = subject;
  emailData.Content.Body = body;

  emailsApi.emailsTransactionalPost(emailData, callback);
};

module.exports = { mailSender };
