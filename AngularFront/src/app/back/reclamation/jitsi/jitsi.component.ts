import { Component, OnInit,AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';

//declare var jitsiMeetingExternalAPI:any;
declare var JitsiMeetExternalAPI: any;


@Component({
  selector: 'app-jitsi',
  templateUrl: './jitsi.component.html',
  styleUrls: ['./jitsi.component.css']
})
export class JitsiComponent implements OnInit, AfterViewInit {
  domin: string = 'meet.jit.si';
  room: string = 'Courzelo';
  user: any = { name: 'Oussema' };
  api: any;
  options: any;

  isAudioMuted = false;
  isVideoMuted = false;

  constructor(private router: Router) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.options = {
      roomName: this.room,
      width: 900,
      height: 700,
      configOverwrite: {
        prejoinPageEnabled: true,
        startWithAudioMuted: true,
        startWithVideoMuted: true,
        // Disable lobby feature
        enableLobbyFeature: false,
        // Ensure everyone joins as a moderator
        startAudioOnly: false,
        requireDisplayName: false,
        enableWelcomePage: false,
        // Add other configurations if necessary
      },
      interfaceConfigOverwrite: {
        TILE_VIEW_MAX_COLUMNS: 10,
        TOOLBAR_BUTTONS: [
          'microphone', 'camera', 'closedcaptions', 'desktop', 'fullscreen',
          'fodeviceselection', 'hangup', 'profile', 'chat', 'recording',
          'livestreaming', 'etherpad', 'sharedvideo', 'settings', 'raisehand',
          'videoquality', 'filmstrip', 'invite', 'feedback', 'stats', 'shortcuts',
          'tileview', 'videobackgroundblur', 'download', 'help', 'mute-everyone'
        ],
        MOBILE_APP_PROMO: false,
      },
      parentNode: document.querySelector('#jitsi-iframe'),
      userInfo: {
        displayName: this.user.name,
        moderator: true,
      }
    };

    const parentNode = document.querySelector('#jitsi-iframe');
    if (parentNode) {
      this.api = new JitsiMeetExternalAPI(this.domin, this.options);

      this.api.addEventListeners({
        readyToClose: this.handleClose,
        participantLeft: this.handleParticipantLeft,
        participantJoined: this.handleParticipantJoined,
        videoConferenceJoined: this.handleVideoConferenceJoined,
        videoConferenceLeft: this.handleVideoConferenceLeft,
        audioMuteStatusChanged: this.handleMuteStatus,
        videoMuteStatusChanged: this.handleVideoStatus
      });
    } else {
      console.error('Parent node not found');
    }
  }

  handleClose = () => {
    console.log("handleClose");
  }

  handleParticipantLeft = async (participant: any) => {
    const data = await this.getParticipants();
    console.log('Participant left', data);
  }

  handleParticipantJoined = async () => {
    const data = await this.getParticipants();
    console.log('Participant joined', data);
  }

  handleVideoConferenceJoined = async () => {
    const data = await this.getParticipants();
    console.log('Video conference joined', data);
  }

  handleVideoConferenceLeft = () => {
    this.router.navigate(['/home']);
  }

  handleMuteStatus = (audio: any) => {
    console.log('handleMuteStatus', audio);
  }

  handleVideoStatus = (video: any) => {
    console.log('handleVideoStatus', video);
  }

  getParticipants() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(this.api.getParticipantsInfo());
      }, 500);
    });
  }

  executeCommand(command: string) {
    this.api.executeCommand(command);
    if (command === 'hangup') {
      this.router.navigate(['/']);
    }
    if (command === 'toggleAudio') {
      this.isAudioMuted = !this.isAudioMuted;
    }
    if (command === 'toggleVideo') {
      this.isVideoMuted = !this.isVideoMuted;
    }
    if (command === 'toggleShareScreen') {
      // Handle screen sharing if needed
    }
  }
}