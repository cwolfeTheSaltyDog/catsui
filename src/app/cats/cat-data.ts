import { InMemoryDbService } from 'angular-in-memory-web-api';

import { Cat } from './Cat';

export class CatData implements InMemoryDbService {

  createDb() {
    const cats: Cat[] = [
      {
        id: 1,
        catName: 'Mocha',
        coatColor: 'Tortie',
      },
      {
        id: 2,
        catName: 'Skittle',
        coatColor: 'Grey Tabbie',
      },
      {
        id: 3,
        catName: 'Hobbes',
        coatColor: 'Orange Tabbie',
      },
      {
        id: 4,
        catName: 'Pewter',
        coatColor: 'Torbie',
      },
      {
        id: 5,
        catName: 'Winifred',
        coatColor: 'Black and White',
      },      {
        id: 6,
        catName: 'Spooky',
        coatColor: 'Black',
      },
    ];
    return { cats };
  }
}
