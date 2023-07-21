class Contact {
    constructor(name, phone) {
      this.name = name;
      this.phone = phone;
    }
  }
  
  class ContactManagement {
    constructor() {
      this.contacts = JSON.parse(localStorage.getItem('contacts')) || [];
    }
  
    addContact(name, phone) {
      const newContact = new Contact(name, phone);
      this.contacts.push(newContact);
      this.saveContactsToLocalStorage();
    }
  
    updateContact(index, name, phone) {
      this.contacts[index].name = name;
      this.contacts[index].phone = phone;
      this.saveContactsToLocalStorage();
    }
  
    deleteContact(index) {
      this.contacts.splice(index, 1);
      this.saveContactsToLocalStorage();
    }
  
    getAllContacts() {
      return this.contacts;
    }
  
    saveContactsToLocalStorage() {
      localStorage.setItem('contacts', JSON.stringify(this.contacts));
    }
  }
  
  function displayContacts() {
    const contactListElement = document.getElementById('contactList');
    contactListElement.innerHTML = '';
  
    const contacts = contactManagement.getAllContacts();
    contacts.forEach((contact, index) => {
      const liElement = document.createElement('li');
      liElement.innerHTML = `
        <span>Name:  </span/>${contact.name}<span>  Number: </span>${contact.phone}
        <button onclick="editContact(${index})">Update</button>
        <button onclick="deleteContact(${index})">Delete</button>
      `;
      contactListElement.appendChild(liElement);
    });
  }
  
  function addContact() {
    const nameInput = document.getElementById('nameInput');
    const phoneInput = document.getElementById('phoneInput');
    const name = nameInput.value;
    const phone = phoneInput.value;
  
    contactManagement.addContact(name, phone);
    nameInput.value = '';
    phoneInput.value = '';
    displayContacts();
  }
  
  function editContact(index) {
    const contact = contactManagement.getAllContacts()[index];
    const newName = prompt('Enter new name:', contact.name);
    const newPhone = prompt('Enter new phone:', contact.phone);
  
    if (newName !== null && newPhone !== null) {
      contactManagement.updateContact(index, newName, newPhone);
      displayContacts();
    }
  }
  
  function deleteContact(index) {
    if (confirm('Are you sure you want to delete this contact?')) {
      contactManagement.deleteContact(index);
      displayContacts();
    }
  }
  
  const contactManagement = new ContactManagement();
  const addButton = document.getElementById('addbtn');
  addButton.addEventListener('click', addContact);
  displayContacts();
  