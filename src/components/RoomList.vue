<template>
  <n-data-table
    :columns="columns"
    :data="data"
    :pagination="pagination"
    :bordered="true"
    class="bg:white p:16px border-radius:9px"
  />
</template>

<script>
  import { NButton, useMessage } from "naive-ui";
  import { h, defineComponent } from "vue";

  const createColumns = ({ play }) => {
    return [
      {
        title: "Room Id",
        key: "RoomId",
      },
      {
        title: "Player",
        key: "player",
      },
      {
        title: "Status",
        key: "status",
      },
      {
        title: "Action",
        key: "actions",
        render(row) {
          return h(
            NButton,
            {
              strong: true,
              tertiary: true,
              size: "small",
              onClick: () => play(row),
            },
            { default: () => "Play" }
          );
        },
      },
    ];
  };

  const data = [
    { RoomId: 1, player: "Logic", status: "Preparing" },
    { RoomId: 2, player: "NotLogic", status: "Playing" },
    { RoomId: 3, player: "RealLogic", status: "Playing" },
    { RoomId: 4, player: "RealLogic", status: "Playing" },
    { RoomId: 5, player: "RealLogic", status: "Playing" },
    { RoomId: 6, player: "RealLogic", status: "Playing" },
    { RoomId: 7, player: "RealLogic", status: "Playing" },
    { RoomId: 9, player: "RealLogic", status: "Playing" },
    { RoomId: 10, player: "RealLogic", status: "Playing" },
    { RoomId: 11, player: "RealLogic", status: "Playing" },
    { RoomId: 12, player: "RealLogic", status: "Playing" },
    { RoomId: 13, player: "RealLogic", status: "Playing" },
    { RoomId: 14, player: "RealLogic", status: "Playing" },
    { RoomId: 15, player: "RealLogic", status: "Playing" },
    { RoomId: 16, player: "RealLogic", status: "Playing" },
    { RoomId: 17, player: "RealLogic", status: "Playing" },
    { RoomId: 18, player: "RealLogic", status: "Playing" },
    { RoomId: 19, player: "RealLogic", status: "Playing" },
    { RoomId: 21, player: "RealLogic", status: "Playing" },
    { RoomId: 22, player: "RealLogic", status: "Playing" },
    { RoomId: 23, player: "RealLogic", status: "Playing" },
    { RoomId: 24, player: "RealLogic", status: "Playing" },
    { RoomId: 25, player: "RealLogic", status: "Playing" },
  ];

  export default defineComponent({
    setup() {
      const paginationReactive = reactive({
        page: 1,
        pageSize: 10,
        showSizePicker: true,
        pageSizes: [3, 5, 7, 10],
        onChange: (page) => {
          paginationReactive.page = page;
        },
        onUpdatePageSize: (pageSize) => {
          paginationReactive.pageSize = pageSize;
          paginationReactive.page = 1;
        },
      });
      const message = useMessage();
      return {
        data,
        columns: createColumns({
          play(row) {
            message.info(`Room ${row.RoomId} is playing`);
          },
        }),
        pagination: paginationReactive,
      };
    },
  });
</script>
