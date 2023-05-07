import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "y/server/api/trpc";

export const exampleRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.note.findMany({});
  }),

  getNote: publicProcedure.input(z.string({})).query(({ ctx, input }) => {
    return ctx.prisma.note.findUnique({
      where: { id: input },
    });
  }),

  addNote: publicProcedure
    .input(
      z.object({
        title: z.string(),
        content: z.string(),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.note.create({
        data: {
          title: input.title,
          content: input.content,
        },
      });
    }),

  deleteNote: publicProcedure.input(z.string()).mutation(({ ctx, input }) => {
    return ctx.prisma.note.delete({
      where: {
        id: input,
      },
    });
  }),

  updateNote: publicProcedure
    .input(z.object({ id: z.string(), title: z.string(), content: z.string() }))
    .mutation(({ ctx, input }) => {
      return ctx.prisma.note.update({
        where: {
          id: input.id,
        },
        data: {
          title: input.title,
          content: input.content,
        },
      });
    }),
});
