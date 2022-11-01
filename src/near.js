import getConfig from './config.js';
import * as nearAPI from 'near-api-js';

export async function initContract() {
    const nearConfig = getConfig(process.env.NEAR_ENV || 'testnet');

    const keyStore = new nearAPI.keyStores.BrowserLocalStorageKeyStore();

    const near = await nearAPI.connect({keyStore, ...nearConfig});

    const walletConnection = new nearAPI.WalletConnection(near);

    let currentUser;
    if (walletConnection.getAccountId()) {
        currentUser = {
            accountId: walletConnection.getAccountId(),
            balance: (await walletConnection.account().state()).amount,
        };
    }

    const contract = await new nearAPI.Contract(
        walletConnection.account(),
        nearConfig.contractName,
        {
            viewMethods: ['ft_balance_of'],
            changeMethods: ['ft_transfer'],
            sender: walletConnection.getAccountId(),
        }
    );

    return {contract, currentUser, nearConfig, walletConnection};
}