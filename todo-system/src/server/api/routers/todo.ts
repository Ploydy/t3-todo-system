import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const todoRouter = createTRPCRouter({
  getSecretMessage: protectedProcedure.query(() => {
    return [
      {
        id: 'fake1',
        text: 'fake text',
        done: false,
      },
      {
        id: 'fake2',
        text: 'fake text',
        done: true,
      },
      {
        id: 'fake3',
        text: 'fake text',
        done: false,
      }
    ]
  }),
});
