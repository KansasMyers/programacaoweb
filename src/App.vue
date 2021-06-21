  
<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" app absolute>
      <v-list nav dense>
        <v-list-item-group v-model="group" active-class="primary--text text--accent-4">
          <v-list-item link to="/">
            <v-list-item-icon>
              <v-icon>mdi-home</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item>

          <v-list-group :value="true" prepend-icon="mdi-account-circle" no-action>
            <template v-slot:activator>
              <v-list-item-title>Usuários</v-list-item-title>
            </template>

            <v-list-item v-for="([title, icon, link], i) in menuAdmins" :key="i" link :to="link">
              <v-list-item-title v-text="title"></v-list-item-title>

              <v-list-item-icon>
                <v-icon v-text="icon"></v-icon>
              </v-list-item-icon>
            </v-list-item>
          </v-list-group>

          <v-list-group :value="true" prepend-icon="mdi-note" no-action>
            <template v-slot:activator>
              <v-list-item-title>Publicações</v-list-item-title>
            </template>

            <v-list-item v-for="([title, icon, link], i) in menuPubli" :key="i" link :to="link">
              <v-list-item-title v-text="title"></v-list-item-title>

              <v-list-item-icon>
                <v-icon v-text="icon"></v-icon>
              </v-list-item-icon>
            </v-list-item>
          </v-list-group>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app color="primary">
      <v-app-bar-nav-icon class="white--text" @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title class="white--text">{{ $app.name }}</v-toolbar-title>
    </v-app-bar>

    <v-main id="main">
      <router-view></router-view>
    </v-main>

    <beautiful-chat :participants="participants" :titleImageUrl="titleImageUrl" :onMessageWasSent="onMessageWasSent" :messageList="messageList" :newMessagesCount="newMessagesCount" :isOpen="isChatOpen" :close="closeChat" :icons="icons" :open="openChat" :showEmoji="true" :showFile="true" :showEdition="true" :showDeletion="true" :showTypingIndicator="showTypingIndicator" :showLauncher="true" :showCloseButton="true" :colors="colors" :alwaysScrollToBottom="alwaysScrollToBottom" :messageStyling="messageStyling" @onType="handleOnType" @edit="editMessage" />
  </v-app>
</template>

<script>
import CloseIcon from './assets/icons/close-icon.png';
import OpenIcon from './assets/icons/logo-no-bg.svg';
import FileIcon from './assets/icons/file.svg';
import CloseIconSvg from './assets/icons/close.svg';

export default {
  name: 'App',
  data () {
    return {
      drawer: true,
      group: null,
      menuAdmins: [
        ['Gerenciar', 'mdi-cog-outline', '/usuarios'],
      ],
      menuPubli: [
        ['Gerenciar', 'mdi-cog-outline', '/publicacoes'],
      ],
      icons: {
        open: {
          img: OpenIcon,
          name: 'default',
        },
        close: {
          img: CloseIcon,
          name: 'default',
        },
        file: {
          img: FileIcon,
          name: 'default',
        },
        closeSvg: {
          img: CloseIconSvg,
          name: 'default',
        },
      },
      participants: [
        {
          id: 'user1',
          name: 'José Victor',
          imageUrl: 'https://static.dw.com/image/18119885_303.jpg'
        },
        {
          id: 'user2',
          name: 'Winner Soares',
          imageUrl: 'http://s2.glbimg.com/ym14ODl3C5EEGgQ4Lti5jH64K2E=/290x217/s2.glbimg.com/HlEs0ZsiF132YMCOG6DqGzDMapg=/620x465/s.glbimg.com/jo/g1/f/original/2014/12/08/richard-armitage-the-hobbit-the-battle-of-the-five-armies.jpg'
        }
      ], // the list of all the participant of the conversation. `name` is the user name, `id` is used to establish the author of a message, `imageUrl` is supposed to be the user avatar.
      titleImageUrl: 'https://a.slack-edge.com/66f9/img/avatars-teams/ava_0001-34.png',
      messageList: [
        { type: 'text', author: `me`, data: { text: `Olá meus amigos!` } },
        { type: 'text', author: `user1`, data: { text: `Olá, seja bem-vindo.` } },
        { type: 'text', author: `user2`, data: { text: `Alguém precisa de um ferreiro?` } }
      ], // the list of the messages to show, can be paginated and adjusted dynamically
      newMessagesCount: 0,
      isChatOpen: false, // to determine whether the chat window should be open or closed
      showTypingIndicator: '', // when set to a value matching the participant.id it shows the typing indicator for the specific user
      colors: {
        header: {
          bg: '#4e8cff',
          text: '#ffffff'
        },
        launcher: {
          bg: '#4e8cff'
        },
        messageList: {
          bg: '#ffffff'
        },
        sentMessage: {
          bg: '#4e8cff',
          text: '#ffffff'
        },
        receivedMessage: {
          bg: '#eaeaea',
          text: '#222222'
        },
        userInput: {
          bg: '#f4f7f9',
          text: '#565867'
        }
      }, // specifies the color scheme for the component
      alwaysScrollToBottom: false, // when set to true always scrolls the chat to the bottom when new events are in (new message, user starts typing...)
      messageStyling: true // enables *bold* /emph/ _underline_ and such (more info at github.com/mattezza/msgdown)
    }
  },
  methods: {
    sendMessage (text) {
      if (text.length > 0) {
        this.newMessagesCount = this.isChatOpen ? this.newMessagesCount : this.newMessagesCount + 1
        this.onMessageWasSent({ author: 'support', type: 'text', data: { text } })
      }
    },
    onMessageWasSent (message) {
      // called when the user sends a message
      this.messageList = [...this.messageList, message]
    },
    openChat () {
      // called when the user clicks on the fab button to open the chat
      this.isChatOpen = true
      this.newMessagesCount = 0
    },
    closeChat () {
      // called when the user clicks on the botton to close the chat
      this.isChatOpen = false
    },
    handleScrollToTop () {
      // called when the user scrolls message list to top
      // leverage pagination for loading another page of messages
    },
    handleOnType () {
      console.log('Emit typing event')
    },
    editMessage (message) {
      const m = this.messageList.find(m => m.id === message.id);
      m.isEdited = true;
      m.data.text = message.data.text;
    }
  }
}
</script>

<style>
#main {
  margin: 35px;
}
</style>