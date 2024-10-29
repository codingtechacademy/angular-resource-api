export interface Pokemon {
  id: number;
  name: string;
  image: string;
  sprite: string;
  apiTypes: { name: string; image: string }[];
}
