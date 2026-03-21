interface SuccessPayload<T> {
  success: true;
  data: T;
  message?: String;
}

interface ErrorPayload {
  success: false;
  message: String;
  statusCode: number;
}

class ApiResponse {
  static success<T>(data: T, message?: string): SuccessPayload<T> {
    return {
      success: true,
      data,
      ...(message && { message }),
    };
  }

  static error(message: string, statusCode: number): ErrorPayload {
    return {
      success: false,
      message,
      statusCode,
    };
  }
}

export default ApiResponse;
