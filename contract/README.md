Fungible Token (FT)
===================

To build run:

    npm run build:contract

Example implementation of a [Fungible Token] contract which uses [near-contract-standards].

### Standard deploy
    near login

To make this tutorial easier to copy/paste, we're going to set an environment variable for your account id. In the below command, replace `MY_ACCOUNT_NAME` with the account name you just logged in with, including the `.near`:

    ID=MY_ACCOUNT_NAME

You can tell if the environment variable is set correctly if your command line prints the account name after this command:

    echo $ID

Now we can deploy the compiled contract in this example to your account:

    near deploy --wasmFile res/fungible_token.wasm --accountId $ID

OR

    npm run deploy:contract

FT contract should be initialized before usage. You can read more about metadata at ['nomicon.io'](https://nomicon.io/Standards/FungibleToken/Metadata.html#reference-level-explanation). Modify the parameters and create a token:

    near call $ID new '{"owner_id": "'$ID'", "total_supply": "1000000000000000", "metadata": { "spec": "ft-1.0.0", "name": "Example Token Name", "symbol": "EXLT", "decimals": 8 }}' --accountId $ID

Get metadata:

    near view $ID ft_metadata


Transfer Example
---------------

Let's set up an account to transfer some tokens to. These account will be a sub-account of the NEAR account you logged in with.

    near create-account bob.$ID --masterAccount $ID --initialBalance 1

Add storage deposit for Bob's account:

    near call $ID storage_deposit '' --accountId bob.$ID --amount 0.00125


Check balance of Bob's account, it should be `0` for now:

    near view $ID ft_balance_of '{"account_id": "'bob.$ID'"}'

Transfer tokens to Bob from the contract that minted these fungible tokens, exactly 1 yoctoNEAR of deposit should be attached:

    near call $ID ft_transfer '{"receiver_id": "'bob.$ID'", "amount": "19"}' --accountId $ID --amount 0.000000000000000000000001


Check the balance of Bob again with the command from before and it will now return `19`.