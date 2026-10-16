import express from "express"
import mysql from "mysql2"

// app 객체 생성
const app = express();
const PORT = 8000;

// mysql 연결 설정
// host
const db = mysql.createConnection({
    host: "localhost",
    user: "jsuser",
    password: "pwjs",
    database: "jsdb"
});

// mysql dbms에 연결
db.connect((err) => {
    if(err){
        console.error("DB 연결 오류!!", err);
        return;
    }
    console.log("데이터베이스에 연결했습니다.")
});

// 기본 라우트 설정
app.get('/', (req, res) => {
    res.send("<h1>API 서버와 DB 연동</h1>")
})

// 상품 목록 조회
// db.query(sql, 데이터, 콜백함수)
app.get("/api/products", (req, res) => {
    const sql = "SELECT * FROM product";
    db.query(sql, (err, results) => {
        if(err){
            console.log("상품 조회 오류!! ", err);
            res.send("상품 조회 중 오류 발생!!");
            return;
        }
        res.json(results); //json 형태로 응답
    });
});

// 본문 요청 파싱
app.use(express.json());

// 상품 등록
app.post("/api/products", (req, res) => {
    const {productName, price} = req.body; // 요청한 속성 데이터
    const sql = "INSERT INTO product(product_name, price) VALUES(?, ?)";
    db.query(sql, [productName, price], (err, results) => {
        if(err){
            console.log("상품 조회 오류!! ", err);
            res.send("상품 조회 중 오류 발생!!");
            return;
        }
        res.send("상품 등록 완료!!");
    } );
})

// 서버 실행
app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}에서 서버 실행중...`);
})