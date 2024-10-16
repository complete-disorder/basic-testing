import { simpleCalculator, Action } from './index';

type TestSimpleCalculatorProps = {
  a: number;
  b: number;
  action: Action;
  expected: number | null;
};

type PropsWithoutAction = Omit<TestSimpleCalculatorProps, 'action'>;

type PropsWithoutExpected = Omit<TestSimpleCalculatorProps, 'expected'>;

type UnknownProps = Record<keyof PropsWithoutExpected, unknown>;

type PropsWithInvalidArguments = Omit<UnknownProps, 'action'> &
  Pick<TestSimpleCalculatorProps, 'action'>;

type PropsWithInvalidAction = Omit<
  TestSimpleCalculatorProps,
  'action' | 'expected'
> & { action: unknown };

describe('simpleCalculator tests', () => {
  const shouldCalculateNumbersCorrectly = ({
    a,
    b,
    action,
    expected,
  }: TestSimpleCalculatorProps) => {
    expect(simpleCalculator({ a, b, action })).toBe(expected);
  };

  const shouldCalculatorReturnNull = ({ a, b, action }: UnknownProps) => {
    expect(simpleCalculator({ a, b, action })).toBeNull();
  };

  const shouldAddTwoNumbersCorrectly = ({
    a,
    b,
    expected,
  }: PropsWithoutAction) => {
    shouldCalculateNumbersCorrectly({
      a,
      b,
      expected,
      action: Action.Add,
    });
  };

  const shouldSubstractTwoNumbersCorrectly = ({
    a,
    b,
    expected,
  }: PropsWithoutAction) => {
    shouldCalculateNumbersCorrectly({
      a,
      b,
      expected,
      action: Action.Subtract,
    });
  };

  const shouldMultiPlyTwoNumbersCorrectly = ({
    a,
    b,
    expected,
  }: PropsWithoutAction) => {
    shouldCalculateNumbersCorrectly({
      a,
      b,
      expected,
      action: Action.Multiply,
    });
  };

  const shoulDivideTwoNumbersCorrectly = ({
    a,
    b,
    expected,
  }: PropsWithoutAction) => {
    shouldCalculateNumbersCorrectly({
      a,
      b,
      expected,
      action: Action.Divide,
    });
  };

  const shoulExponiateTwoNumbersCorrectly = ({
    a,
    b,
    expected,
  }: PropsWithoutAction) => {
    shouldCalculateNumbersCorrectly({
      a,
      b,
      expected,
      action: Action.Exponentiate,
    });
  };

  const shouldReturnNullForInvalidArguments = ({
    a,
    b,
    action,
  }: PropsWithInvalidArguments) => {
    shouldCalculatorReturnNull({ a, b, action });
  };

  const shouldReturnNullForInvalidAction = ({
    a,
    b,
    action,
  }: PropsWithInvalidAction) => {
    shouldCalculatorReturnNull({ a, b, action });
  };

  test('should add two numbers', () => {
    shouldAddTwoNumbersCorrectly({
      a: 1,
      b: 2,
      expected: 3,
    });

    shouldAddTwoNumbersCorrectly({
      a: 1,
      b: -1,
      expected: 0,
    });

    shouldAddTwoNumbersCorrectly({
      a: 0,
      b: 0,
      expected: 0,
    });
  });

  test('should subtract two numbers', () => {
    shouldSubstractTwoNumbersCorrectly({
      a: 3,
      b: 2,
      expected: 1,
    });

    shouldSubstractTwoNumbersCorrectly({
      a: 1,
      b: 1,
      expected: 0,
    });

    shouldSubstractTwoNumbersCorrectly({
      a: 0,
      b: 0,
      expected: 0,
    });
  });

  test('should multiply two numbers', () => {
    shouldMultiPlyTwoNumbersCorrectly({
      a: 3,
      b: 3,
      expected: 9,
    });
  });

  test('should divide two numbers', () => {
    shoulDivideTwoNumbersCorrectly({
      a: 4,
      b: 2,
      expected: 2,
    });
  });

  test('should exponentiate two numbers', () => {
    shoulExponiateTwoNumbersCorrectly({
      a: 2,
      b: 3,
      expected: 8,
    });
  });

  test('should return null for invalid action', () => {
    shouldReturnNullForInvalidAction({
      a: 1,
      b: 1,
      action: 'invalid action',
    });
  });

  test('should return null for invalid arguments', () => {
    shouldReturnNullForInvalidArguments({
      a: '5',
      b: 1,
      action: Action.Add,
    });
  });
});
