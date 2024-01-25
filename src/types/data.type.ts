export enum ROLE {
  USER,
}

export class DateAudit {
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
  updatedBy: string;
}
