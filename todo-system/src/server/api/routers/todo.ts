/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { todoInput } from "~/types";

export const todoRouter = createTRPCRouter({
  all: protectedProcedure.query(async({ctx}) => {
    const todos = await ctx.db.todo.findMany({
      where: {
        userId: ctx.session.user.id,
      },
    });
    console.log(
      'todos from prisma',
      todos.map(({id, text, done }) => ({id, text, done }))
    );
    return [
      {
        id: 'fake1',
        text: 'fake text1',
        done: false,
      },
      {
        id: 'fake2',
        text: 'fake text2',
        done: true,
      },
      {
        id: 'fake3',
        text: 'fake text3',
        done: false,
      }
    ]
  }),
  create: protectedProcedure
  .input(todoInput)
  .mutation(async ({ ctx, input }) => {
    return ctx.db.todo.create({
      data: {
        text: input,
        done: true,
        user: {
          connect: {
            id: ctx.session.user.id,
          }
        }
      }
    })
  }),
  delete: protectedProcedure
  .input(z.string())
  .mutation(async ({ ctx, input }) => {
    return ctx.db.todo.delete({
      where: {
        id: input,
      }
    })
  }),
  toggle: protectedProcedure
  .input(z.object({
    id: z.string(),
    done: z.boolean(),
  })
)
  .mutation(async ({ ctx, input: {id, done} }) => {
    return ctx.db.todo.update({
      where: {
        id,
      },
      data: {
        done,
      }
    })
  })
});
