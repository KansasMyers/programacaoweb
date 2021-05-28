<template>
  <v-data-table :headers="headers" :items="publicacoes" class="elevation-1">
    <template v-slot:item.status="{ item }">
        {{ retornapubliStatus(item.status) }}
    </template>
    <template v-slot:item.usuario_id="{ item }">
        {{ retornaUsuarioPubli(item.usuario_id)  }}
    </template>
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>Publicações</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
              Nova Publicação
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="12" md="12">
                    <v-text-field v-model="editedItem.descricao" label="Descrição"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="12" md="6">
                    <v-text-field v-model="editedItem.arq_conteudo" label="Caminho Arq."></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="12" md="6">
                    <v-select
                      v-model="editedItem.status"
                      :items="publiStatus"
                      item-text="nome"
                      item-value="id"
                      label="Selecione o Status"
                      single-line
                    ></v-select>
                  </v-col>
                  <v-col cols="12" sm="12" md="12">
                    <v-select
                      v-model="editedItem.usuario_id"
                      :items="usuarios"
                      item-text="nome"
                      item-value="usuario_id"
                      label="Selecione o Usuário"
                      single-line
                    >
                      <template slot="selection" slot-scope="data">
                        {{ data.item.nome }} {{ data.item.sobrenome }}
                      </template>
                      <template slot="item" slot-scope="data">
                        {{ data.item.nome }} {{ data.item.sobrenome }}
                      </template>
                    </v-select>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close">
                Cancelar
              </v-btn>
              <v-btn color="blue darken-1" text @click="save">
                Salvar
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="headline">Você deseja realmente deletar esse item?</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDelete">Cancelar</v-btn>
              <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:[`item.actions`]="{ item }">
      <v-icon small class="mr-2" @click="editItem(item)">
        mdi-pencil
      </v-icon>
      <v-icon small @click="deleteItem(item)">
        mdi-delete
      </v-icon>
    </template>
  </v-data-table>
</template>

<script>
import { PubliDB, UsersDB } from '../database/database';
import publiSchema, { publiColumns, getIdPubli, publiStatusObject } from '../database/schemas/publicacoes';

export default {
  data: () => ({
    dialog: false,
    dialogDelete: false,
    headers: publiColumns,
    publicacoes: [],
    editedIndex: -1,
    editedItem: publiSchema,
    defaultItem: publiSchema,
    publiStatus: publiStatusObject,
    usuarios: UsersDB.get()
  }),

  computed: {
    formTitle () {
      return this.editedIndex === -1 ? 'Nova Publicação' : 'Editando Publicação'
    },
  },

  watch: {
    dialog (val) {
      val || this.close()
    },
    dialogDelete (val) {
      val || this.closeDelete()
    },
  },

  created () {
    this.initialize();
  },

  methods: {
    retornaUsuarioPubli(value) {
      let usuario = UsersDB.findOne({ usuario_id: value });
      return usuario.nome + ' ' + usuario.sobrenome;
    },

    retornapubliStatus(status) {
      switch (status) {
        case 1:
          return "PUBLICADO";
        case 2: 
          return "EM ANDAMENTO";
        case 3:
          return "FINALIZADO";
        default:
          return "Nenhum";
      }
    },

    initialize () {
      this.publicacoes = PubliDB.get();
    },

    editItem (item) {
      this.editedIndex = item.publicacao_id
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    deleteItem (item) {
      this.editedIndex = item.publicacao_id
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },

    deleteItemConfirm () {
      PubliDB.remove('publicacao_id', this.editedIndex);
      this.closeDelete()
    },

    close () {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })

      this.publicacoes = PubliDB.get();
    },

    closeDelete () {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })

      this.publicacoes = PubliDB.get();
    },

    save () {
      if (this.editedIndex > -1) {
        const query = { publicacao_id: this.editedIndex };
        PubliDB.find(query).forEach(publicacao => {
          Object.assign(publicacao, this.editedItem);
          PubliDB.save(publicacao);
        });
      } else {
        this.editedItem.publicacao_id = getIdPubli();
        PubliDB.add(this.editedItem);
      }
      this.close()
    },
  },
}
</script>