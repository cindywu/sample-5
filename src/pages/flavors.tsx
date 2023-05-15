import { useState, useEffect } from 'react'
import { Reflect } from '@rocicorp/reflect'
import { M, clientMutators } from '../datamodel/mutators'
import { workerWsURI } from '../util/host'
import { randUserInfo } from '../datamodel/client-state'
import Flavors from '../components/flavors'

export default function Home() {
  const [reflect, setReflectClient] = useState<Reflect<M> | null>(null)

  useEffect(() => {
    const roomID = 'my-new-room'
    ;(async () => {
      const userID = 'reflect-user' // change to whatever clerk gives as email
      const r = new Reflect<M>({
        socketOrigin: workerWsURI,
        userID,
        roomID,
        auth: JSON.stringify({
          userID,
          roomID,
        }),
        mutators: clientMutators,
      })
      const defaultUserInfo = randUserInfo()

      await r.mutate.initClientState({
        id: await r.clientID,
        defaultUserInfo,
      })
      setReflectClient(r)
    })()
  }, [])

  if (!reflect) {
    return null
  }
  return (
    <div className={'p-4'}>
      <Flavors reflect={reflect} />
    </div>
  )
}
