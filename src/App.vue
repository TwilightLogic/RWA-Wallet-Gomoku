<script setup lang="ts">
  import { reactive, ref } from "vue";
  import Header from "./components/Header.vue";
  import Game from "./components/Game.vue";
  import { BoardState, cols } from "./gobang";
  import { ws } from "./ws";

  const logs = reactive<{ x: number; y: number; color: BoardState }[]>([]);
  const logs_elm = ref<HTMLDivElement | null>();

  const key = ref(Date.now());
  const game = ref<typeof Game>();

  function log({ x, y, color }: { x: number; y: number; color: BoardState }) {
    logs.push({ x, y, color });
    setTimeout(
      () => logs_elm.value?.scrollTo({ top: -999_999_999, behavior: "smooth" }),
      10
    );
  }

  function say(msg: string) {
    setTimeout(() => alert(msg), 10);
  }
</script>

<template>
  <Header />
  <div class="height:calc(100%-3rem) width:100% d:flex flex:col flex:row@md">
    <div
      class="width:100vmin height:100vmin width:calc(100vmin-3rem)@md height:calc(100vmin-3rem)@md d:flex justify-content:center align-items:center"
    >
      <div class="width:90% height:90%">
        <Game
          ref="game"
          :key="key"
          @set="
            ({ stone }) => {
              log(stone);
            }
          "
          @over="
            ({ winner }) => {
              if (ws === null) {
                say(
                  `Game over. ${
                    winner.color === BoardState.White ? 'White' : 'Black'
                  } wins!`
                );
              }
            }
          "
        />
      </div>
    </div>
    <div
      class="flex:1 height:calc(100%-100vmin) height:calc(100vmin-3rem)@md d:flex justify-content:center align-items:center"
    >
      <div
        class="d:flex flex-direction:col width:90% height:90% p:12 border:1px;solid;blue-60 r:12"
      >
        <h2 class="f:blue-60">Your Steps</h2>
        <div
          class="mt:16 flex-1 overflow-y:auto d:flex flex-direction:col-reverse"
          ref="logs_elm"
        >
          <div
            v-for="(log, i) in logs"
            :key="i"
            class="my:8 font-family:monospace color:gray-25"
            @mouseenter="
              game && (game.ui[log.y * cols + log.x].selected = true)
            "
            @mouseleave="
              game && (game.ui[log.y * cols + log.x].selected = false)
            "
          >
            {{ i + 1 }}.
            {{ log.color === BoardState.Black ? "●" : "○" }}
            <span class="font:bold">{{ log.x + 1 }},{{ log.y + 1 }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
  * {
    position: relative;
  }

  html,
  body,
  #app {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    background: #fafafa;
  }
</style>
