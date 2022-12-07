export const filtro = (item, keys, consultaGeral) => {
  //Na arrowfunction eu chamo as contantes necessários
    return item.filter((item) =>
    //No for item eu separo elemento por elemento
      keys.some((key) => item[key].toLowerCase().includes(consultaGeral))
      //aqui eu vejo por quais atribuitos eu vou procurar, e por qual texto vou procurar
    );
  };



  

