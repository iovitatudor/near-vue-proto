<template>
  <v-row class="bordered-block text-center">
    <v-col col="12" md="12">
      <h3>Transfer NFT</h3>
    </v-col>
    <v-col col="12" md="12">
      <v-text-field
          label="Token ID"
          v-model="tokenId"
      ></v-text-field>
    </v-col>
    <v-col col="12" md="12">
      <v-text-field
          label="Near Account"
          v-model="accountId"
      ></v-text-field>
      <v-btn @click="transferNFT">Transfer</v-btn>
    </v-col>
  </v-row>
</template>

<script>

import Big from 'big.js';

export default {
  name: "Transfer",

  props: ['contract'],

  data() {
    return {
      tokenId: null,
      accountId: null,
    }
  },

  methods: {
    async transferNFT() {
     if (this.accountId && this.accountId) {
       const BOATLOAD_OF_GAS = Big(3).times(10 ** 13).toFixed();

       await this.contract.nft_transfer(
           {
             "receiver_id": this.accountId,
             "token_id": this.tokenId,
             "memo": "Go Team :"
           },
           BOATLOAD_OF_GAS,
           1,
       ).then(res => {
         console.log(res)
       })
     }
    },
  }
}
</script>

<style scoped>

</style>