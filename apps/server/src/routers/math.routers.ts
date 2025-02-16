import { Hono } from 'hono';

import { add, addThreeNumbers } from '@repo/example/addition';
import { subtract } from '@repo/example/subtraction';

export const mathRouter = new Hono();

mathRouter.get('/add', async (c) => {
  const firstNumber = 10;
  const secondNumber = 5;
  const addition = add(firstNumber, secondNumber);
  return c.json({
    type: 'add',
    problem: `${firstNumber} + ${secondNumber}`,
    solution: addition,
    message: 'Addition successful',
  });
});

mathRouter.get('/subtract', async (c) => {
  const firstNumber = 10;
  const secondNumber = 5;
  const subtraction = subtract(firstNumber, secondNumber);
  return c.json({
    type: 'subtract',
    problem: `${firstNumber} - ${secondNumber}`,
    solution: subtraction,
    message: 'Subtraction successful',
  });
});

mathRouter.get('/add-three-numbers', async (c) => {
  const firstNumber = 2;
  const secondNumber = 2;
  const thirdNumber = 2;
  const addition = addThreeNumbers(firstNumber, secondNumber, thirdNumber);
  return c.json({
    type: 'add-three-numbers',
    problem: `${firstNumber} + ${secondNumber} + ${thirdNumber}`,
    solution: addition,
    message: 'Addition of three numbers successful',
  });
});
