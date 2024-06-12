import { Component, OnInit } from '@angular/core';
import { Admin } from 'src/app/models/interfaces';
import { AdminsService } from 'src/app/services/admins.service';

@Component({
  selector: 'app-admins',
  templateUrl: './admins.component.html',
  styleUrls: ['./admins.component.scss']
})
export class AdminsComponent implements OnInit {
  editingAdmin: boolean = false;
  selectedAdmin: Admin | null = null;
  admins: Admin[] = [];
  newAdmin: Admin = { id: 0, username: '', email: '', password: '' };
  showAdminsTable: boolean = true;

  constructor(private adminsService: AdminsService) {}

  ngOnInit() {
    this.getAdmins();
  }

  getAdmins() {
    this.adminsService.getAllAdmins().subscribe((admins: Admin[]) => {
      this.admins = admins;
    });
  }

  addAdmin() {
    this.adminsService.registerAdmin(this.newAdmin).subscribe((admin: Admin) => {
      this.admins.push(admin);
      this.newAdmin = { id: 0, username: '', email: '', password: '' };
    });
  }

  updateAdmin() {
    if (this.selectedAdmin) {
      this.adminsService.editAdmin(this.selectedAdmin).subscribe((updatedAdmin: Admin | null) => {
        if (updatedAdmin) {
          const index = this.admins.findIndex(admin => admin.id === updatedAdmin.id);
          if (index !== -1) {
            this.admins[index] = updatedAdmin;
          }
        }
        this.selectedAdmin = null;
        this.editingAdmin = false;
      });
    }
  }

  editAdmin(admin: Admin) {
    this.editingAdmin = true;
    this.selectedAdmin = { ...admin };
  }

  cancelEdit() {
    this.editingAdmin = false;
    this.selectedAdmin = null;
  }

  deleteAdmin(admin: Admin) {
    if (confirm('Are you sure you want to delete this admin?')) {
      this.adminsService.deleteAdmin(admin.id).subscribe((deleted: boolean) => {
        if (deleted) {
          const index = this.admins.indexOf(admin);
          if (index !== -1) {
            this.admins.splice(index, 1);
          }
        }
      });
    }
  }
  
}
