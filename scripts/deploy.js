const { ethers, run, network } = require('hardhat')

const main = async () => {

  // Deploy
  const SimpleStorageFactory = await ethers.getContractFactory('SimpleStorage')
  console.log('Deploying contract...')
  const simpleStorage = await SimpleStorageFactory.deploy();
  await simpleStorage.deployed()
  console.log(`Deploy contract to: ${simpleStorage.address}`)


  // Verify on EtherScan
  if (network.config.chainId === 5 && process.env.ETHERSCAN_API_KEY) {
    console.log("Waiting for block confirmations...")
    await simpleStorage.deployTransaction.wait(6)
    await verify(simpleStorage.address, [])
  }

  // Interact
  const currentValue = await simpleStorage.retrieve()
  console.log(`current value is ${currentValue}`)

  const transactionResponse = await simpleStorage.store('7')
  await transactionResponse.wait(1)
  const updatedValue = await simpleStorage.retrieve()
  console.log(`Updated value is ${updatedValue}`)
}

const verify = async (contractAddress, args) => {
  console.log("verifying contract...");
  try {
    await run('verify:verify', {
      address: contractAddress,
      constructorARguments: args
    })
  }
  catch (error) {
    if (error.message.toLowerCase().includes('already verified')) {
      console.log('Already Verified')
      return
    }
    console.log(error)
  }
  console.log('Verified Successfully')
}

main()
  .then(() => process.exit(0))
  .catch((error) =>
    console.error(error)
  )