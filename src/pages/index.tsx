import { workerURL } from '../util/host'
import { nanoid } from 'nanoid'

function Page() {
  return ''
}

export async function getServerSideProps() {
  // await createRoom('my-new-room')
  return {
    redirect: {
      destination: `/flavors`,
      permanent: false,
    },
  }
}

export default Page

const createRoomURL = new URL('/createRoom', workerURL).toString()

const createRoomHeaders = new Headers()
createRoomHeaders.set('Content-Type', 'application/json')
const reflectApiKey = process.env.REFLECT_API_KEY || ''
createRoomHeaders.set('x-reflect-auth-api-key', reflectApiKey)

async function createRoom(roomID: string) {
  // logger.info?.(`Creating room '${roomID}' at ${createRoomURL}`);
  const createRoomResponse = await fetch(createRoomURL, {
    method: 'POST',
    headers: createRoomHeaders,
    body: JSON.stringify({ roomID }),
  })
  if (createRoomResponse.status !== 200) {
    throw new Error(
      `Failed to create room ${roomID}: ${
        createRoomResponse.status
      }: ${await createRoomResponse.text()}`
    )
  }
}
