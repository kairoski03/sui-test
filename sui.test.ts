import {Connection, Ed25519Keypair, JsonRpcProvider,} from '@mysten/sui.js';

const CHAIN_ID = 'testnet'
const KEY_STORE = ''; // AFMKGaJgwBPOzYIkg... ( cat $HOME/.sui/sui_config/sui.keystore )

describe('sui test', () => {

  it('pk', async () => {
    const keystoreBuf = Buffer.from(KEY_STORE, 'base64'); // this UInt8Array

    const privateKeyBuf = keystoreBuf.slice(1);
    const keypair = Ed25519Keypair.fromSecretKey(Uint8Array.from(privateKeyBuf));
    const publicKeyBuf = Buffer.from(keypair.getPublicKey().toBytes());

    console.log(`
      private key: 0x${privateKeyBuf.toString('hex')}
      public key : 0x${publicKeyBuf.toString('hex')}
      address    : ${keypair.getPublicKey().toSuiAddress()}
    `)
  });

  it('getObject', async () => {
    jest.setTimeout(30_000);
    const provider = await getProvider();
    const suiObjectResponse = await provider.getObject({
      id: '0xfa493d3ad837c7a1673fb8720aceacd1a4a10b16100506cb050025dfd7e94e98',
      options: {
        showType: true,
        showContent: true,
        showBcs: true,
        showOwner: true,
        showPreviousTransaction: true,
        showStorageRebate: true,
        showDisplay: true,
      },
    });
    console.log(json(suiObjectResponse));
  });

});

function getProvider(): JsonRpcProvider {
  return new JsonRpcProvider(
    new Connection({
      fullnode: `https://fullnode.${CHAIN_ID}.sui.io:443/`,
      faucet: `https://faucet.${CHAIN_ID}.sui.io/gas`,
    }),
  );
}

function json(unknown: unknown) {
  return JSON.stringify(unknown, null, 2);
}