/**
 * No delivery API is called. A blank preview recipient creates an on-page draft.
 * @param {{firstName:string,lastName:string,email:string,phone:string,message:string}} fields
 * @param {string} recipient @param {boolean} preview
 */
export function createContactDraft(fields, recipient, preview) {
  const body = [
    'Name: ' + fields.firstName + ' ' + fields.lastName,
    'Email: ' + fields.email,
    'Phone: ' + fields.phone,
    '',
    fields.message,
  ].join('\n');
  const subject =
    (preview ? '[PREVIEW TEST] ' : '') + 'Project Starburst website inquiry';
  return {
    body,
    mailto: recipient
      ? 'mailto:' +
        encodeURIComponent(recipient).replace('%40', '@') +
        '?subject=' +
        encodeURIComponent(subject) +
        '&body=' +
        encodeURIComponent(body)
      : '',
  };
}
