
export interface UserDetailsModel { 
  id : number,
  name : string,
  surname : string,
  mail : string,
  followTags : Array<{id : number, tagId : number, accountId : number, nameTag : string}>,
  inscriptions : Array<{id : number, accountId : number, eventId : number}>,
  role : string,
}


// {
//     "id": 1,
//     "name": "John",
//     "surname": "John",
//     "mail": "mail@gmail.com",
//     "followTags": [
//         {
//             "id": 2,
//             "tagId": 1,
//             "accountId": 1,
//             "nameTag": "Beebo"
//         }
//     ],
//     "inscriptions": [
//         {
//             "id": 1,
//             "accountId": 1,
//             "eventId": 1
//         }
//     ],
//     "role": "ROLE_USER"
// }