
export interface UpdateEventModel { 
  name : string,
  description : string,
  startDate : Date,
  endDate : Date,
  locationId : number,
  visibility : boolean,
  tags : Array<number>
}