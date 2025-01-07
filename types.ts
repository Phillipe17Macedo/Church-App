export interface Celula {
  id: string;
  titulo: string;
  data: string;
  horario: string;
  endereco: string;
  imagem: string;
  linkEnderecoMaps: string;
  nomeLider: string;
  numeroLider: string;
  descricao: string;
}

export interface Evento {
  id: string;
  titulo: string;
  data: string;
  horario: string;
  imagem: string;
  endereco: string;
  linkEnderecoMaps: string;
  numeroContato: string;
  valor: string;
  descricao: string;
}

export interface ChavePix {
  id: string;
  chavePix: string;
  dataCadastro: string;
  dataAlteracao: string;
}

export interface Opcao {
  id?: string;
  nomeOpcao: string;
  url: string;
  dataCadastro: string;
}
