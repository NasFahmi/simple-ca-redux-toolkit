// membuat interface Post yang berisi id, title, body, dan synced

// misalkan dari api memiliki json seperti ini
// Dari API:
// {
//   "userId": 1,
//   "id": 2,
//   "title": "sunt aut facere",
//   "body": "quia et suscipit..."
// }
//  namun di interface yang kita buat hanya ada id, title, body, dan synced

//? 1.  awal kita membuat entity
export interface Post {
  id: string;
  title: string;
  body: string;
  synced: boolean;
}