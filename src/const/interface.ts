import { Request, Response } from "express";

export interface IRequest extends Request {
  meta?: {
    user_id: number;
  };
}
export interface IResponse extends Response {}
