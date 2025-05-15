const express = require('express');
const userRouter = require('./routes/user.routes');

const app = express();
app.use(express.json());
app.get('/', (req, res) => {
    res.send('회원관리 시스템에 오신 걸 환영합니다!');
});

app.use('/api/users', userRouter);

// 테스트용으로 app export
module.exports = app;

// 직접 실행할 때만 서버 listen
if (require.main === module) {
  app.listen(3000, () => {
    console.log('서버가 http://localhost:3000 에서 실행 중입니다.');
  });
}