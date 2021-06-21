 <template>
  <v-card class="mx-auto" max-width="434" tile>
    <v-img height="100%" src="https://cdn.vuetifyjs.com/images/cards/server-room.jpg"></v-img>
    <v-col>
      <v-avatar size="100" style="position:absolute; top: 130px">
        <v-img src="https://www.ecp.org.br/wp-content/uploads/2017/12/default-avatar-1-300x300.png"></v-img>
      </v-avatar>
    </v-col>
    <v-list-item color="rgba(0, 0, 0, .4)">
      <v-list-item-content>
        <v-list-item-title class="title">{{ user.sobrenome }}, {{ user.nome }}</v-list-item-title>
        <v-list-item-subtitle>{{ user.email }}</v-list-item-subtitle>  
        <v-card-text class="text--primary">
            {{ user.descricao }}
        </v-card-text>
      </v-list-item-content>
    </v-list-item>
  </v-card>
</template>

<script>
import { UsersDB } from '../database/database';

export default {
  data: () => ({
    user: {}
  }),
  created () {
    this.user = UsersDB.findOne({ usuario_id: parseInt(this.$route.params.id) })
  }
}
</script>