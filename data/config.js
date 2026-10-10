/* Site configuration: the only file you normally edit to connect the "Share an idea" form.

   Choose ONE way to receive ideas (see docs/FORM-SETUP-GOOGLE-DRIVE.md):

   A) Google Drive + email notification (recommended, free, your address stays private):
        formTransport: 'apps-script',
        formEndpoint:  'https://script.google.com/macros/s/XXXXXXXX/exec'

   B) A form-to-email service such as Web3Forms or Formspree:
        formTransport: 'json',
        formEndpoint:  'https://api.web3forms.com/submit',
        formFields:    { access_key: 'YOUR-KEY' }

   While formEndpoint is empty the form shows "Submissions are temporarily unavailable." */
window.MBALAB_CONFIG = {
  formTransport: 'json',          /* 'apps-script' | 'json' */
  formEndpoint: 'https://api.web3forms.com/submit',  /* URL of the receiving service; empty = submissions disabled */
  formFields: { access_key: '7e679aea-7d8b-49d9-a1f4-4af3ec4d1f5d' }   /* Web3Forms public access key (safe in client code; the receiving email is not stored here) */
};
