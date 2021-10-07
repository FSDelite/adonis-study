class HourDiff {
  async HourDiff(start_date, finish_date, hour_value) {
    const inicio = new Date(start_date).getTime(); // pegando o tempo em milissegundos
    const fim = new Date(finish_date).getTime(); // pegando o tempo em milissegundos

    const final = Math.ceil((fim - inicio) / 3600000) * hour_value; //Convertendo em horas
    return final;
  }
}
module.exports = HourDiff;


