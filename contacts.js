const fs = require('fs').promises;
const path = require('path');

//   Раскомментируй и запиши значение
const contactsPath = path.resolve('./db/contacts.json');

// TODO: задокументировать каждую функцию
const listContacts = async () => {
  try {
    const content = await fs.readFile(contactsPath, 'utf-8');
    console.table(JSON.parse(content));
  } catch (error) {
    console.log(error.message);
  }
};

const getContactById = async contactId => {
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
};

const removeContact = async contactId => {
  try {
    const content = await fs.readFile(contactsPath, 'utf-8');

    const parsedContacts = JSON.parse(content);

    const filteredContacts = parsedContacts.filter(
      contact => String(contact.id) !== contactId,
    );

    await fs.writeFile(contactsPath, JSON.stringify(filteredContacts, null));
    console.log(`The contact with ID${contactId} deleted!`);
  } catch (error) {
    console.log(error.message);
  }
};

const addContact = async (name, email, phone) => {
  try {
    const content = await fs.readFile(contactsPath, 'utf-8');

    const parsedContacts = JSON.parse(content);

    const newContact = {
      id: parsedContacts.length + 1,
      name,
      email,
      phone,
    };

    const updatedContacts = [...parsedContacts, newContact];

    await fs.writeFile(contactsPath, JSON.stringify(updatedContacts, null));
    console.log(`The contact ${name} added!`);
  } catch (error) {
    console.log(error.message);
  }
};
module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
