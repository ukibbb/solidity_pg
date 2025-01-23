hardhat:
	npx hardhat

compile:
	npx hardhat compile

clean:
	npx hardhat clean

node:
	npx hardhat node --hostname 127.0.0.1 --port 8545

verify:
	npx hardhat verify

test:
	npx hardhat test

deploy:
	npx hardhat ignition deploy ./ignition/modules/Lock.ts --network localhost
