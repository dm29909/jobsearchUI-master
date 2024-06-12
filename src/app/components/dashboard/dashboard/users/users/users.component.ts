import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/interfaces';
import { UserService } from 'src/app/services/users.service';

@Component({
  selector: 'app-users-table',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  editingUser = false;
  users: User[] = [];
  newUser: User = {
    id: 0,
    username: '',
    email: '',
    password: '',
  };
  selectedUser: User | null = null;
  showUsersTable = true;

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.fetchUsers();
  }

  fetchUsers() {
    this.userService.getUsers().subscribe(
      (users: User[]) => {
        this.users = users;
      },
      (error) => {
        console.error('Failed to fetch users:', error);
      }
    );
  }

  addUser() {
    this.userService.addUser(this.newUser).subscribe(
      (user: User) => {
        this.users.push(user);
        this.newUser = {
          id: 0,
          username: '',
          email: '',
          password: '',
        };
      },
      (error) => {
        console.error('Failed to add user:', error);
      }
    );
  }

  updateUser(): void {
    if (this.selectedUser) {
      this.userService.updateUser(this.selectedUser).subscribe(
        () => {
          const index = this.users.findIndex((user) => user.id === this.selectedUser!.id);

          if (index !== -1) {
            this.users[index] = { ...this.selectedUser! };
            this.selectedUser = null;
            this.editingUser = false;
          }
        },
        (error) => {
          console.error('Failed to update user:', error);
        }
      );
    }
  }

  editUser(user: User): void {
    this.editingUser = true;
    this.selectedUser = { ...user };
  }

  cancelEdit(): void {
    this.editingUser = false;
    this.selectedUser = null;
  }

  deleteUser(user: User): void {
    if (confirm('Are you sure you want to delete this user?')) {
      this.userService.deleteUser(user.id).subscribe(
        () => {
          const index = this.users.indexOf(user);
          if (index !== -1) {
            this.users.splice(index, 1);
          }
        },
        (error) => {
          console.error('Failed to delete user:', error);
        }
      );
    }
  }
}
