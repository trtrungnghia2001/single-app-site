export interface ResponseList<T> {
  [key: string]: T[] | number;
  currentPage: number;
  pageSize: number;
  total: number;
}
export interface IQuery {
  page: number;
  limit: number;
  name: string;
}
export interface ICharacter {
  id: number;
  name: string;
  images: string[];
  debut: {
    manga: string;
    anime: string;
    novel: string;
    movie: string;
    game: string;
    ova: string;
    appearsIn: string;
  };
  family: {
    father: string;
    mother: string;
    son: string;
    daughter: string;
    wife: string;
    'adoptive son': string;
    godfather: string;
  };
  jutsu: string[];
  natureType: string[];
  personal: {
    birthdate: string;
    sex: string;
    age: {
      'Part I': string;
      'Part II': string;
      'Academy Graduate': string;
    };
    height: {
      'Part I': string;
      'Part II': string;
      'Blank Period': string;
    };
    weight: {
      'Part I': string;
      'Part II': string;
    };
    bloodType: string;
    kekkeiGenkai: string[];
    classification: string[];
    tailedBeast: string;
    occupation: string[];
    affiliation: string[];
    team: string[];
    clan: string;
    titles: string[];
  };
  rank: {
    ninjaRank: {
      'Part I': string;
      Gaiden: string;
    };
    ninjaRegistration: string;
  };
  tools: string[];
  voiceActors: {
    japanese: string[];
    english: string[];
  };
}
export interface ICharacterTable {
  title: string;
  items: { key: string; value: string }[];
}
export interface IClan {
  id: number;
  name: string;
  characters: number[];
}
export interface IVillage {
  id: number;
  name: string;
  characters: number[];
}
export interface IKekkeiGenkai {
  id: number;
  name: string;
  characters: number[];
}
export interface ITailedBeast {
  id: number;
  name: string;
  images: string[];
  debut: {
    manga: string;
    anime: string;
    novel: string;
    movie: string;
    game: string;
    ova: string;
    appearsIn: string;
  };
  family: {
    'incarnation with the god tree': string;
    'depowered form': string;
  };

  jutsu: string[];
  natureType: string[];
  personal: {
    status: string;
    kekkeiGenkai: string;
    classification: string;
    jinchūriki: string[];
    titles: string[];
  };

  uniqueTraits: string[];
}
export interface ITeam {
  id: number;
  name: string;
  characters: number[];
}
export interface IAkatsuki extends Readonly<ICharacter> {}
export interface IKara extends Readonly<ICharacter> {}
