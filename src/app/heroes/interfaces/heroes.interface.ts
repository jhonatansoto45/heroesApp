export interface Heroe {
  id?: string;
  superhero: string;
  publisher: Publisher;
  alter_ego: string;
  first_apparence: string;
  characters: string;
  alt_img?: string;
}

export enum Publisher {
  DCComics = 'DC Comics',
  MarvelComics = 'MarvelComics',
}
