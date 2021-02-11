import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { environment as env } from '@environment';
import { Jackpot } from '@interfaces';

@Injectable({ providedIn: 'root' })
export class JackpotService {
    private readonly JACKPOTS_URL = `${env.api}/jackpots.php`;
    constructor(private readonly http: HttpClient) { }

    getJackpots(): Observable<Jackpot[]> {
        return this.http.get<Jackpot[]>(this.JACKPOTS_URL);
    }
}
