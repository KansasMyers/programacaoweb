let idValue = 0;

export function getIdPubli() {
  return ++idValue;
}

export const publiStatus = Object.freeze({
  PUBLICADO: 1,
  EM_ANDAMENTO: 2,
  FINALIZADO: 3,
});

export const publiStatusObject = Object.freeze([
  {nome: 'PUBLICADO', id: 1},
  {nome: 'EM ANDAMENTO', id: 2},
  {nome: 'FINALIZADO', id: 3}
]);

export let publiColumns = [
  {
    text: "Id",
    align: "start",
    value: "publicacao_id",
  },
  { text: "Descrição", value: "descricao" },
  { text: "Caminho Arq.", value: "arq_conteudo" },
  { text: "Status", value: "status" },
  { text: "Usuário", value: "usuario_id" },
  { text: "Ações", value: "actions", sortable: false },
];

export default {
  publicacao_id: -1,
  descricao: "",
  arq_conteudo: "",
  status: -1,
  usuario_id: -1,
};
