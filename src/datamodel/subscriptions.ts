import type { Reflect } from '@rocicorp/reflect'
import type { M } from './mutators'
import { useSubscribe } from 'replicache-react'
import { flavorPrefix } from './flavors'

export function useFlavorIDs(reflect: Reflect<M>) {
  return useSubscribe(
    reflect,
    async (tx) => {
      const flavors = (await tx
        .scan({ prefix: flavorPrefix })
        .keys()
        .toArray()) as string[]
      return flavors.map((k) => k.substring(flavorPrefix.length))
    },
    []
  )
}

export function useFlavorByID(reflect: Reflect<M>, id: string) {
  return useSubscribe(
    reflect,
    async (tx) => {
      return await tx.get(`${flavorPrefix}${id}`)
    },
    null
  )
}
