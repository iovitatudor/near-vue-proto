<template>
  <v-row class="bordered-block">
    <v-col col="12" md="12" class="text-center">
      <h3>Mint NFT</h3>
    </v-col>
    <v-col col="12" md="12" class="text-center">
      <v-text-field
          label="Image Link"
          v-model="nftImage"
      ></v-text-field>

      <div>
        <img v-if="nftImage"
             :src="nftImage"
             height="300px">
      </div>

      <v-btn @click="mintNFT">Mint</v-btn>
    </v-col>
  </v-row>
</template>

<script>

import Big from 'big.js';

export default {
  name: "Mint",

  props: ['contract', 'currentUser'],

  data() {
    return {
      nftImage: null,
      currentTokenId: null,
    }
  },

  mounted() {
    this.currentTokenId = Math.floor(Math.random() * (9000 - 1 + 1)) + 1;
  },

  methods: {
    mintNFT() {
      if (this.nftImage && this.currentTokenId) {
        const BOATLOAD_OF_GAS = Big(3).times(10 ** 13).toFixed();
        this.contract.nft_mint(
            {
              "token_id": "token" + this.currentTokenId,
              "metadata": {
                "title": "Title: token" + this.currentTokenId,
                "description": "Description: token" + this.currentTokenId,
                "media": this.nftImage
              },
              "receiver_id": this.currentUser.accountId
            },
            BOATLOAD_OF_GAS,
            Big(0.5 || '0').times(10 ** 24).toFixed()
        ).then(res => {
          console.log(res)
        })
      }
    }
  }

}
</script>

<style scoped>

</style>