<template>
  <v-app>
    <Header :contract="contract"
            :currentUser="currentUser"
            :nearConfig="nearConfig"
            :walletConnection="walletConnection"/>

    <v-main>
      <Transaction v-if="currentUser"
              :contract="contract"
              :currentUser="currentUser"/>
    </v-main>
  </v-app>
</template>

<script>
import Header from "./components/Header";
import Transaction from "./components/Transaction";

export default {
  name: 'App',

  props: ['contract', 'currentUser', 'nearConfig', 'walletConnection'],

  components: {
    Header,
    Transaction,
  },

  data: () => ({
    //
  }),
};
</script>
