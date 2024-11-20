import mysql = from 'mysql2/promise';

export default async function handler(req,res){
  //mysql接続設定
  const db = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  })
  try{
    const [rows] = await db.execute('SELECT * FROM story_books')
    res.status(200).json(rows);

  }
  catch(error){
    res.status(500).json({error: '取得に失敗'})
  }
  finally{
    db.end();
  }
}
