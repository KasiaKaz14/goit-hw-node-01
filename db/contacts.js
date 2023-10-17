const fs = require("fs");
const path = require("path");
const contactsPath = path.join(__dirname, "/contacts.json");

function listContacts() {
  fs.readFile(contactsPath, "utf-8", (err, data) => {
    if (err) {
      console.error(err);
      return;
    }

    const contacts = JSON.parse(data);
    console.table(contacts);
    console.log("Contact list displayed successfully");
  });
}

function getContactById(contactId) {
  fs.readFile(contactsPath, "utf-8", (err, data) => {
    if (err) {
      console.error(err);
      return;
    }

    const contacts = JSON.parse(data);
    const contact = contacts.find((contact) => contact.id === contactId);

    if (contact) {
      console.table(contact);
      console.log("Contact found successfully");
    } else {
      console.log("Contact not found");
    }
  });
}

function removeContact(contactId) {
  fs.readFile(contactsPath, "utf-8", (err, data) => {
    if (err) {
      console.error(err);
      return;
    }

    const contacts = JSON.parse(data);
    const updatedContacts = contacts.filter(
      (contact) => contact.id !== contactId
    );

    fs.writeFile(
      contactsPath,
      JSON.stringify(updatedContacts, null, 2),
      (err) => {
        if (err) {
          console.error(err);
          return;
        }
        console.log(`Contact ${contactId} has been removed successfully`);
      }
    );
  });
}

function addContact(id, name, email, phone) {
  fs.readFile(contactsPath, "utf-8", (err, data) => {
    if (err) {
      console.error(err);
      return;
    }

    const contacts = JSON.parse(data);
    const existingContact = contacts.find(
      (contact) =>
        contact.name === name &&
        contact.email === email &&
        contact.phone === phone
    );

    if (existingContact) {
      console.log("Contact already exists");
      return;
    }

    const newContact = {
      id,
      name,
      email,
      phone,
    };

    const updatedContacts = [...contacts, newContact];

    fs.writeFile(
      contactsPath,
      JSON.stringify(updatedContacts, null, 2),
      (err) => {
        if (err) {
          console.error(err);
          return;
        }
        console.log("Contact added successfully");
      }
    );
  });
}

module.exports = { listContacts, getContactById, removeContact, addContact };
