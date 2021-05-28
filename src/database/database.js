import localdb from "localdb";
import { getIdUser } from "./schemas/user";
import { getIdPubli, publiStatus } from "./schemas/publicacoes";

export const UsersDB = new localdb("usuarios", "Array", true);
export const PubliDB = new localdb("publicacoes", "Array", true);

function populaUsuarios() {
  try {
    UsersDB.remove();
  } catch (error) {
    console.log('Não existe usuários para remover.');
  }

  UsersDB.add({
    usuario_id: getIdUser(),
    nome: "Victor",
		sobrenome: "Palasios",
    email: "victorpalasios@elf.com",
		senha: "Elfos>ALL",
		descricao: "Aluno da escola de arquearia de Valfenda a procura de melhorar suas habilidades em fisica para dar sempre tiros certeiros."
  })
    .add({
      usuario_id: getIdUser(),
      nome: "José",
			sobrenome: "Rocha",
      email: "kansasmyers@hobbit.com",
			senha: "QueroDescanso",
			descricao: "Um dos maiores negociantes de Tabaco do Condando procurando melhorar seu mindset em atacado."
    })
    .add({
      usuario_id: getIdUser(),
      nome: "Denis",
			sobrenome: "Rodrigues",
      email: "denisrodrigues@human.com",
			senha: "PrecisamosDeUmRei",
			descricao: "General de Gondor a procura de projetos que possam te ajudar com gestão de pessoas (humanos).",
      endereco: "Grande Mar, Gondor - Terra Média",
    })
    .add({
      usuario_id: getIdUser(),
      nome: "Pedro",
			sobrenome: "Moreira",
      email: "pedromoreira@orc.com",
			senha: "DESTRUIÇÃO",
			descricao: "Vim das Terras de Mordor e procuro pessoas para bolar planos de caos e destruição."
    })
    .add({
      usuario_id: getIdUser(),
      nome: "Winner",
			sobrenome: "Soares",
      email: "winnersoares@dwarf.com",
			senha: "Cerveja",
			descricao: "Sou de Erebor e quero companheiros para retormar uma certa montanha de um certo dragão."
    });
}

function populaPublicacoes() {
  try {
    PubliDB.remove();
  } catch (error) {
    console.log('Não existe publicações para remover.');
  }

  PubliDB.add({
    publicacao_id: getIdPubli(),
    descricao: "Grupo para estudar uma pedra rarissima - Somente mestre ferreiros",
    arq_conteudo: "Pedra.pdf",
		status: publiStatus.PUBLICADO,
		usuario_id: 5
  });
}

export default () => {
  populaUsuarios();
  populaPublicacoes();
};
