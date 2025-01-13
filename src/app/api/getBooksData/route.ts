/* eslint-disable @typescript-eslint/no-unused-vars */

// import mysql from "mysql2/promise";

// export async function handler(req, res) {
//   //mysql接続設定
//   const db = await mysql.createConnection({

//   });
//   try {
//     const [rows] = await db.execute("SELECT * FROM story_books");
//     res.status(200).json(rows);
//   } catch (error) {
//     res.status(500).json({ error: "取得に失敗" });
//   } finally {
//     db.end();
//   }
// }

// import mysql from "mysql2/promise";

// export async function GET(req) {
//   try {
//     // mysql db接続
//     const connection = await mysql.createConnection({
//       host: process.env.DB_HOST,
//       user: process.env.DB_USER,
//       password: process.env.DB_PASSWORD,
//       database: process.env.DB_NAME,
//     });

//     // クエリの実行
//     const [rows] = await connection.execute("SELECT id, title FROM storyBooks");

//     //jsonでデータを返す
//     return new Response(JSON.stringify(rows), {
//       status: 200,
//       headers: { "Content-Type": "application/json" },
//     });
//   } catch (error) {
//     console.error("db接続失敗:", error);
//     return new Response(JSON.stringify({ message: "Internal Server Error" }), {
//       status: 500,
//     });
//   }
// }

/* eslint-disable @typescript-eslint/no-unused-vars */
