# Testnet Crowdfunding

A testnet crowdfunding decentralized web application that helps users to contribute ether to the creator along with a memo.

## Features

- Contribute Ether to a project
- Add a memo with your contribution
- View all contributions
- Auto addition of holesky testnet to Metamask

## Prerequisites

- Node.js
- Hardhat
- Metamask

## Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/ashwincs12/Testnet-Crowdfunding.git
    cd Testnet-Crowdfunding
    ```

2. Install dependencies:
    ```sh
    npm install
    cd client
    npm install
    ```

3. Compile the smart contracts:
    ```sh
    npx hardhat compile
    ```

4. Deploy the smart contracts:
    ```sh
    npx hardhat run scripts/deploy.js --network holesky
    ```

## Running the Application

1. Start the local development server:
    ```sh
    cd client
    npm start
    ```

2. Open your browser and navigate to `http://localhost:3000`

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request.

