import { Routes } from '@angular/router';
import { Home } from '@pages/home/home';
import { Gallery } from '@pages/gallery/gallery';
import { About } from '@pages/about/about';
import { Contact } from '@pages/contact/contact';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'gallery', component: Gallery },
  { path: 'about', component: About },
  { path: 'contact', component: Contact },
  { path: '**', redirectTo: '' }
];