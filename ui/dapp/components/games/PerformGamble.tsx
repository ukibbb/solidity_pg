"use client";
import { Button } from "../ui/button";
import {
  useWriteContract,
  useWaitForTransactionReceipt,
  type BaseError,
} from "wagmi";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "../ui/separator";
import { Input } from "../ui/input";

const PerformGamble = ({}) => {
  const { data: hash, isPending, writeContract, error } = useWriteContract();
  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    });
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };
  // choose side
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Place a bet!</Button>
      </DialogTrigger>
      <DialogContent className="min-w-fit">
        <section className="flex justify-evenly min-h-fit	">
          <div className="text-center">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Fugit
            earum obcaecati atque ipsam animi alias aperiam rerum, vel numquam
            nam inventore quam delectus explicabo quae. Inventore itaque quam
            incidunt quod.
            <div className="flex w-full max-w-sm items-center space-x-2">
              <Input type="number" placeholder="" />
              <Button type="submit">Place your bet on </Button>
            </div>
          </div>
          <Separator orientation="vertical" />
          <div className="text-center">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos
            ab odit, aut, at obcaecati, nesciunt adipisci quia libero quae
            aperiam expedita modi nemo quaerat asperiores quos soluta deleniti
            dicta iusto.
            <div className="flex w-full max-w-sm items-center space-x-2">
              <Input type="email" placeholder="Email" />
              <Button type="submit">Place your bet on </Button>
            </div>
          </div>
        </section>
        <Separator orientation="horizontal" />
        <DialogFooter>
          <form onSubmit={onSubmit}>
            <Button disabled={isPending} type="submit">
              {isPending ? "Confirming..." : "Lets Gamble!"}
            </Button>
          </form>
        </DialogFooter>
        {isConfirming && <div>Waiting for confirmation...</div>}
        {isConfirmed && <div>Transaction confirmed.</div>}
        {error && (
          <div>Error: {(error as BaseError).shortMessage || error.message}</div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default PerformGamble;
