# 🛡️ User Management System (Node.js + JWT)

사용자 회원가입/로그인 기능을 제공하며, JWT 인증 기반의 API 보호 기능을 포함한 사용자 관리 백엔드 서버입니다.  

---

## 🚀 주요 기능

- 회원가입
- 로그인 및 JWT 발급
- 내 정보 조회 
- JWT 기반 인증 처리 (만료/위조 등)
- Swagger API 문서 제공
- Jest 기반 테스트 코드 포함

---

## 🧰 사용 기술

- Node.js (20)
- Express
- JWT (jsonwebtoken)
- Swagger (swagger-ui-express, swagger-jsdoc)
- Jest, Supertest
- AWS EC2 (배포)

---
## 📖 Swagger 문서 접속

```text
Local 실행 시: http://localhost:3000/api-docs
배포 링크: http://3.34.200.144:3000/api-docs
```

---

## 📦 설치 및 실행

```bash
npm install

# .env 파일 생성
echo "JWT_SECRET=your-secret-key" > .env

# 서버 실행
node index.js
```
---

## 📑 API 명세(요약)
Base URL: http://3.34.200.144:3000

| 메서드 | 경로      | 설명              | 권한      |
|--------|-----------|-------------------|-----------|
| POST   | `/api/auth/signup` | 회원가입           | 모두       |
| POST   | `/api/auth/login`  | 로그인 (JWT 발급)  | 모두       |
| GET    | `/api/users/me` | 내 정보 조회       | USER 이상 |

---
## 🧪 테스트

```text
npm test
```
- 회원가입 성공/실패
- 로그인 성공/실패
- 인증된 토큰 보유 사용자만 /me 접근 가능
