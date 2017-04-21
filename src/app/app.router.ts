import { ModuleWithProviders } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { HireComponent } from './hire/hire.component';
import { ResumeComponent } from './resume/resume.component';



export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'about', component: AboutComponent },
    { path: 'hire', component: HireComponent },
    { path: 'resume', component: ResumeComponent },
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);


