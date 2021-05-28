<template>
  <v-card elevation="2" outlined shaped>
    <v-card-title> {{ $app.name }}</v-card-title>
    <v-card-text>
      <div>
        O projeto tem um intuito de funcionar como se fosse fórum de discussões realizando um match entre os participantes, em que é possível o acoplamento de membros nos próximos trabalhos e chats de conversas entre as partes interessadas privadamente. Dessa forma, a evolução dos trabalhos científicos e a partilha de conhecimento seria maior e incentivaria novos cientistas trabalharem em grupo, além de poder ingressar formas interdisciplinares, viabilizando a equipe como alma do sucesso.
      </div>
      <v-timeline>
        <v-timeline-item v-for="(time, i) in timelines" :key="i" :color="time.color" small>
          <template v-slot:opposite>
            <span :class="`headline font-weight-bold ${time.color}--text`" v-text="time.year"></span>
          </template>
          <div class="py-4">
            <h2 :class="`headline font-weight-light mb-4 ${time.color}--text`">
              {{ time.header }}
            </h2>
            <div>
              {{ time.text }}
            </div>
          </div>
        </v-timeline-item>
      </v-timeline>
    </v-card-text>

  </v-card>
</template>

<script>
export default {
  name: 'Home',
  data: () => ({
    timelines: [
      {
        color: 'cyan',
        year: '12/04/2021',
        text: 'Criamos toda a base do sitema com o crud de Usuário utilizando uma base simulada.',
        header: 'Feature'
      },
      {
        color: 'cyan',
        year: '20/05/2021',
        text: 'Adicionado sistema de database javascript e adicionando crud de publicações com toda ligação aos usuários.',
        header: 'Feature'
      },
      {
        color: 'cyan',
        year: '26/05/2021',
        text: 'Criado um chat global para todos os usuários poderem se comunicarem.',
        header: 'Feature'
      }
    ],
  }),
}
</script>

<style>
</style>