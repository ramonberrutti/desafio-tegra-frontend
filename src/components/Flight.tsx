
export interface IPatch {
  voo: string;
  origem: string;
  destino: string;
  saida: string;
  chegada: string;
  operador: string;
  preco: number;
}

export interface IFullFlight {
  origem: string;
  destino: string;
  saida: string;
  chegada: string;
  trechos: IPatch[];
}