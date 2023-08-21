const { ethers } = require("ethers");

const provider = new ethers.providers.AlchemyProvider(
  "goerli",
  "4r5jiJycaq-CoV8_cLXyJ_uCoyEqRsXP"
);
const wallet = new ethers.Wallet(
  "0x7de86b837c030dd022930e8aa26102140801e370267c39633e9a27a74d0dca6f",
  provider
);
const contractAddress = "0xec4d3a8499d354b8bbab78d136db31c07537c25b";
const abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "_from",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "_value",
        type: "uint256",
      },
    ],
    name: "testMain",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "_from",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "_value",
        type: "uint256",
      },
    ],
    name: "testevent1",
    type: "event",
  },
  {
    inputs: [
      { internalType: "address[]", name: "addressList", type: "address[]" },
    ],
    name: "mint",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];
const contract = new ethers.Contract(contractAddress, abi, wallet);

contract.on("testMain", (message) => {
  console.log("Received testMain event:", message);
});

contract.on("testevent1", (value) => {
  console.log("Received testevent1 event:", value.toString());
});
