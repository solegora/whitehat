import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Observable, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';

import { Game, GameJackpot } from '@interfaces';
import { StateService } from '@services';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.scss']
})
export class GamesComponent implements OnInit, OnDestroy {

  gamesJackpots$!: Observable<GameJackpot[]>;

  private currentCategories: string[] = [];
  private readonly destroy$ = new Subject<void>();
  private readonly JACKPOTS_UPDATE_TIME = 5000;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly stateService: StateService) {
  }

  ngOnInit(): void {
    this.currentCategories = this.route.snapshot.data.categories;
    this.gamesJackpots$ = this.stateService.gamesJackpots$.pipe(
      map(games => games.filter(game => game.categories.some(category => this.currentCategories.includes(category))))
    );

    this.stateService.subscribeToJackpotUpdates(this.JACKPOTS_UPDATE_TIME)
      .pipe(takeUntil(this.destroy$))
      .subscribe();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  isNewOrTopCategory(game: Game | GameJackpot): boolean {
    if (this.currentCategories.some(category => category !== 'new' && category !== 'top')) {
      return game.categories.some(category => category === 'new' || category === 'top');
    }
    return false;
  }
}
