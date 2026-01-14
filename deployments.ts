import { viem } from 'hardhat';

import Artifact  from '../artifacts/contracts/simple-storage.sol/SimpleStorage.json';
import { error } from 'node:console';

async function main() {
    // wallet client (signer)
    const [walletClient] = await viem.getWalletClients();

    // public client (read only)
    const publicClient = await viem.getPublicClient();

    console.log("Deploying with account:", walletClient.account.address);

    // Deploy contract
    const hash = await walletClient.deployContract({
        abi: Artifact.abi,
        bytecode: Artifact.bytecode as '0x$(string)',
        args: [],
    });

    console.log("Deployment tx hash:", hash);

    //wait for confirmation
    const recipt = await publicClient.waitForTransactionReceipt({
        hash
    });

    console.log("✅ SimpleStorage deployed at:", recipt.contractAddress);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
    
 });
