# 🛡️ User Management System (Node.js + JWT)

사용자 회원가입/로그인 기능을 제공하며, JWT 인증 기반의 API 보호 기능을 포함한 사용자 관리 백엔드 서버입니다.  
Swagger 문서를 통해 모든 API를 한눈에 확인하고 테스트할 수 있습니다.

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

Swagger UI에서 전체 API 명세, 요청/응답 예시 및 상태 코드를 확인할 수 있습니다.

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
## 🧪 테스트

```text
npm test
```
- 회원가입 성공/실패
- 로그인 성공/실패
- 인증된 사용자만 /me 접근 가능
