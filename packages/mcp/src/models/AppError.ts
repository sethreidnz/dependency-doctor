import { UNKNOWN_EXCEPTION_MESSAGE } from "../constants/errors";

/**
 * An implement of Error that is used as the exception/error class in the codebase in order to parse
 * out unknown errors into a unified format
 */
export class AppError extends Error {
  /**
   * Creates a new AppException instance.
   * @param message - The error message
   * @param options - Optional error options including cause
   */
  constructor(message: string, options?: ErrorOptions) {
    super(message, options);
  }

  /**
   * Creates an AppException from an existing Error instance.
   * Preserves the original error as the cause.
   * @param error - The Error instance to convert
   * @returns A new AppException with the error's message and the error as cause
   */
  static fromError(error: Error): AppError {
    return new AppError(error.message, { cause: error });
  }

  /**
   * Creates an AppException from an unknown value.
   * Handles various input types and attempts to extract meaningful error messages.
   * @param value - The unknown value to convert to an exception
   * @returns A new AppException with an appropriate message
   */
  static fromUnknown(value: unknown): AppError {
    if (value instanceof Error) {
      return new AppError(value.message, { cause: value });
    }

    if (typeof value === "string") {
      return new AppError(value);
    }

    if (value && typeof value === "object") {
      if ("message" in value && typeof value.message === "string") {
        return new AppError(value.message);
      }

      // Try to use toString method
      if ("toString" in value && typeof value.toString === "function") {
        try {
          // eslint-disable-next-line @typescript-eslint/no-base-to-string
          const stringValue = value.toString();
          if (stringValue !== "[object Object]") {
            return new AppError(stringValue);
          }
        } catch {
          // toString failed, fall through to default handling
        }
      }
    }

    // Default case for primitive values or objects without meaningful string representation
    return new AppError(`${UNKNOWN_EXCEPTION_MESSAGE}: ${String(value)}`);
  }
}
