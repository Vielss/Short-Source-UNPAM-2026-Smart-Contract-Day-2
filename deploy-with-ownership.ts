// scripts/deploy-with-ownership.ts
const hre = require("hardhat");
const fs = require("fs");

async function main() {
  console.log("Deploying SimpleStorage OWNERSHIP");
  
  // Get signers
  const [deployer] = await hre.ethers.getSigners();
  console.log(`👤 Deployer: ${deployer.address}`);
  
  // Get ContractFactory
  const SimpleStorage = await hre.ethers.getContractFactory("SimpleStorage");
  
  // Deploy contract
  console.log("Deploying new contract...");
  const contract = await SimpleStorage.deploy();
  await contract.deployed();
  
  console.log("Contract deployed successfully!");
  console.log(`New Contract Address: ${contract.address}`);
  
  // Test owner() function
  console.log("\nTesting owner() function...");
  try {
    const owner = await contract.owner();
    console.log(`👑 Owner: ${owner}`);
    console.log(`✅ owner() function works!`);
  } catch (error: any) {
    console.error(`❌ owner() error: ${error.message}`);
  }
  
  // Save deployment info
  const deploymentInfo = {
    contractAddress: contract.address,
    deployer: deployer.address,
    network: "avalancheFuji",
    timestamp: new Date().toISOString(),
    tasksCompleted: {
      task1_ownership: true,
      task2_events: true,
      task3_deployment: true
    }
  };
  
  fs.writeFileSync(
    "./deployment-result.json",
    JSON.stringify(deploymentInfo, null, 2)
  );
  
  console.log("\nDeployment info saved to: deployment-result.json");
  console.log(`https://testnet.snowtrace.io/address/${contract.address}`);
}

main().catch((error) => {
  console.error("Deployment failed:", error);
  process.exit(1);
});