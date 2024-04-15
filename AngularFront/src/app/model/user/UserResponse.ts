
import {UserContact} from "./UserContact";
import {UserActivity} from "./UserActivity";
import {UserEducation} from "./UserEducation";
import {UserProfile} from "./UserProfile";
import {UserSecurity} from "./UserSecurity";
import {UserSettings} from "./UserSettings";

export interface UserResponse {
  id?: string;
  email?: string;
  roles?: string[];
  security?:UserSecurity;
  profile?:UserProfile;
  education?:UserEducation;
  contact?:UserContact;
  activity?:UserActivity;
  settings?:UserSettings;
  score?:number;
}
