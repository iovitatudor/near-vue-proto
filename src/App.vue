<template>
  <v-app>
    <Header :contract="contract"
            :currentUser="currentUser"
            :nearConfig="nearConfig"
            :walletConnection="walletConnection"/>

    <v-main>
      <Wallet v-if="currentUser"
              :contract="contract"
              :currentUser="currentUser"/>
    </v-main>
  </v-app>
</template>

<script>
import Header from "./components/Header";
import Wallet from "./components/Wallet";

export default {
  name: 'App',

  props: ['contract', 'currentUser', 'nearConfig', 'walletConnection'],

  components: {
    Header,
    Wallet,
  },

  data: () => ({
    //
  }),
};
</script>
