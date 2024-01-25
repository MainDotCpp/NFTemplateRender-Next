// @ts-nocheck
'use server'
import prisma from '@/prisma/prisma'
import { Page } from '@prisma/client'

export const getPages = async () => {
  return prisma.page.findMany()
}

export const updatePage = async (page: Page) => {
  return prisma.page.update({
    where: {
      id: page.id,
    },
    data: page,
  })
}
