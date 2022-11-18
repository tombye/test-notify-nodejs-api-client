const fs = require('fs')
const NotifyClient = require('notifications-node-client').NotifyClient;

const args = process.argv.slice(2);

if (!args.length) {
  console.log('No environment given');
  process.exit(1);
}

const env = args[0];
const localFile = './user_research_poster.pdf';
const invalidFile = './invalid.pdf';

function sendAFile (sendAFileTemplateId, emailAddress) {
  fs.readFile(localFile, function (err, pdfFile) {
    if (err !== null) { console.log(err); }

    notifyClient.sendEmail(sendAFileTemplateId, emailAddress, {
      personalisation: {
        link_to_document: notifyClient.prepareUpload(pdfFile)
      }
    }).then(response => {
      console.log(response.body);
    }).catch(err => {
      console.error('Error: ' + err.message);
    });
  })
};

function sendAnSms (smsTemplateId, phoneNumber) {
  notifyClient
    .sendSms(smsTemplateId, phoneNumber, {
      personalisation: {
        'name': 'Tom'
      },
      reference: 'test-sms-works'
    })
    .then(response => console.log(response))
    .catch(err => console.error(err))
};

function sendAnEmail (templateId, emailAddress, emailReplyToId) {
  notifyClient
  .sendEmail(templateId, emailAddress, {
    personalisation: {
      'name': 'Tom'
    },
    reference: 'test-email-works',
    emailReplyToId: emailReplyToId
  })
  .then(response => console.log(response))
  .catch(err => console.error(err))
};

function main () {
  fs.readFile('config.json', { 'encoding': 'utf8' }, function (err, configData) {
    if (err !== null) { console.log(err); }

    configData = JSON.parse(configData);

    const emailAddress = configData['emailAddress'];
    const {
      apiKey,
      apiRoot,
      smsTemplateId,
      emailTemplateId,
      sendAFileTemplateId,
      emailReplyToId
    } = configData[env];

    notifyClient = new NotifyClient(apiRoot, apiKey)

    // sendAnEmail(emailTemplateId, emailAddress, emailReplyToId);
    // sendAnSms (smsTemplateId, phoneNumber);
    sendAFile(sendAFileTemplateId, emailAddress, emailReplyToId);
  });
};

main();
