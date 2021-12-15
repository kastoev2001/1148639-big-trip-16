let idNamber = 0;

export const generateId = () => {
  idNamber++;

  return idNamber;
};

export const getRandomInteger = (first = 0, last = 1) => {
  const lower = Math.ceil(Math.min(first, last));
  const upper = Math.floor(Math.max(first, last));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};
