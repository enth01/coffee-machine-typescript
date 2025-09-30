import { Drink } from '../Drink';
import { CoffeeMachine } from '../CoffeeMachine';

describe("CoffeeMachine", () => {
  it("should serve coffee if exact money inserted", () => {
    const machine = new CoffeeMachine();
    const drink = new Drink("Coffee", 2, false, 0, "small");

    const result = machine.serve(drink, 2, false, 10);

    expect(result).toBe("Serving Coffee (small)");
  });

  it("the machine should never allow more than 5 sugars in a drink", () => {
    const machine = new CoffeeMachine();
    const drink = new Drink("Coffee", 2, false, 6, "small");
    
    const result = machine.serve(drink, 2, false, 10);

    expect(result).toBe("Error: too much sugar")
  });

  it("should add 50 cents to the cost when the drink size is medium", () => {
    const machine = new CoffeeMachine();
    const drink = new Drink("Coffee", 2, false, 0, "medium");

    const result = machine.serve(drink, 2.5, false, 10);

    expect(result).toBe("Serving Coffee (medium)")
  });

  it("should add 1 € to the cost when the drink size is large", () => {
    const machine = new CoffeeMachine();
    const drink = new Drink("Coffee", 2, false, 0, "large");

    const result = machine.serve(drink, 3, false, 10);

    expect(result).toBe("Serving Coffee (large)");
  });

  it("should give you cange displayed with 2 decimal point, when given extra money", () => {
    const machine = new CoffeeMachine();
    const drink = new Drink("Coffee", 2, false, 0, "small");

    const result = machine.serve(drink, 2.3, false, 10);

    expect(result).toBe("Serving Coffee (small) with change 0.30");
  });

  it("milk should add 20 cents", () => {
    const machine = new CoffeeMachine();
    const drink = new Drink("Coffee", 2, true, 0, "small");

    const result = machine.serve(drink, 2.2, false, 10);

    expect(result).toBe("Serving Coffee (small)");
  });

  it("sugar should not add to the cost up to two cubes", () => {
    const machine = new CoffeeMachine();
    const drink = new Drink("Coffee", 2, false, 2, "small");

    const result = machine.serve(drink, 2, false, 10);

    expect(result).toBe("Serving Coffee (small)");
  });
  
  it("every extra cube of sugar after 2 should add 10 cents", () => {
    const machine = new CoffeeMachine();
    const drink = new Drink("Coffee", 2, false, 4, "small");

    const result = machine.serve(drink, 2.2, false, 10);

    expect(result).toBe("Serving Coffee (small)");
  });

  it("if you insert less money than the required cost, you don’t get a drink", () => {
    const machine = new CoffeeMachine();
    const drink = new Drink("Coffee", 2, false, 0, "small");

    const result = machine.serve(drink, 1, false, 10);

    expect(result).toBe("Not enough money");
  });

  it("every fifth small or medium drink is free with a loyalty card", () => {
    const machine = new CoffeeMachine();
    const drink = new Drink("Coffee", 2, false, 0, "small");

    machine.serve(drink, 2, true, 10);
    machine.serve(drink, 2, true, 10);
    machine.serve(drink, 2, true, 10);
    machine.serve(drink, 2, true, 10);

    const result = machine.serve(drink, 0, true, 10);

    expect(result).toBe("Serving Coffee (small)");
  });

  it("every fifth drink has to be paid for if you don't have a loyalty card", () => {
    const machine = new CoffeeMachine();
    const drink = new Drink("Coffee", 2, false, 0, "small");

    machine.serve(drink, 2, false, 10);
    machine.serve(drink, 2, false, 10);
    machine.serve(drink, 2, false, 10);
    machine.serve(drink, 2, false, 10);

    const result = machine.serve(drink, 0, false, 10);

    expect(result).toBe("Not enough money");
  });

  it("every fifth drink has to be paid for even if you have the loyalty card when it's a large drink", () => {
    const machine = new CoffeeMachine();
    const drink = new Drink("Coffee", 2, false, 0, "large");

    machine.serve(drink, 3, true, 10);
    machine.serve(drink, 3, true, 10);
    machine.serve(drink, 3, true, 10);
    machine.serve(drink, 3, true, 10);

    const result = machine.serve(drink, 0, true, 10);

    expect(result).toBe("Not enough money");
  });
  
  it("if price is less than zero it should throw an error", () => {
    const machine = new CoffeeMachine();
    const drink = new Drink("Coffee", -1, false, 0, "small");
    
    const result = machine.serve(drink, 2, false, 10);
    
    expect(result).toBe("Error: invalid price");
  });

  it("any drink should be 20% cheaper between 15:00 and 17:00", () => {
    const machine = new CoffeeMachine();
    const drink = new Drink("Coffee", 2, false, 0, "large");

    const result = machine.serve(drink, 2.4, false, 16);

    expect(result).toBe("Serving Coffee (large)");
  });
});
