import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/blogs', pathMatch: 'full' },
  { 
    path: 'auth', 
    children: [
      { path: 'login', loadComponent: () => import('./auth/login/login.component').then(m => m.LoginComponent) },
      { path: 'signup', loadComponent: () => import('./auth/signup/signup.component').then(m => m.SignupComponent) }
    ] 
  },
  { 
    path: 'blogs', 
    loadComponent: () => import('./blog/blog-list/blog-list.component').then(m => m.BlogListComponent) 
  },
  { 
    path: 'my-blogs', 
    loadComponent: () => import('./blog/my-blogs/my-blogs.component').then(m => m.MyBlogsComponent),
    canActivate: [authGuard]
  },
  { 
    path: 'blogs/create', 
    loadComponent: () => import('./blog/blog-form/blog-form.component').then(m => m.BlogFormComponent),
    canActivate: [authGuard]
  },
  { 
    path: 'blogs/:id', 
    loadComponent: () => import('./blog/blog-detail/blog-detail.component').then(m => m.BlogDetailComponent) 
  },
  { 
    path: 'blogs/:id/edit', 
    loadComponent: () => import('./blog/blog-form/blog-form.component').then(m => m.BlogFormComponent),
    canActivate: [authGuard]
  },
  { path: '**', redirectTo: '/blogs' }
];