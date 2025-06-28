const StellarSdk = require('stellar-sdk');
const dotenv = require('dotenv');
dotenv.config();

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    // Get amount from query string
    const { amount } = req.query;
    const distributionAmount = parseFloat(amount);

    // Validate amount
    if (isNaN(distributionAmount) || distributionAmount <= 0) {
      return res.status(400).json({ message: 'Invalid amount' });
    }

    // MAINNET CONNECTION!
    const server = new StellarSdk.Server('https://horizon.stellar.org'); // CHANGED FOR MAINNET
    const sourceSecret = process.env.PRIVATE_KEY;
    if (!sourceSecret) {
      return res.status(500).json({ message: 'Missing PRIVATE_KEY in environment' });
    }
    const sourceKeys = StellarSdk.Keypair.fromSecret(sourceSecret);

    // List of recipients and their royalty percentages
    const recipients = [
      { publicKey: process.env.RPTLN_WALLET, percent: 21.25 },
      { publicKey: process.env.CANIBUS_WALLET, percent: 21.25 },
      { publicKey: process.env.PHAZE_WALLET, percent: 21.25 },
      { publicKey: process.env.SHAN_WALLET, percent: 21.25 },
      { publicKey: process.env.COREPHORE_WALLET, percent: 15.0 }
    ];

    // Safety: Check that all wallets are defined
    for (const r of recipients) {
      if (!r.publicKey) {
        return res.status(500).json({ message: `Missing environment variable for a recipient wallet.` });
      }
    }

    // Load sending account and fetch base fee
    const account = await server.loadAccount(sourceKeys.publicKey());
    const fee = await server.fetchBaseFee();

    // MAINNET NETWORK PASSPHRASE!
    let builder = new StellarSdk.TransactionBuilder(account, {
      fee,
      networkPassphrase: StellarSdk.Networks.PUBLIC, // CHANGED FOR MAINNET
    });

    for (const recipient of recipients) {
      const sendAmount = ((distributionAmount * recipient.percent) / 100).toFixed(7);
      builder = builder.addOperation(
        StellarSdk.Operation.payment({
          destination: recipient.publicKey,
          asset: StellarSdk.Asset.native(),
          amount: sendAmount,
        })
      );
    }

    // Finalize and sign
    const transaction = builder.setTimeout(180).build();
    transaction.sign(sourceKeys);

    // Submit transaction
    const result = await server.submitTransaction(transaction);

    res.status(200).json({
      message: 'Transaction successful',
      transactionHash: result.hash,
    });
  } catch (error) {
    // Print the full error data from Stellar, not just status code
    console.error('Transaction error:', error?.response?.data || error);
    res.status(500).json({
      message: 'Transaction failed',
      error: error?.response?.data || error.toString(),
    });
  }
}
