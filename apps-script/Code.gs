/**
 * MBA Lab – "Share an Idea" receiver (Google Apps Script web app).
 *
 * Every submission is saved as a .txt file in YOUR Google Drive folder.
 * Optionally you also get an e-mail notification (sent to the account that owns this script,
 * so no e-mail address ever appears in the public repository).
 *
 * Setup: see docs/FORM-SETUP-GOOGLE-DRIVE.md
 */

/* ---- settings (edit here) ---- */
var FOLDER_ID = 'PASTE_YOUR_DRIVE_FOLDER_ID_HERE'; // the part after /folders/ in the folder URL
var NOTIFY_BY_EMAIL = true;                         // false = save files only
var MAX_PER_MINUTE = 20;                            // global throttle against flooding
var LIMITS = { name: 120, email: 160, type: 60, subject: 160, message: 4000 };

function doPost(e) {
  try {
    var raw = (e && e.postData && e.postData.contents) || '';
    if (raw.length > 20000) return out_({ ok: false, message: 'Payload too large' });
    var d = JSON.parse(raw);

    // honeypot (the website never sends this; bots might)
    if (d.botcheck) return out_({ ok: true });

    var v = {
      name: clean_(d.name, LIMITS.name),
      email: clean_(d.email, LIMITS.email),
      type: clean_(d.type, LIMITS.type),
      subject: clean_(d.subject, LIMITS.subject),
      message: clean_(d.message, LIMITS.message),
      lang: clean_(d.lang, 5),
      page: clean_(d.page, 300),
      sentAt: clean_(d.sentAt, 40)
    };
    if (!v.email || v.email.indexOf('@') < 1 || !v.subject || !v.message || !v.type) {
      return out_({ ok: false, message: 'Missing required fields' });
    }
    if (!throttle_()) return out_({ ok: false, message: 'Too many submissions, please try again in a minute' });

    var stamp = Utilities.formatDate(new Date(), Session.getScriptTimeZone(), 'yyyy-MM-dd_HHmmss');
    var fileName = stamp + '_' + slug_(v.type) + '_' + slug_(v.subject) + '.txt';
    var body =
      'MBA Lab – submission\n' +
      '====================\n' +
      'Received : ' + stamp + '\n' +
      'Sent at  : ' + v.sentAt + '\n' +
      'Type     : ' + v.type + '\n' +
      'Subject  : ' + v.subject + '\n' +
      'Name     : ' + (v.name || '(not provided)') + '\n' +
      'Email    : ' + v.email + '\n' +
      'Language : ' + v.lang + '\n' +
      'Page     : ' + v.page + '\n' +
      '\n--- Message ---\n' + v.message + '\n';

    var file = DriveApp.getFolderById(FOLDER_ID).createFile(fileName, body, MimeType.PLAIN_TEXT);

    if (NOTIFY_BY_EMAIL) {
      try {
        var me = Session.getEffectiveUser().getEmail();
        if (me) MailApp.sendEmail({ to: me, replyTo: v.email, subject: '[MBA Lab] ' + v.type + ': ' + v.subject,
          body: body + '\nDrive file: ' + file.getUrl() + '\n' });
      } catch (mailErr) { /* the file is saved; ignore mail quota/permission problems */ }
    }
    return out_({ ok: true });
  } catch (err) {
    return out_({ ok: false, message: 'Server error' });
  }
}

// Opening the /exec URL in a browser only shows that the service is alive.
function doGet() { return out_({ ok: true, service: 'MBA Lab idea receiver' }); }

function out_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
function clean_(s, max) {
  return String(s == null ? '' : s).replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, '').trim().slice(0, max);
}
function slug_(s) {
  var r = String(s).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 40);
  return r || 'idea';
}
function throttle_() {
  var cache = CacheService.getScriptCache(), key = 'n' + Math.floor(Date.now() / 60000);
  var n = Number(cache.get(key) || 0);
  if (n >= MAX_PER_MINUTE) return false;
  cache.put(key, String(n + 1), 120);
  return true;
}

/** Run this once from the editor to grant Drive/Mail permissions and test the folder ID. */
function testSetup() {
  var f = DriveApp.getFolderById(FOLDER_ID);
  Logger.log('Folder OK: ' + f.getName());
}
