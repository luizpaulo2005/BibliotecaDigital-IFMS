export const filtro = (item, keys, consultaGeral) => {
  return item.filter((item) =>
    keys.some((key) => item[key].toLowerCase().includes(consultaGeral))
  );
};
