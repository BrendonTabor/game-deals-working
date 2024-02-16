export const getUserByUserId = (id) => {
  return fetch(`http://localhost:8088/customers?userId=${id}`).then((res) =>
    res.json()
  );
};

export const getUserByEmail = (email) => {
  return fetch(`http://localhost:8088/users?email=${email}`).then((res) =>
    res.json()
  );
};
