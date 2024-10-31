import { Component, inject, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { PokemonService } from '../services/pokemon.service';

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

  pokemonService = inject(PokemonService);

  pokemonResource = rxResource({
    request: this.pageSize,
    loader: ({ request: pageSize }) =>
      this.pokemonService.getPokemons(pageSize),
  });
}
