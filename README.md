## Steps to run the code locally

1. Clone the Arbitrum token bridge repository from Github onto your local machine

   ```bash
   $ git clone https://github.com/umershaikh123/octopus-chain.git
   ```

2. Use the Node version as per project settings to avoid any errors before project installation.

   ```bash
   $ nvm use
   ```

3. Install dependencies in all packages using yarn.

   ```bash
   $ yarn
   ```

4. Set env vars:

   1. Copy the existing env.local.sample file present.

      ```bash
      $ cp ./packages/octopus-bridge-ui/.env.local.sample  ./packages/octopus-bridge-ui/.env
      ```

   2. In `.env` created, add `NEXT_PUBLIC_INFURA_KEY=my-infura-key`

   3. Set `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID` to your WalletConnect project ID. You can create a new project on the [WalletConnect dashboard](https://cloud.walletconnect.com/app).

   4. For custom urls, set optional vars:

   - `NEXT_PUBLIC_ETHEREUM_RPC_URL=my-eth-node`
   - `NEXT_PUBLIC_SEPOLIA_RPC_URL=my-sepolia-node`
     (see [.env.sample](./packages/octopus-bridge-ui/.env.sample))
     If no custom URL is provided, Infura will be used by default.

5. Build the project and internal packages

   ```bash
   $ yarn build
   ```

6. Finally, running the project

   1. (back in root dir:)

      ```bash
      $ yarn dev
      ```

   2. Visit `http://localhost:3000/`

<br />

---

<br />
