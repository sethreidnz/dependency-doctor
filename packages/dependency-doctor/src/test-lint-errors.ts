// Clean test file - should pass linting
export const validConstant = 'this is properly used';

export function validFunction(param: string): string {
  return validConstant + param.toUpperCase();
}

export interface ValidInterface {
  property: string;
}