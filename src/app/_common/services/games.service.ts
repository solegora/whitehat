import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { environment as env } from '@environment';
import { Game } from '@interfaces';

@Injectable({ providedIn: 'root' })
export class GamesService {
    private readonly GAMES_URL = `${env.api}/games.php`;
    constructor(private readonly http: HttpClient) { }

    getGames(): Observable<Game[]> {
        return this.http.get<Game[]>(this.GAMES_URL);
    }
}
