<template>
  <v-container>
    <v-row class="text-center">
      <v-col col="12" md="12">
        <h3>Minted NFTs:</h3>
      </v-col>

      <v-col col="12" md="4" v-for="token in tokens">
        <figure>
          <img :src="token.metadata.media" height="120px" width="100%">
          <figcaption>ID: <b>{{ token.token_id }}</b></figcaption>
          <figcaption>
            <small>Owner:</small>
            <b><small>{{ token.owner_id }}</small></b>
          </figcaption>
        </figure>
      </v-col>

    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "NFTsList",

  props: ['contract'],

  data() {
    return {
      tokens: [],
    }
  },

  mounted() {
    this.getAllTokens();
  },

  methods: {
    getAllTokens() {
      this.contract.nft_tokens().then(res => {
        this.tokens = res.reverse();
      })
    }
  }
}
</script>

<style scoped>

</style>