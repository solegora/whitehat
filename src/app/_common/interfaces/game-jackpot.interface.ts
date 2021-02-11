import { Game } from './game.interface';
import { Jackpot } from './jackpot.interface';

export interface GameJackpot extends Game, Partial<Jackpot> { }
