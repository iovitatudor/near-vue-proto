<template>
  <v-container>
    <v-row class="text-center"
           align="center"
           justify="center">
      <v-col col="12" md="6">
        <h3>Simple Transaction</h3>
        <v-text-field
            class="transfer-input"
            label="To (Account ID)"
            v-model="accountId"
        ></v-text-field>
        <v-text-field
            class="transfer-input"
            label="Amount (NEAR)"
            type="number"
            v-model="amount"
        ></v-text-field>
        <p v-if="alert">
          {{ alert }}
        </p>
        <v-btn @click="transfer">Transfer</v-btn>
        <p>
          * 50% of the amount will be sent to the account of the smart-contract ({{ contract.contractId }})
        </p>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>

import Big from 'big.js';

export default {
  name: "Transaction",

  props: ['contract', 'currentUser'],

  data() {
    return {
      accountId: null,
      amount: null,
      alert: null
    }
  },

  methods: {
    transfer() {
      this.alert = null;
      if (this.accountId && this.amount) {
        const BOATLOAD_OF_GAS = Big(3).times(10 ** 13).toFixed();

        this.contract.transfer_money(
            {"account_id": this.accountId, "owner_id": this.contract.contractId, "amount": 1.5},
            BOATLOAD_OF_GAS,
            Big(this.amount || '0').times(10 ** 24).toFixed()
        ).then(res => {
          console.log(res)
        })
      } else {
        this.alert = "Amount and Account Id is required!";
      }
    }
  }
}
</script>

<style scoped>
p {
  margin-top: 30px;
  color: #e74c3c;
  font-size: 12px;
}
</style>