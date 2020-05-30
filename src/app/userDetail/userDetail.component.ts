import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { UserService } from '../_services/user/user.service';
import { User } from '../_models/user';
import { AlertifyService } from '../_services/alertify/Alertify.service';
import { AuthService } from '../_services/auth/AuthService.service';
import { FileUploader } from 'ng2-file-upload';
import { environment } from 'src/environments/environment';
import { Photo } from '../_models/Photo';

@Component({
  selector: 'app-userDetail',
  templateUrl: './userDetail.component.html',
  styleUrls: ['./userDetail.component.css']
})
export class UserDetailComponent implements OnInit {
  id: number;
  user: User;
  havePhoto = false;
  uploader: FileUploader;
  baseUrl =  environment.apiUrl;
  photos: Photo[] = [];
  constructor(private route: ActivatedRoute, private alertify: AlertifyService, private userService: UserService,
    private authService: AuthService) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
    });
    this.initializeUploader();
    this.loadUser(this.id);
  }

  loadUser(id: number) {
    this.userService.getUser(id).subscribe((user: User) => {
      this.user = new User(user);
      this.user = user;
      if (this.user.photoUrl.length > 0) {
        this.havePhoto = true;
      }
    }, error => {
      this.alertify.error(error);
    });
  }

  canBeUpdated() {
    const roleList = this.authService.DecodedToken().role as Array<any>;
    return this.authService.DecodedToken().nameid === this.id ||
      roleList.indexOf('root') !== -1 || roleList.indexOf('sysadmin') !== -1 ||
    roleList.indexOf('admin') !== -1;
  }

  Save() {
    this.userService.updateUser(this.user).subscribe(() => {
      console.log('upload');
      this.uploader.uploadAll();
      this.alertify.success('Updated');
    }, error => {
      this.alertify.error(error);
    });
  }

  initializeUploader() {
    this.uploader = new FileUploader({
      url: this.baseUrl + 'photo/user/' + this.id,
      authToken: 'Bearer ' + localStorage.getItem('token'),
      isHTML5: true,
      allowedFileType: ['image'],
      removeAfterUpload: true,
      autoUpload: false,
      maxFileSize: 10 * 1024 * 1024
    });

    this.uploader.onAfterAddingFile = (file) => {
      file.withCredentials = false;
    };

    this.uploader.onSuccessItem = (item, responce, status, headers) => {
      if  (responce) {
        const res: Photo = JSON.parse(responce);
        const photo = {
          id: res.id,
          url: res.url,
          description: res.description,
        };
        this.photos.push(photo);
      }
    };
  }
}
