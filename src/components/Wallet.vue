<template>
  <v-container>
    <v-row class="text-center">
      <v-col col="12" md="12">
        <h2>{{ currentUser.accountId }}</h2>
        <h3>
          <del>{{ covertBalance(currentUser.balance) }}</del>
          NEAR
        </h3>
        <h3>{{ covertBalance(currentUserDoorsBalance) }} DOORS</h3>
      </v-col>
      <v-col col="12" md="12">
        <h4>Transfer:</h4>
        <v-text-field
            class="transfer-input"
            label="Account ID"
            v-model="receiverAccountId"
        ></v-text-field>
        <v-text-field
            class="transfer-input"
            label="DOORS"
            type="number"
            v-model="doorsToTransfer"
        ></v-text-field>
        <br>
        <v-btn @click="transfer">Send</v-btn>
      </v-col>
      <v-col>
        <v-chip>
          {{ receiverAccountId }}:
          <b>{{ covertBalance(receiverDoorsBalance) }} DOORS</b>
        </v-chip>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>

import Big from 'big.js';

export default {
  name: "Wallet",

  props: ['contract', 'currentUser'],

  data() {
    return {
      receiverAccountId: 'door-customer.testnet',
      receiverDoorsBalance: 0,

      currentUserDoorsBalance: 0,
      doorsToTransfer: 0,
    }
  },

  watch: {
    receiverAccountId() {
      this.getReceiverBalance(this.receiverAccountId);
    }
  },

  mounted() {
    this.getCurrentUserBalance();
    this.getReceiverBalance(this.receiverAccountId);
  },

  methods: {
    getCurrentUserBalance() {
      this.contract.ft_balance_of(
          {"account_id": this.currentUser.accountId},
      ).then(res => {
        this.currentUserDoorsBalance = res
      })
    },
    getReceiverBalance() {
      this.contract.ft_balance_of(
          {"account_id": this.receiverAccountId},
      ).then(res => {
        this.receiverDoorsBalance = res
      })
    },
    async transfer() {
      const BOATLOAD_OF_GAS = Big(3).times(10 ** 13).toFixed();

      await this.contract.ft_transfer(
          {
            "receiver_id": this.receiverAccountId,
            "amount": (this.doorsToTransfer * 100000000).toFixed(),
          },
          BOATLOAD_OF_GAS,
          1
      ).then(res => {
        console.log(res)
      })
    },
    covertBalance(balance) {
      return balance / 100000000;
    }
  }

}

</script>

<style>
.transfer-input {
  width: 80%;
  margin: 10px auto;
}
</style>