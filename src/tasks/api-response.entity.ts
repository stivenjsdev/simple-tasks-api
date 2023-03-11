export class ApiResponse {
  message: string;
}

export class NotFoundApiResponse {
  statusCode: number;
  message: string;
  error?: string;
}

export class BadRequestApiResponse {
  statusCode: number;
  message: string[];
  error?: string;
}
