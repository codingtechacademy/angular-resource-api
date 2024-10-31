import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Pokemon } from '../models/pokemon';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  http = inject(HttpClient);

  getPokemons(pageSize: number): Observable<Pokemon[]> {
    return this.http.get<Pokemon[]>(
      `https://pokebuildapi.fr/api/v1/pokemon/limit/${pageSize}`
    );
  }
}
