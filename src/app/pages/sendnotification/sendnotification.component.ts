import { ActivatedRoute, Router } from "@angular/router";
import { ConstantService } from "./../service/constant.service";
import { Component, OnInit } from "@angular/core";
import { appConstant } from "../service/_constant/appConstant";
import { SuperComponent } from "../../_components/SuperComponent/SuperComponent";
import { ToasterService } from "angular2-toaster";

@Component({
  selector: "ngx-sendnotification",
  templateUrl: "./sendnotification.component.html",
  styleUrls: ["./sendnotification.component.scss"]
})
export class SendnotificationComponent extends SuperComponent
  implements OnInit {
  users_ids = [];
  cities = [];
  selectedAdmins = [];
  Admins = [];

  selectedUsers = [];
  Users = [];

  selected_cat = "";
  selected_city = "";
  msg = {
    title: "",
    body: "",
    type: 10
  };

  constructor(
    private route: ActivatedRoute,
    private toasterService: ToasterService,
    private router: Router,
    private _userService: ConstantService,
    private constant: ConstantService
  ) {
    super(route, toasterService, router);
  }

  ngOnInit() {
    // this.constant.getDeliveryOptionsData().subscribe(x => {
    //   this.cities = x[appConstant.ITEMS] as any[]
    // })
  }

  selectCategory(val) {
    console.log(val);
    this.selected_cat = val;
    if (this.selected_cat == "2") {
      this.constant.getAdminData().subscribe(userList => {
        console.log(userList[appConstant.ITEMS]);
        this.Admins = userList[appConstant.ITEMS] as any;
      });
    }
    if (this.selected_cat == "3") {
      this.constant.getUserData().subscribe(userList => {
        console.log(userList[appConstant.ITEMS]);
        this.Users = userList[appConstant.ITEMS] as any;
      });
    }
  }

  selectCity(val) {
    console.log(val);
    this.selected_city = val;
  }

  Save(msg) {
    this.users_ids = [];
    if (this.selected_cat == "0" && this.selected_city == "0") {
      //for all users
      this._userService.getUserData().subscribe(x => {
        let users = x[appConstant.ITEMS] as any[];
        users.forEach(element => {
          this.users_ids.push(element.fcmToken);
        });
        this._userService
          .CreateGeneralNotificationForMultiple(this.users_ids, this.msg)
          .subscribe();
        this.reset();
        this.showToast("success", "نجاح", "تم ارسال الاشعار بنجاح");
      });
    } else if (this.selected_cat == "0") {
      //for all Admins
      this.constant.getAdminData().subscribe(x => {
        let users = x[appConstant.ITEMS] as any[];
        users.forEach(element => {
          this.users_ids.push(element.fcmToken);
        });
        this._userService
          .CreateGeneralNotificationForMultiple(this.users_ids, this.msg)
          .subscribe();
        this.reset();
        this.showToast("success", "نجاح", "تم ارسال الاشعار بنجاح");
      });
    } else if (this.selected_cat == "1") {
      // for all Users
      this.constant.getUserData().subscribe(x => {
        let users = x[appConstant.ITEMS] as any[];
        users.forEach(element => {
          this.users_ids.push(element.fcmToken);
        });
        this._userService
          .CreateGeneralNotificationForMultiple(this.users_ids, this.msg)
          .subscribe();
        this.reset();
        this.showToast("success", "نجاح", "تم ارسال الاشعار بنجاح");
      });
    } else if (this.selected_cat == "2") {
      // for selected drivers
      console.log(this.selectedAdmins);
      this.selectedAdmins.forEach(element => {
        this.users_ids.push(element.fcmToken);
      });
      this._userService
        .CreateGeneralNotificationForMultiple(this.users_ids, this.msg)
        .subscribe();
      this.reset();
      this.showToast("success", "نجاح", "تم ارسال الاشعار بنجاح");
    } else if (this.selected_cat == "3") {
      // for selected drivers
      console.log(this.selectedUsers);
      this.selectedUsers.forEach(element => {
        this.users_ids.push(element.fcmToken);
      });
      this._userService
        .CreateGeneralNotificationForMultiple(this.users_ids, this.msg)
        .subscribe();
      this.reset();
      this.showToast("success", "نجاح", "تم ارسال الاشعار بنجاح");
    }
  }

  reset() {
    this.msg = {
      title: "",
      body: "",
      type: 10
    };
  }
}
