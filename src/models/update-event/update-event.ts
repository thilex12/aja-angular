
export interface UpdateEventModel { 
  name : string,
  description : string,
  creationDate : Date,
  startDate : Date,
  endDate : Date,
  locationId : number,
  visibility : boolean,
  tags : Array<number>
  archived : boolean
}