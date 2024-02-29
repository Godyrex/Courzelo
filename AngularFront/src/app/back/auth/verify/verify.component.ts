import {Component} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {AuthenticationService} from "../../../service/user/auth/authentication.service";
import {JsonResponse} from "../../../model/user/JsonResponse";

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.css']
})
export class VerifyComponent {
  code: string = "";
  verificationResult: string = "";

  constructor(private route: ActivatedRoute, private authenticationService: AuthenticationService) {
    this.route.queryParams.subscribe(params => {
      this.code = params['code'];
      this.verifyAccount();
    });
  }

  verifyAccount() {
    this.authenticationService.verifyAccount(this.code)
      .subscribe((response: JsonResponse) => {
        this.verificationResult = response.msg ? 'Account Verified' : 'Verification Failed';
      }, (error) => {
        console.error('Error occurred:', error);
        this.verificationResult = 'Verification Failed';
      });
  }

}
