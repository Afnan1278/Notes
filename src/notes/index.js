// notes/NoteFactory.js
const PersonalNote = require('./PersonalNote');
const WorkNote = require('./WorkNote');

function noteFactory(type, title, content) {
  switch (type) {
    case 'Personal':
      return new PersonalNote(title, content);
    case 'Work':
      return new WorkNote(title, content);
    default:
      throw new Error('Invalid note type');
  }
}


module.exports = {noteFactory};
