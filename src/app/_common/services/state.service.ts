import { Injectable } from '@angular/core';

import { Observable, BehaviorSubject, forkJoin, interval } from 'rxjs';
import { map, switchMap, tap, withLatestFrom } from 'rxjs/operators';

import { GamesService } from './games.service';
import { JackpotService } from './jackpots.service';
import { Game, GameJackpot, Jackpot } from '@interfaces';

@Injectable({ providedIn: 'root' })
export class StateService {

    private gamesJackpotsSource = new BehaviorSubject<GameJackpot[]>([]);
    gamesJackpots$ = this.gamesJackpotsSource.asObservable();

    constructor(
        private readonly gamesService: GamesService,
        private readonly jackpotService: JackpotService) { }

    private next(games: GameJackpot[]): void {
        this.gamesJackpotsSource.next(games);
    }

    private syncJackpotsAndGames(games: GameJackpot[], jackpots: Jackpot[]): GameJackpot[] {
        return games.map(game => {
            const ownJackpot = jackpots.find(jackpot => jackpot.game === game.id);
            game.amount = ownJackpot?.amount;
            return game as GameJackpot;
        });
    }

    initState(): Observable<GameJackpot[]> {
        return forkJoin([this.gamesService.getGames(), this.jackpotService.getJackpots()]).pipe(
            map(([games, jackpots]: [Game[], Jackpot[]]) => this.syncJackpotsAndGames(games, jackpots)),
            tap(result => this.next(result))
        );
    }

    subscribeToJackpotUpdates(ms: number): Observable<GameJackpot[]> {
        return interval(ms).pipe(
            switchMap(() => this.jackpotService.getJackpots()),
            withLatestFrom(this.gamesJackpots$),
            map(([jackpots, games]: [Jackpot[], GameJackpot[]]) => this.syncJackpotsAndGames(games, jackpots)),
            tap((result) => this.next(result))
        );
    }
}
