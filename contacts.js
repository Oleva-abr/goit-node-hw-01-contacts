const fs = require('fs');
const path = require('path');

//   Раскомментируй и запиши значение
const contactsPath = path.resolve('./db/contacts.json');

// TODO: задокументировать каждую функцию
function listContacts() {
  fs.readFile(contactsPath, 'utf-8', (error, data) => {
    if (error) {
      return console.log(error);
    }

    const contacts = JSON.parse(data);
    console.log('List of contacts: ');
    console.table(contacts);
  });
}

function getContactById(contactId) {
  fs.readFile(contactsPath, 'utf-8', (error, data) => {
    if (error) {
      return console.log(error);
    }

    const contacts = JSON.parse(data);
    const contact = contacts.find(contact => {
      if (contact.id === contactId) {
        console.log(`Get contact by ID ${contactId}:`);
        console.table(contact);
        return contact;
      }
    });

    if (contact == null) {
      console.log(`Contact with ID "${contactId}" not found!`);
    }
  });
}

function removeContact(contactId) {
  // ...твой код
}

function addContact(name, email, phone) {
  // ...твой код
}
