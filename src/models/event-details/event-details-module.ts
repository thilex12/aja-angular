
export interface EventDetailsModel { 
  id : number,
  id_owner : number,
  name : string,
  description : string,
  creationDate : Date,
  startDate : Date,
  endDate : Date,
  location : number,
  visibility : boolean,
  tags : Array<number>
  inscriptions : Array<{
    id: number,
    accountId: number,
    eventId: number
  }>
}