import type { WriteTransaction } from '@rocicorp/reflect'
import {
  initClientState,
  setCursor,
  overShape,
  selectShape,
} from './client-state'
import { putFlavor, deleteFlavor, updateFlavor } from './flavors'

export type M = typeof serverMutators

export const serverMutators = {
  createFlavor: putFlavor,
  updateFlavor,
  deleteFlavor,
  initClientState,
  setCursor,
  overShape,
  selectShape,
  nop: async (_: WriteTransaction) => {},
}

export const clientMutators: M = {
  ...serverMutators,
}
