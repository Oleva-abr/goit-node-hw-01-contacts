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
    throw error;
  }
};

const getContactById = async contactId => {
  try {
    const content = await fs.readFile(contactsPath, 'utf-8');

    const parsedContacts = JSON.parse(content);

    const requiredContact =
      parsedContacts.find(contact => String(contact.id) === contactId) ||
      `Contact ID${contactId} not found`;

    console.table(requiredContact);
  } catch (error) {
    throw error;
  }
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
    throw error;
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
    throw error;
  }
};
module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
