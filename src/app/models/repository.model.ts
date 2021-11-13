export class Repository {

     constructor(
           private name: string,
           private stargazers_count: number,
           private  language: string) { }

getName():string{
     return this.name;
}
getStarCount():number{
     return this.stargazers_count;
}
getLanguage():string{
     return this.language;
}
};