Non Fungible Token (NFT)
===================

To build run:

    npm run build:contract

Example implementation of a [Non Fungible Token] contract which uses [near-contract-standards].

### Standard deploy
    near login

To make this tutorial easier to copy/paste, we're going to set an environment variable for your account id. In the below command, replace `MY_ACCOUNT_NAME` with the account name you just logged in with, including the `.near`:

    NFT_CONTRACT_ID=MY_ACCOUNT_NAME
    MAIN_ACCOUNT=your-account.testnet

You can tell if the environment variable is set correctly if your command line prints the account name after this command:

    echo $NFT_CONTRACT_ID
    echo $MAIN_ACCOUNT

Now we can deploy the compiled contract in this example to your account:

    near deploy --wasmFile ../out/main.wasm --accountId $NFT_CONTRACT_ID

OR

    npm run deploy:contract

Initialize Your Contract

    near call $NFT_CONTRACT_ID new_default_meta '{"owner_id": "'$NFT_CONTRACT_ID'"}' --accountId $NFT_CONTRACT_ID

View Contracts Meta Data
    
    near view $NFT_CONTRACT_ID nft_metadata

Minting Token

    near call $NFT_CONTRACT_ID nft_mint '{"token_id": "token-1", "metadata": {"title": "My Non Fungible Team Token", "description": "The Team Most Certainly Goes :)", "media": "https://bafybeiftczwrtyr3k7a2k4vutd3amkwsmaqyhrdzlhvpt33dyjivufqusq.ipfs.dweb.link/goteam-gif.gif"}, "receiver_id": "'$MAIN_ACCOUNT'"}' --accountId $MAIN_ACCOUNT --amount 0.1

View NFT Information

    near view $NFT_CONTRACT_ID nft_token '{"token_id": "token-1"}'


Transferring NFTs

    near call $NFT_CONTRACT_ID nft_transfer '{"receiver_id": "$MAIN_ACCOUNT_2", "token_id": "token-1", "memo": "Go Team :)"}' --accountId $MAIN_ACCOUNT --depositYocto 1