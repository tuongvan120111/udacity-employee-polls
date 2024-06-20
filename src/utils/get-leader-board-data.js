export const getLeaderBoardData = (req) => {
  const users = Object.values(req);
  return users.map((usr) => {
    const answers = Object.values(usr.answers);
    return {
      img: usr.avatarURL,
      name: usr.name,
      user: usr.id,
      answered: answers.length,
      created: usr.questions.length,
      key: usr.id,
    };
  });
};
