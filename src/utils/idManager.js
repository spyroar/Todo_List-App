// Utility to manage task IDs
let lastId = 0;

export const getNextId = () => {
  lastId += 1;
  return lastId;
};

export const setLastId = (id) => {
  lastId = id;
};