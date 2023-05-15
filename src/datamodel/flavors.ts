import type { ReadTransaction, WriteTransaction } from '@rocicorp/reflect'
import { create } from 'domain'
import { nanoid } from 'nanoid'
import { z } from 'zod'

export const flavorSchema = z.object({
  type: z.literal('flavor'),
  name: z.string(),
  color: z.string(),
  createdAt: z.string(),
})

export type Flavor = z.infer<typeof flavorSchema>

export async function getFlavor(
  tx: ReadTransaction,
  id: string
): Promise<Flavor | null> {
  const jv = await tx.get(key(id))
  if (!jv) {
    console.log(`Specified flavor ${id} not found.`)
    return null
  }
  return jv as Flavor
}

export function putFlavor(
  tx: WriteTransaction,
  { id, flavor }: { id: string; flavor: Flavor }
): Promise<void> {
  return tx.put(key(id), flavor)
}

export async function updateFlavor(
  tx: WriteTransaction,
  { id, flavor }: { id: string; flavor: Flavor }
): Promise<void> {
  const currFlavor = await getFlavor(tx, id)
  if (currFlavor) {
    await putFlavor(tx, {
      id,
      flavor,
    })
  }
}

export async function deleteFlavor(
  tx: WriteTransaction,
  id: string
): Promise<void> {
  await tx.del(key(id))
}

function key(id: string): string {
  return `${flavorPrefix}${id}`
}

export const flavorPrefix = 'flavor-'

export function randomFlavor() {
  return {
    id: nanoid(),
    flavor: {
      type: 'flavor',
      name: 'new flavor',
      color: 'bg-green-200',
      createdAt: new Date().toISOString(),
    } as Flavor,
  }
}
