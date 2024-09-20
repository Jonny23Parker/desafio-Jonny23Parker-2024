export class RecintosZoo {
  constructor() {
      // Definindo os recintos existentes no zoológico
      this.recintos = [
          { numero: 1, bioma: "savana", tamanho: 10, animais: { macacos: 3 } },
          { numero: 2, bioma: "floresta", tamanho: 5, animais: {} },
          { numero: 3, bioma: "savana e rio", tamanho: 7, animais: { gazela: 1 } },
          { numero: 4, bioma: "rio", tamanho: 8, animais: {} },
          { numero: 5, bioma: "savana", tamanho: 9, animais: { leao: 1 } }
      ];

      // Definindo os animais e suas características
      this.animais = {
          LEAO: { tamanho: 3, biomas: ["savana"], carnivoro: true },
          LEOPARDO: { tamanho: 2, biomas: ["savana"], carnivoro: true },
          CROCODILO: { tamanho: 3, biomas: ["rio"], carnivoro: true },
          MACACO: { tamanho: 1, biomas: ["savana", "floresta"], carnivoro: false },
          GAZELA: { tamanho: 2, biomas: ["savana"], carnivoro: false },
          HIPOPOTAMO: { tamanho: 4, biomas: ["savana", "rio"], carnivoro: false }
      };
  }

  // Método principal para analisar recintos viáveis
  analisaRecintos(animal, quantidade) {
      // Validando tipo de animal
      if (!this.animais.hasOwnProperty(animal)) {
          return { erro: "Animal inválido" };
      }

      // Validando quantidade de animais
      if (typeof quantidade !== "number" || quantidade <= 0) {
          return { erro: "Quantidade inválida" };
      }

      // Definindo o animal e suas características
      const animalInfo = this.animais[animal];
      const tamanhoRequerido = quantidade * animalInfo.tamanho;
      let recintosViaveis = [];

      // Analisando recintos existentes
      for (const recinto of this.recintos) {
          const biomasValidos = animalInfo.biomas.includes(recinto.bioma) || 
              (animalInfo.biomas.includes("savana") && recinto.bioma.includes("savana")) || 
              (animalInfo.biomas.includes("rio") && recinto.bioma.includes("rio"));

          if (!biomasValidos) continue; // Recinto não é de bioma adequado

          let espacoOcupado = Object.keys(recinto.animais).reduce((total, animalRecinto) => total + (recinto.animais[animalRecinto] * (this.animais[animalRecinto.toUpperCase()].tamanho)), 0);

          if (Object.keys(recinto.animais).length > 1) espacoOcupado += 1; // Espaço extra quando há mais de uma espécie

          let espacoDisponivel = recinto.tamanho - espacoOcupado;

          // Verificando se o recinto suporta a nova adição de animais
          const ehCarnivoro = animalInfo.carnivoro && Object.keys(recinto.animais).some(esp => esp !== animal.toLowerCase());
          const ehHipopotamo = animal === "HIPOPOTAMO" && recinto.bioma !== "savana e rio";
          const recintoVazioParaMacacos = animal === "MACACO" && Object.keys(recinto.animais).length === 0;

          if (ehCarnivoro || ehHipopotamo || espacoDisponivel < tamanhoRequerido || (recintoVazioParaMacacos && quantidade < 2)) continue;

          recintosViaveis.push(`Recinto ${recinto.numero} (espaço livre: ${espacoDisponivel - tamanhoRequerido} total: ${recinto.tamanho})`);
      }

      // Retorno da função conforme os resultados encontrados
      if (recintosViaveis.length > 0) {
          return { recintosViaveis };
      } else {
          return { erro: "Não há recinto viável" };
      }
  }
}
