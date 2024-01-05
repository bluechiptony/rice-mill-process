import { ErrorContent } from 'src/types/error.type';

export class Exception extends Error {
  description: string;
  status: number | 500;
  constructor(errorContent?: ErrorContent) {
    super();
    if (errorContent) {
      this.message = errorContent.message;
      this.description = errorContent.description;
      if (errorContent.status) {
        this.status = errorContent.status;
      }
    }
  }
}
