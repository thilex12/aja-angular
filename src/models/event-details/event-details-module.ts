
export interface EventDetailsModel { 
  id : number,
  id_owner : number,
  name : string,
  description : string,
  creationDate : Date | null,
  startDate : Date,
  endDate : Date,
  locationId : number,
  visibility : boolean,
  tags : Array<number>
  inscriptions : Array<{
    id: number,
    accountId: number,
    eventId: number
  }>,
  archived : boolean
}