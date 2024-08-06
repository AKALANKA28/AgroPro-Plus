import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NgModule } from '@angular/core';
import { DistributorsComponent } from './distributors/distributors.component';
import { FinanceComponent } from './finance/finance.component';
import { CommunityComponent } from './community/community.component';
import { SettingsComponent } from './settings/settings.component';
import { CommonModule } from '@angular/common';

export const routes: Routes = [
    {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
    {path: 'dashboard', component: DashboardComponent},
    {path: 'distributors', component: DistributorsComponent},
    {path: 'finance', component: FinanceComponent},
    {path: 'community', component: CommunityComponent},
    {path: 'settings', component: SettingsComponent},


];

@NgModule({
    imports: [CommonModule, RouterModule.forRoot(routes)],
    exports: [ RouterModule]
})
export class AppRoutingModule { }
