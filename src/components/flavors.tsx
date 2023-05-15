import { useRef, useState, useEffect } from 'react'
import { useFlavorIDs, useFlavorByID } from '../datamodel/subscriptions'
import { randomFlavor } from '../datamodel/flavors'

type FlavorsProps = {
  reflect: any
}

export default function Flavors({ reflect }: FlavorsProps) {
  const ids: string[] = useFlavorIDs(reflect)
  const inputRef = useRef<HTMLInputElement>(null)

  function addNewFlavor() {
    let flavor: any = randomFlavor()
    flavor.flavor = { ...flavor, name: inputRef.current?.value || 'no name' }
    reflect.mutate.createFlavor(flavor)
    inputRef.current.value = ''
  }

  return (
    <div className={'flex flex-row pt-4 justify-center items-center'}>
      <div className={''}>
        <div className={'text-2xl'}>Ice cream flavors 🍦</div>
        {ids &&
          ids.map((id: string) => (
            <div key={id}>
              <Flavor reflect={reflect} flavorID={id} />
            </div>
          ))}
        <div className={'bg-blue-200 flex flex-col p-4'}>
          <label htmlFor={'flavorName'}>Flavor name</label>
          <input ref={inputRef} />
          <div
            className={'bg-blue-300 mt-4 px-2'}
            onClick={() => addNewFlavor()}
          >
            add rand flavor
          </div>
        </div>
      </div>
    </div>
  )
}

function Flavor({ reflect, flavorID }: any) {
  const flavor: any = useFlavorByID(reflect, flavorID)

  return (
    <div className={'w-96 flex flex-row'}>
      {flavor && (
        <FlavorEdit flavor={flavor} reflect={reflect} flavorID={flavorID} />
      )}
      <div
        onClick={() => {
          reflect.mutate.deleteFlavor(flavorID)
        }}
      >
        delete
      </div>
    </div>
  )
}

function FlavorEdit({ flavor, reflect, flavorID }: any) {
  const [name, setName] = useState(flavor.name)

  useEffect(() => {
    let updatedFlavor = flavor
    updatedFlavor = { ...updatedFlavor, name }
    reflect.mutate.updateFlavor({ id: flavorID, flavor: updatedFlavor })
  }, [name])

  return (
    <div className={'grow'}>
      <input value={name} onChange={(e) => setName(e.target.value)} />
    </div>
  )
}
