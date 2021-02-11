import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: '/games/top-games' },
    { path: 'games', loadChildren: () => import('../games/games.module').then(m => m.GamesModule) },
    { path: '**', pathMatch: 'full', redirectTo: '/games/top-games' }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LayoutRoutingModule { }
