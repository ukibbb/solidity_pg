"use client"
const HowItWorks = () => {
  return (
    <div>
      $BET is native token of the platform. 
      It is used for betting and staking.
      You can place a bet on any event by using $BET.

      If you want to bet a $BET on your favourite event.

      1. You need to have $BET in your wallet.
      2. If Event isn't created by someone else you need to create an event. Creating event costs only gas fees for person who creates it.
      3. Gas fees cost always returns to the person who creates the event with winners withdraws.
      5. Withdraw can be done by winners without fee.

      4. After event is created. Basket also are created for every competitor in the event.
      4. Every basket has competitor assinged to it.
      5. You can place a bet on any competitor by using $BET.
      6. You can place bet on multiple competitors.
      7. After event is finished. Winner is declared.
      8. Winners are taking loosers $BET.
      

      How determine who wins is looking like.
      1. We have money in every basket.
      2. Event is finished winner (basket) is known.
      3. Identify a winner basket.
      4. Sum loosers money.
      5. Determine % of basket person bet. 
      6. Multiply % of basket person bet with loosers money.
      7. Winner is taking this money.
      8. Loosers are losing money.



      przygotowac endpoint z informacja o rozstrzgniecu stworzonego eventu.
      potrzebuje oracle

      kiedy smartkontrakt powinien sprawdzic kiedy event sie skonczyl?

      12h po zakonczeniu eventu czyli commonceTime + officialMatchTime + 12h

      Withdraw is oppen for everyone. Kto chce na to gas fee. 



    </div>
    
  )

}
