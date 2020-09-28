import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from 'src/app/Services/user.service';
import { User } from 'src/app/Modal/User';
import { Subscription } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit, OnDestroy {
  users: User[];
  totalPages: number;
  page = 1;
  showModal: boolean;
  subscriptions: Subscription[] = [];
  newUser: boolean;
  userForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    job: new FormControl('', [Validators.required])
  });
  constructor(private userService: UserService) { }

  ngOnInit() {
    this.fetchUsers(this.page);
  }

  fetchUsers(page: number): void {
    this.subscriptions.push(
      this.userService.getAllUsers(page).subscribe(userListRes => {
        if (userListRes) {
          this.users = userListRes.data;
          this.totalPages = userListRes.total_pages;
          this.page = userListRes.page;
        }
      }, error => {
        alert('Something Wrong Happen');
      })
    );
  }

  openEditModal(user: User): void {
    this.showModal = true;
    this.newUser = false;
    this.userForm.reset();
    this.userForm.addControl('id', new FormControl(''));
    this.userForm.setValue({
      id: user.id,
      name: user.first_name,
      job: ''
    });
  }

  openAddModal(): void {
    this.newUser = true;
    this.showModal = true;
    this.userForm.reset();
  }

  updateUser(user: User): void {
   this.subscriptions.push(
    this.userService.UpdateUser(user).subscribe(updateRes => {
      alert('Updated Successfully');
      this.fetchUsers(this.page);
      this.showModal = false;
      this.userForm.reset();
    }, error => {
      alert('Something Wrong Happen');
    })
   );
  }

  addUser(user: User): void {
    this.subscriptions.push(
      this.userService.addUser(user).subscribe(addRes => {
        alert('Added Successfully');
        this.fetchUsers(this.page);
        this.showModal = false;
        this.userForm.reset();
      }, error => {
        alert('Something Wrong Happen');
      })
    );
  }

  formSubmit(): void {
    const userValues = this.userForm.value;
    if (this.newUser) {
      this.addUser(userValues);
    } else {
      this.updateUser(userValues);
    }
  }

  getUsersfromPagination(page: number): void {
    if (page <= this.totalPages && page > 0) {
      this.fetchUsers(page);
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => {
      s.unsubscribe();
    });
  }
}
