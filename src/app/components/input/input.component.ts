import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ContactModalData } from 'src/app/shared/models/contact-modal-data';
import { ContactsService } from 'src/app/shared/services/contacts.service';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
})
export class InputComponent implements OnInit {
  formGroup: FormGroup;
  constructor(
    private contactsService: ContactsService,
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<InputComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ContactModalData
  ) {}

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      name: new FormControl(this.data.contact.name, [
        Validators.required,
        Validators.maxLength(20),
        Validators.minLength(3),
      ]),
      phone_number: new FormControl(this.data.contact.phone_number, [
        Validators.required,
        Validators.maxLength(11),
        Validators.minLength(3),
      ]),
    });
  }

  saveContact() {
    if (this.data.modalMode === 'create') {
      this.contactsService.create(this.formGroup.value);
    }
    if (this.data.modalMode === 'edit') {
      this.contactsService.edit({
        id: this.data.contact.id,
        ...this.formGroup.value,
      });
    }
    this.dialogRef.close();
  }

  closeModal() {
    this.dialogRef.close();
  }
}
