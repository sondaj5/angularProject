import { Component } from '@angular/core';
import { InfrontUIService } from 'src/InfrontModule/InfrontAngular';
import { environment } from 'src/environments/environment';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  infrontInitialized = false;

  constructor(
    private infrontUIService: InfrontUIService,
    private authService: AuthService
  ) {
    this.authenticate();
  }

  private authenticate() {
    const infrontTokenUrl = environment.infrontTokenUrlLive;
    this.authService.getInfrontAuthToken(infrontTokenUrl).subscribe(
      (response) => {
        this.infrontUIService.initzializeInfrontWithToken(
          response.result.access_token
        );
        this.infrontInitialized = true;
      },
      (error) => console.log(error)
    );
  }
}
