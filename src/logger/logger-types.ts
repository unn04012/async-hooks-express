export type AccessLogPayload = {
  url: string;
  method: string;
  body: Record<string, any>;
  qs: Record<string, any>;
  statusCode: number;
  error?: string;
  response: Record<any, any>;
};
