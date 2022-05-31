import { Injectable } from '@angular/core';
import { Contact } from '../models/contact';

@Injectable({
  providedIn: 'root',
})
export class ContactsService {
  constructor() {}

  getAll(): Contact[] {
    let contacts: Contact[] = JSON.parse(localStorage.getItem('contacts'));
    if (!contacts) {
      localStorage.setItem('contacts', JSON.stringify([]));
      contacts = [];
    }
    return contacts;
  }

  create(contact: Contact) {
    const idsArray: number[] = [];
    let contacts: Contact[] = JSON.parse(localStorage.getItem('contacts'));
    contacts.map((c) => {
      idsArray.push(c.id);
    });

    let maxId = Math.max(...idsArray);

    if (maxId === -Infinity) {
      maxId = 0;
    }

    contacts.push({
      id: maxId + 1,
      name: contact.name,
      phone_number: contact.phone_number,
    });

    localStorage.setItem('contacts', JSON.stringify(contacts));
  }

  edit(contact: Contact) {
    let contacts: Contact[] = JSON.parse(localStorage.getItem('contacts'));
    contacts.filter((c) => {
      if (c.id === contact.id) {
        c.name = contact.name;
        c.phone_number = contact.phone_number;
      }
    });

    localStorage.setItem('contacts', JSON.stringify(contacts));
  }

  delete(contact: Contact) {
    let contacts: Contact[] = JSON.parse(localStorage.getItem('contacts'));
    let index = -1;
    contacts.map((c, i) => {
      if (c.id === contact.id) {
        index = i;
      }
    });

    if (index > -1) {
      contacts.splice(index, 1);
    }

    localStorage.setItem('contacts', JSON.stringify(contacts));
  }
}
