import { NextRouter } from "next/router";

export const RouterMock = () => ({ push: jest.fn() } as unknown as NextRouter);
