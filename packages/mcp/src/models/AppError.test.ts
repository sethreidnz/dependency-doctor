import { describe, it, expect } from "vitest";
import { AppError } from "./AppError";
import { UNKNOWN_EXCEPTION_MESSAGE } from "../constants/errors";

describe("AppError", () => {
  describe("constructor", () => {
    it("should create AppError correctly", () => {
      // arrange
      const message = "Test error message";
      const cause = new Error("Original error");
      const expected = {
        message,
        cause,
      };

      // act
      const exception = new AppError(message, { cause });

      // assert
      expect(exception).toMatchObject(expected);
      expect(exception).toBeInstanceOf(AppError);
    });
  });

  describe("fromError", () => {
    it("should create AppError correctly", () => {
      // arrange
      const originalError = new Error("Original error message");
      const expected = {
        message: "Original error message",
        cause: originalError,
      };

      // act
      const exception = AppError.fromError(originalError);

      // assert
      expect(exception).toMatchObject(expected);
      expect(exception).toBeInstanceOf(AppError);
    });
  });

  describe("fromUnknown", () => {
    it("given a string should create AppError correctly", () => {
      // arrange
      const unknownValue = "String error message";
      const expected = {
        message: "String error message",
      };

      // act
      const exception = AppError.fromUnknown(unknownValue);

      // assert
      expect(exception).toMatchObject(expected);
      expect(exception).toBeInstanceOf(AppError);
      expect(exception.cause).toBeUndefined();
    });

    it("given an object with toString() method should return correct error", () => {
      // arrange
      const unknownValue = { toString: () => "Custom toString" };
      const expected = {
        message: "Custom toString",
      };

      // act
      const exception = AppError.fromUnknown(unknownValue);

      // assert
      expect(exception).toMatchObject(expected);
      expect(exception).toBeInstanceOf(AppError);
      expect(exception.cause).toBeUndefined();
    });

    it("given value is null should create default unknown error", () => {
      // arrange
      const unknownValue = null;
      const expected = {
        message: `${UNKNOWN_EXCEPTION_MESSAGE}: ${String(unknownValue)}`,
      };

      // act
      const exception = AppError.fromUnknown(unknownValue);

      // assert
      expect(exception).toMatchObject(expected);
      expect(exception.cause).toBeUndefined();
    });

    it("given value is undefined should create default unknown error", () => {
      // arrange
      const unknownValue = undefined;
      const expected = {
        message: `${UNKNOWN_EXCEPTION_MESSAGE}: ${String(unknownValue)}`,
      };

      // act
      const exception = AppError.fromUnknown(unknownValue);

      // assert
      expect(exception).toMatchObject(expected);
      expect(exception).toBeInstanceOf(AppError);
      expect(exception.cause).toBeUndefined();
    });

    it("given is a number should create AppError correctly", () => {
      // arrange
      const unknownValue = 42;
      const expected = {
        message: `${UNKNOWN_EXCEPTION_MESSAGE}: ${String(unknownValue)}`,
      };

      // act
      const exception = AppError.fromUnknown(unknownValue);

      // assert
      expect(exception).toMatchObject(expected);
      expect(exception).toBeInstanceOf(AppError);
      expect(exception.cause).toBeUndefined();
    });

    it("given is a boolean should create AppError correctly", () => {
      // arrange
      const unknownValue = true;
      const expected = {
        message: `${UNKNOWN_EXCEPTION_MESSAGE}: ${String(unknownValue)}`,
      };

      // act
      const exception = AppError.fromUnknown(unknownValue);

      // assert
      expect(exception).toMatchObject(expected);
      expect(exception).toBeInstanceOf(AppError);
      expect(exception.cause).toBeUndefined();
    });
  });
});
