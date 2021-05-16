import {AbstractControl, FormGroup} from "@angular/forms";
import {emailRE, userNameRE} from "../regexValidators";

export function IsEmailOrUserName() {
  return (control: AbstractControl) => {
    const value = String(control.value)
    if (value.match(emailRE) || value.match(userNameRE)) {
      return null
    } else {
      return {IsEmailOrUserName: "No es un email o nombre de usuario válido" }
    }
  };

}
