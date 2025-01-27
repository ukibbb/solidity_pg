"use client";
import { columns, Payment } from "./columns";
import { DataTable } from "./data-table";
import { inplay, upcoming } from "../../../lib";

type InplayResponse = {
  success: number;
  pager: Pager;
};

type Pager = { page: number; per_page: number; total: number };

type Event = {
  away: object;
  home: object;
};

export default function InplayPage() {
  console.log("inplay", inplay);
  console.log("upcoming", upcoming);

  const pager: Pager = inplay.pager;

  return (
    <div className="container mx-auto py-10">
      <section>
        Biggest Buskets. Upcoming matches. Ongoing bets. Events created. Biggest
        winners.
      </section>
      <DataTable data={inplay.results} columns={columns} />
    </div>
  );
}
