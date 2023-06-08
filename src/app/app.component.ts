import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, HostBinding, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { map, of } from 'rxjs';

import { environment } from '../environments/environment.development';
import { Release } from './core';
import { FooterComponent, NavbarComponent } from './shared';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, FooterComponent, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'todo';

  private http = inject(HttpClient);

  public buildDate$ = environment.production
    ? this.http
        .get<Release>(`${environment.repoUrl}${environment.appVersion}`)
        .pipe(map((release) => new Date(release.published_at)))
    : of(new Date());

  @HostBinding('attr.app-version')
  public appVersion = `v${environment.appVersion}`;
}
