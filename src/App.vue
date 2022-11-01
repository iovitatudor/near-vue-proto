<template>
  <v-app>
    <Header :contract="contract"
            :currentUser="currentUser"
            :nearConfig="nearConfig"
            :walletConnection="walletConnection"/>

    <v-main>
      <v-container>
        <v-row>
          <v-col col="12" md="6" class="features-area">
            <Mint v-if="currentUser"
                  :contract="contract"
                  :currentUser="currentUser"/>

            <Transfer v-if="currentUser"
                      :contract="contract"
                      :currentUser="currentUser"/>
          </v-col>
          <v-col col="12" md="6">
            <NFTsList v-if="currentUser"
                      :contract="contract"
                      :currentUser="currentUser"/>
          </v-col>
        </v-row>
      </v-container>


    </v-main>
  </v-app>
</template>

<script>
import Header from "./components/Header";
import NFTsList from "./components/NFTsList";
import Mint from "./components/Mint";
import Transfer from "./components/Transfer";

export default {
  name: 'App',

  props: ['contract', 'currentUser', 'nearConfig', 'walletConnection'],

  components: {
    Header,
    NFTsList,
    Mint,
    Transfer
  },
};
</script>

<style>
.bordered-block {
  border: 1px solid #EEE;
  margin: 5px;
  border-radius: 5px;
}
.features-area {
  margin-top: 55px;
}
</style>
