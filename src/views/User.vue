<template>
  <v-data-table :headers="headers" :items="users" sort-by="calories" class="elevation-1">
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>Usuários</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
              Novo Usuário
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="12" md="6">
                    <v-text-field v-model="editedItem.nome" label="Nome"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="12" md="6">
                    <v-text-field v-model="editedItem.sobrenome" label="Sobrenome"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="12" md="6">
                    <v-text-field v-model="editedItem.email" label="Email"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="12" md="6">
                    <v-text-field v-model="editedItem.senha" label="Senha"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="12" md="12">
                    <v-text-field v-model="editedItem.descricao" label="Descrição"></v-text-field>
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
      <v-icon small @click="navegar(item.usuario_id)">
        mdi-account
      </v-icon>
    </template>
  </v-data-table>
</template>

<script>
import { UsersDB } from '../database/database';
import userSchema, { userColumns, getIdUser } from '../database/schemas/user';

export default {
  data: () => ({
    dialog: false,
    dialogDelete: false,
    headers: userColumns,
    users: [],
    editedIndex: -1,
    editedItem: userSchema,
    defaultItem: userSchema,
  }),

  computed: {
    formTitle () {
      return this.editedIndex === -1 ? 'Novo Usuário' : 'Editando Usuário'
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
    navegar (userId) {
      this.$router.push({ path: `/usuarios-perfil/${userId}` })
    },

    initialize () {
      this.users = UsersDB.get();
    },

    editItem (item) {
      this.editedIndex = item.usuario_id
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    deleteItem (item) {
      this.editedIndex = item.usuario_id
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },

    deleteItemConfirm () {
      UsersDB.remove('usuario_id', this.editedIndex);
      this.closeDelete()
    },

    close () {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })

      this.users = UsersDB.get();
    },

    closeDelete () {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })

      this.users = UsersDB.get();
    },

    save () {
      if (this.editedIndex > -1) {
        const query = { usuario_id: this.editedIndex };
        UsersDB.find(query).forEach(user => {
          Object.assign(user, this.editedItem)
          UsersDB.save(user)
        })
      } else {
        this.editedItem.usuario_id = getIdUser();
        UsersDB.add(this.editedItem);
      }
      this.close()
    },
  },
}
</script>