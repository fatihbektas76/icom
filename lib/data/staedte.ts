export interface Stadt {
  slug: string
  name: string
  state: string
  population: number
}

export const staedte: Stadt[] = [
  { slug: 'muenchen',    name: 'München',    state: 'Bayern',              population: 1512491 },
  { slug: 'berlin',      name: 'Berlin',     state: 'Berlin',              population: 3677472 },
  { slug: 'hamburg',     name: 'Hamburg',    state: 'Hamburg',             population: 1853935 },
  { slug: 'frankfurt',   name: 'Frankfurt',  state: 'Hessen',              population: 773068  },
  { slug: 'koeln',       name: 'Köln',       state: 'NRW',                 population: 1084394 },
  { slug: 'stuttgart',   name: 'Stuttgart',  state: 'Baden-Württemberg',   population: 626275  },
  { slug: 'heidelberg',  name: 'Heidelberg', state: 'Baden-Württemberg',   population: 160601  },
  { slug: 'mannheim',    name: 'Mannheim',   state: 'Baden-Württemberg',   population: 309370  },
  { slug: 'duesseldorf', name: 'Düsseldorf', state: 'NRW',                 population: 619294  },
  { slug: 'dortmund',    name: 'Dortmund',   state: 'NRW',                 population: 586600  },
  { slug: 'essen',       name: 'Essen',      state: 'NRW',                 population: 582415  },
  { slug: 'leipzig',     name: 'Leipzig',    state: 'Sachsen',             population: 620523  },
  { slug: 'dresden',     name: 'Dresden',    state: 'Sachsen',             population: 556780  },
  { slug: 'nuernberg',   name: 'Nürnberg',   state: 'Bayern',              population: 515543  },
  { slug: 'hannover',    name: 'Hannover',   state: 'Niedersachsen',       population: 538068  },
  { slug: 'bremen',      name: 'Bremen',     state: 'Bremen',              population: 566573  },
  { slug: 'bochum',      name: 'Bochum',     state: 'NRW',                 population: 364920  },
  { slug: 'wuppertal',   name: 'Wuppertal',  state: 'NRW',                 population: 354382  },
  { slug: 'bielefeld',   name: 'Bielefeld',  state: 'NRW',                 population: 341755  },
  { slug: 'bonn',        name: 'Bonn',       state: 'NRW',                 population: 329673  },
]

export function getStadtBySlug(slug: string) {
  return staedte.find(s => s.slug === slug)
}
