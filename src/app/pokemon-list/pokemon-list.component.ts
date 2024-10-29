import { Component, effect, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Pokemon } from '../models/pokemon';

const PAGE_SIZE = 10;

@Component({
  selector: 'app-pokemon-list',
  standalone: true,
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './pokemon-list.component.html',
  styleUrl: './pokemon-list.component.css',
})
export class PokemonListComponent {
  pageSize = signal(PAGE_SIZE);
  pageRanges = Array(5)
    .fill(1)
    .map((_, i) => (i + 1) * PAGE_SIZE);

  pokemons = signal<Pokemon[]>([]);
  loading = signal(false);

  constructor() {
    effect(() => {
      this.loading.set(true);
      fetch(`https://pokebuildapi.fr/api/v1/pokemon/limit/${this.pageSize()}`)
        .then((res) => res.json() as Promise<Pokemon[]>)
        .then((data) => {
          this.pokemons.set(data);
        })
        .finally(() => {
          this.loading.set(false);
        });
    });
  }
}
