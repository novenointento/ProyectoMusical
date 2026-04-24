import { Request, Response } from 'express';
import { buildExampleTask } from '../lib/templateTask';

export const getHealth = (_req: Request, res: Response) => {
  res.json({
    status: 'ok',
    service: 'backend-template',
    timestamp: new Date().toISOString(),
  });
};

export const getExampleTask = (_req: Request, res: Response) => {
  res.json(buildExampleTask());
};
