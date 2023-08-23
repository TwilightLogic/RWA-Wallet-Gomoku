<script setup>
  import { useClipboard } from "@vueuse/core";
  import { ethers } from "ethers";
  import { ref, onMounted } from "vue";

  const accountAddress = ref(null);
  const addressFormat = ref(null);
  const { text, copy, copied, isSupported } = useClipboard({ accountAddress });

  const checkIfWalletIsConnected = async () => {
    try {
      const { ethereum } = window;

      if (ethereum) {
        console.log(`metamask is available`);
      } else {
        console.log(`please try again`);
      }

      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
        params: [],
      });

      if (accounts.length !== 0) {
        const account = accounts[0];
        accountAddress.value = account;
        addressFormat.value = formatString(accountAddress.value);
        console.log(addressFormat.value);
        console.log(`found account with address`, accountAddress.value);
      } else {
        console.log(`no authorized account found`);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const formatString = (inputString) => {
    const frontPart = inputString.substring(0, 6);
    const backPart = inputString.substring(inputString.length - 3);

    return `${frontPart}...${backPart}`;
  };

  checkIfWalletIsConnected();
</script>

<template>
  <div
    class="height:3rem width:100% d:flex align-items:center justify-content:center mt:1.5rem rel"
  >
    <div class="abs top:25% left:3%">
      <button
        class="f:gray-80 font:medium f:18 f:gray-90:hover"
        @click="copy(accountAddress)"
      >
        {{ addressFormat }}
      </button>
    </div>
    <h1 class="font:heavy font:italic d:inline-block font-size:3rem f:white">
      Gomoku Now!
    </h1>
    <div class="abs top:0% right:3%">
      <button
        class="f:white bg:blue-50 bg:blue-60:hover f:16 rounded p:15 font:semibold ~duration:100ms:hover"
      >
        Connect Wallet
      </button>
    </div>
  </div>
</template>
