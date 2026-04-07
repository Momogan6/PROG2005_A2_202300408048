import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';


import { HomeComponent } from './app/home/home.component';
import { ManageItemsComponent } from './app/manage-items/manage-items.component';
import { SearchComponent } from './app/search/search.component';
import { PrivacySecurityComponent } from './app/privacy-security/privacy-security.component';
import { HelpComponent } from './app/help/help.component';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter([
      { path: '', component: HomeComponent },
      { path: 'manage', component: ManageItemsComponent },
      { path: 'search', component: SearchComponent },
      { path: 'privacy', component: PrivacySecurityComponent },
      { path: 'help', component: HelpComponent },
      { path: '**', redirectTo: '' }
    ])
  ]
});