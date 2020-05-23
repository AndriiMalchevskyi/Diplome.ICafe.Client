import { Injectable } from '@angular/core';
//declare let alertify: any;
import alertify from 'alertifyjs';

@Injectable({
  providedIn: 'root'
})
export class AlertifyService {

constructor() { }

confirm(message: string, okCallback: () => any) {
    alertify.confirm(message, function(e) {
      if (e) {
        okCallback();
      } else {}
    });
   }

   success(message: string) {
      if (message.length > 0)
        alertify.success(message);
      else
      alertify.success("Success");
   }

   error(message: string) {
    if (message.length > 0)
      alertify.error(message);
    else
      alertify.error("Error");
  }

  warning(message: string) {
    if (message.length > 0)
      alertify.warning(message);
    else
      alertify.warning("Warning");
  }

  message(message: string) {
    if (message.length > 0)
      alertify.message(message);
    else
      alertify.message("Message");
  }
}
