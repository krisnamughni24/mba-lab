# Share an Idea → your Google Drive

Each submitted idea becomes a `.txt` file in a Drive folder you own (and, optionally, an e-mail to you).
Your e-mail address is never written into this repository or the website.

## 1. Create the Drive folder
1. In Google Drive create a folder, e.g. `MBA Lab Ideas`.
2. Open it and copy the ID from the URL: `https://drive.google.com/drive/folders/`**`THIS_PART`**.

## 2. Create the script
1. Go to <https://script.google.com> → **New project** (sign in with the Google account that owns the folder).
2. Replace the editor content with `apps-script/Code.gs` from this repo.
3. Set `FOLDER_ID` at the top to your folder ID. Set `NOTIFY_BY_EMAIL = false` if you only want files.
4. Select the function `testSetup` → **Run** → grant the permissions (Drive, and Mail if notifications are on).
   The log should say `Folder OK: MBA Lab Ideas`.

## 3. Deploy
1. **Deploy → New deployment → type: Web app**.
2. *Execute as*: **Me**. *Who has access*: **Anyone**.
3. **Deploy**, then copy the **Web app URL** (ends with `/exec`).
4. After every later change to `Code.gs`: **Deploy → Manage deployments → Edit → New version**.

## 4. Connect the website
Open `data/config.js` and set:

```js
window.MBALAB_CONFIG = {
  formTransport: 'apps-script',
  formEndpoint: 'https://script.google.com/macros/s/XXXXXXXX/exec',
  formFields: {}
};
```
Commit. Submit a test idea on the site: a file such as `2026-10-10_153012_new-simulation_my-idea.txt` appears in the folder.

## Notes
- The `/exec` URL is not secret but only accepts the form's fields; invalid or oversized input is rejected, a throttle limits flooding, and a hidden honeypot field drops simple bots.
- The folder itself stays private; the script writes to it as you.
- Alternative without Drive: set `formTransport: 'json'`, `formEndpoint` to Web3Forms/Formspree, and put its key in `formFields` (see comments in `data/config.js`).
