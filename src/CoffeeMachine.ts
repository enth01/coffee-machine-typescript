import { Drink } from "./Drink";

export class CoffeeMachine {
  private orderCount: number = 0;

  serve(drink: Drink, moneyInserted: number, loyaltyCard: boolean, currentHour: number): string {
    let cost = drink.basePrice;

    // Size
    if (drink.size === "medium") {
      cost += 0.5;
    } else if (drink.size === "large") {
      cost += 1;
    }

    // Milk
    if (drink.milk) {
      cost += 0.2;
    }

    // Sugar
    if (drink.sugar > 5) {
      return "Error: too much sugar";
    } else if (drink.sugar > 2) {
      cost += (drink.sugar - 2) * 0.1;
    }

    // Happy hours
    if (currentHour >= 15 && currentHour < 17) {
      cost = cost * 0.8;
    }

    // Loyalty card
    this.orderCount++;
    if (loyaltyCard && this.orderCount % 5 === 0 && drink.size !== "large") {
      cost = 0;
    }

    if (cost < 0) {
      return "Error: invalid price";
    }

    if (moneyInserted < Number(cost.toFixed(2))) {
      console.log(cost);
      return "Not enough money";
    } else if (moneyInserted > cost) {
      let change = moneyInserted - cost;
      return `Serving ${drink.name} (${drink.size}) with change ${change.toFixed(2)}`;
    } else {
      return `Serving ${drink.name} (${drink.size})`;
    }
  }
}