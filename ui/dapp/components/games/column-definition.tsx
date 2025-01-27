"use client";
import { ColumnDef } from "@tanstack/react-table";
import { GameDefinition } from "./types";
import GambleContract from "./GambleContract";
import GameStatus from "./GameStatus";
import CreateGame from "./CreateGame";
import GameInfo from "./GameInfo";
import PerformGamble from "./PerformGamble";

import { getStatus } from "./gamesUtils";

export const columns: ColumnDef<GameDefinition>[] = [
  {
    header: "id",
    accessorKey: "game.id",
  },
  {
    header: "Gamble Contract",
    cell: ({ row }) => {
      if (!row.original.gambleContract) {
        return "No gamble contract started...";
      }
      return <GambleContract address={row.original.gambleContract} />;
    },
  },
  {
    header: "Home",
    accessorKey: "game.home",
  },
  {
    header: "Away",
    accessorKey: "game.away",
  },
  {
    header: "Timestamp",
    accessorKey: "game.timestamp",
  },
  {
    accessorKey: "status",
    header: "Game Status",
    cell: ({ row }) => {
      return <GameStatus address={row.original.gambleContract} />;
    },
  },
  {
    header: "Actions",
    cell: ({ row }) => {
      const status = getStatus(row.original.game.status);
      if (status === "Created") {
        return <PerformGamble />;
      }
      return (
        <CreateGame
          address={row.original.gambleContract}
          game={row.original.game}
        />
      );
    },
  },
  {
    header: "Game Stats",
    cell: ({ row }) => {
      return <GameInfo address={row.original.gambleContract} />;
    },
  },
];
