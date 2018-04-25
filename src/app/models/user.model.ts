export class User{
  constructor(
    public uid: string,
    public isNotetaker: boolean,
    public first_name: string,
    public last_name: string,
    public classes: any[],
    public notes: any[]
  ){}
}
