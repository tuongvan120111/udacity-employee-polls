export const getLeaderBoardData = (req) => {
  if (!req || typeof req === "string") {
    return [];
  }

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

export const sortingItem = (type, isDataUp) => {
  let property = "answered";

  if (type !== "Answered") {
    property = "created";
  }

  if (isDataUp) {
    return (first, second) => second[property] - first[property];
  } else {
    return (first, second) => first[property] - second[property];
  }
};
