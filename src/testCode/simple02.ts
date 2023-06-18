export const getPrice = (count: number) => {
  return count + 10;
};

export const getQuantity = (count: number) => {
  return count * 5;
};

export const calculateTotal = (count: number) => {
  const price = getPrice(count);
  const quantity = getQuantity(count);
  return price * quantity;
};
