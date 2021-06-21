 <template>
  <v-card class="mx-auto" max-width="434" tile>
    <v-card-title>Publicação</v-card-title>
    <v-card-text class="text--primary">
        {{ publi.descricao }}
    </v-card-text>
    <v-card-text>
        <div class="my-4 text-subtitle-1">
            Publicação By: {{ user.sobrenome }}, {{ user.nome }}
        </div>
    </v-card-text>
    <v-divider class="mx-4"></v-divider>
    <v-card-title>Avalie a publicação</v-card-title>
    <v-card-text class="text--primary">
        <v-rating
            empty-icon="mdi-heart-outline"
            full-icon="mdi-heart"
            half-icon="mdi-heart-half-full"
            hover
            length="5"
            size="20"
            value="1"
        ></v-rating>
    </v-card-text>
  </v-card>
</template>

<script>
import { PubliDB, UsersDB } from '../database/database';

export default {
  data: () => ({
    publi: {},
    user: {},
  }),
  created () {
    this.publi = PubliDB.findOne({ publicacao_id: parseInt(this.$route.params.id) })
    this.user = UsersDB.findOne({ usuario_id:  this.publi.usuario_id });
  }
}
</script>