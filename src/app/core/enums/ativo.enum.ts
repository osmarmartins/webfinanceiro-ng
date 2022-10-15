export enum Ativo {
  INATIVO,
  ATIVO,
}

export const AtivoDescricao = new Map<string, string>([
  ['INATIVO', 'Inativo'],
  ['ATIVO', 'Ativo'],
]);

export const AtivoStyle = new Map<string, string>([
  ['INATIVO', 'danger'],
  ['ATIVO', 'success'],
]);
