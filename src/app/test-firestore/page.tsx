// "use client";

// import { db } from "../../firebase";
// import { collection, addDoc, getDocs } from "firebase/firestore";
// import { useState } from "react";

// type LogEntry = {
//   id: string;
//   name: string;
//   createdAt: string; // Firestoreのタイムスタンプを文字列として扱う
// };

// export default function TestFirestore() {
//   const [logs, setLogs] = useState<LogEntry[]>([]);

//   const testFirestore = async () => {
//     try {
//       // Firestore にデータを追加
//       const docRef = await addDoc(collection(db, "test-collection"), {
//         name: "Next.js + Firebase Test",
//         createdAt: new Date().toISOString(),
//       });
//       console.log("Document written with ID: ", docRef.id);

//       // Firestore からデータを取得
//       const querySnapshot = await getDocs(collection(db, "test-collection"));
//       const fetchedData: LogEntry[] = [];
//       querySnapshot.forEach((doc) => {
//         const data = doc.data();
//         fetchedData.push({
//           id: doc.id,
//           name: data.name,
//           createdAt: data.createdAt,
//         });
//       });

//       setLogs(fetchedData);
//     } catch (e) {
//       console.error("Error interacting with Firestore: ", e);
//     }
//   };

//   return (
//     <div style={{ padding: "20px" }}>
//       <h1>Firestore Test (App Router + TypeScript)</h1>
//       <button onClick={testFirestore} style={{ marginBottom: "20px" }}>
//         Run Firestore Test
//       </button>
//       <div>
//         <h2>Logs:</h2>
//         <ul>
//           {logs.map((log) => (
//             <li key={log.id}>
//               {log.name} - {log.createdAt}
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// }
