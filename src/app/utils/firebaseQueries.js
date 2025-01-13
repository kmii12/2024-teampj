// import { collection, query, where, getDocs } from "firebase/firestore";
// import { db } from "../firebase";

// export const searchBooks = async (filters) => {
//   let booksRef = collection(db, "絵本");
//   let q = query(booksRef);

//   // 絞り込み条件を動的に追加
//   if (filters[1]) {
//     q = query(q, where("type", "==", filters[1]));
//   }
//   if (filters[2]) {
//     q = query(q, where("ageGroup", "==", filters[2]));
//   }

//   const querySnapshot = await getDocs(q);
//   const results = [];
//   querySnapshot.forEach((doc) => {
//     results.push({ id: doc.id, ...doc.data() });
//   });

//   return results;
// };
