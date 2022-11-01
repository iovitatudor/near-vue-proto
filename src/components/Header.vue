<template>
  <v-app-bar
      app
      color="primary"
      dark
  >
    <div class="d-flex align-center">
      Near Vue Proto
    </div>

    <v-spacer></v-spacer>

    <v-btn text v-if="!currentUser" @click="login">
      <span class="mr-2">Login</span>
      <v-icon>mdi-account</v-icon>
    </v-btn>

    <div v-else>
      <small>{{ currentUser.accountId }}</small>

      <v-btn text @click="logout">
        <span class="mr-2">Logout</span>
        <v-icon>mdi-logout</v-icon>
      </v-btn>
    </div>

  </v-app-bar>
</template>

<script>
export default {
  name: "Header",

  props: ['contract', 'currentUser', 'nearConfig', 'walletConnection'],

  methods: {
    login() {
      this.walletConnection.requestSignIn({
            contractId: this.nearConfig.contractName,
            methodNames: [this.contract.ft_transfer.name]
          },
          'Near vue proto', null, null
      )
    },
    logout() {
      this.walletConnection.signOut();
      window.location.replace(window.location.origin + window.location.pathname);
    },
  }
}
</script>

<style scoped>

</style>