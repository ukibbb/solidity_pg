export const getStatus = (status?: number) => {
    if (typeof status === "undefined") {
      return "This game doesn't exist.";
    }
    if (!(typeof status === "number")) {
      throw new Error("Status has to be a number between 0 to 3.");
    }
    if (status > 3) {
      throw new Error("Wired Status");
    }
    if (status < -1) {
      throw new Error("Wired Status");
    }
    return {
      0: "Created",
      1: "WaitingForResults",
      2: "Resolved",
      3: "GambleFailed",
    }[status];
  };