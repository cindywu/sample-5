import { useFlavorIDs } from '../datamodel/subscriptions'
import { randomFlavor } from '../datamodel/flavors'

type FlavorsProps = {
  reflect: any
}

export default function Flavors({ reflect }: FlavorsProps) {
  const ids = useFlavorIDs(reflect)
  console.log({ ids })
  console.log('hello', { reflect })

  function addNewFlavor() {
    const flavor = randomFlavor()
    console.log({ flavor })
    reflect.mutate.createFlavor(flavor)
  }

  return (
    <div>
      <div>Flavors</div>
      {ids && ids.map((id: string) => <div key={id}>{id}</div>)}
      <div onClick={() => addNewFlavor()}>add rand flavor</div>
    </div>
  )
}
