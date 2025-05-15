const users = [];

// 회원가입
exports.createUser = (username, password, nickname) => {
    const newUser = {
        id: users.length + 1,
        username,
        password,
        nickname
    };
    users.push(newUser);
    return newUser;
};

exports.findUser = (username) => {
    return users.find(user => user.username === username);
};

// 테스트 초기화를 위한 함수 추가
exports._clear = () => {
  users.length = 0; 
};