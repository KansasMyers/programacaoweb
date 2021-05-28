let idValue = 0;

export function getIdUser() {
  return ++idValue;
}

export let userColumns = [
  {
    text: "Id",
    align: "start",
    value: "usuario_id",
  },
  { text: "Nome", value: "nome" },
  { text: "Sobrenome", value: "sobrenome" },
  { text: "Email", value: "email" },
  { text: "Senha", value: "senha" },
  { text: "Descrição", value: "descricao" },
  { text: "Ações", value: "actions", sortable: false },
];

export default {
  usuario_id: -1,
  nome: "",
  sobrenome: "",
  email: "",
  senha: "",
  descricao: ""
};
