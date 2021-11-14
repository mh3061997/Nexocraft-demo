export class Repository {

      //TODO:change fileds to private and use getters in repo template
      constructor(
            public name: string,
            public stargazers_count: number,
            public language: string) { }

      public getName(): string {
            return this.name;
      }
      public getStarCount(): number {
            return this.stargazers_count;
      }
      public getLanguage(): string {
            return this.language;
      }
};