import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Contact } from 'src/app/shared/models/contact';
import { ContactsService } from 'src/app/shared/services/contacts.service';
import { InputComponent } from '../input/input.component';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit, AfterViewInit {
  dataSource = new MatTableDataSource<Contact>();
  displayedColumns = ['ID', 'Name', 'PhoneNumber', 'Actions'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private contactsService: ContactsService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.dataSource.data = this.contactsService.getAll();
    console.log(this.dataSource.data);
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  openAddContactModal() {
    const dialogRef = this.dialog.open(InputComponent, {
      data: {
        modalName: 'Novo Contato',
        modalMode: 'create',
        contact: {
          id: null,
          name: '',
          phone_number: '',
        },
      },
    });

    dialogRef.afterClosed().subscribe(
      () => {
        this.dataSource.data = this.contactsService.getAll();
        this.sortData({ active: 'Name', direction: 'asc' });
      },
      () => {},
      () => {}
    );
  }

  opneEditContactModal(contact: Contact) {
    const dialogRef = this.dialog.open(InputComponent, {
      data: {
        modalName: 'Editar Contato',
        modalMode: 'edit',
        contact: {
          id: contact.id,
          name: contact.name,
          phone_number: contact.phone_number,
        },
      },
    });

    dialogRef.afterClosed().subscribe(
      () => {
        this.dataSource.data = this.contactsService.getAll();
        this.sortData({ active: 'Name', direction: 'asc' });
      },
      () => {},
      () => {}
    );
  }

  deletePhoneNumber(contact: Contact) {
    this.contactsService.delete(contact);
    this.dataSource.data = this.contactsService.getAll();
  }

  sortData(sort: Sort) {
    const data = this.dataSource.data.slice();
    if (!sort.active || sort.direction === '') {
      this.dataSource.data = data;
      return;
    }

    this.dataSource.data = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'ID':
          return compare(a.id, b.id, isAsc);
        case 'Name':
          return compare(
            a.name.toLocaleLowerCase(),
            b.name.toLocaleLowerCase(),
            isAsc
          );
        case 'PhoneNumber':
          return compare(a.phone_number, b.phone_number, isAsc);
        default:
          return 0;
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLocaleLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
