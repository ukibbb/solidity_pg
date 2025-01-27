"use client";
import { useEffect, useState } from "react";

import { DataTable } from "../data-table";
import upcoming from "../../lib/api/data/upcoming.json";
import { columns } from "./column-definition";
import { GameDefinition } from "./types";

const GamesTable = () => {
  const data: GameDefinition[] = upcoming.results.map((game) => {
    return {
      gambleContract: undefined,
      game: {
        home: game.home.name,
        away: game.away.name,
        timestamp: Date.now() + 1,
        id: Number(game.id),
      },
    };
  });

  return (
    <section>
      Games available
      <DataTable columns={columns} data={data} />
    </section>
  );
};

export default GamesTable;
