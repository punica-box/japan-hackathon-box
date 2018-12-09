import { client } from 'ontology-dapi'
import { scriptHash } from '../../config'
import { transactions } from './firebase'

export const registerClient = () => client.registerClient({})

export const getAccount = async () => client.api.asset.getAccount()

export const rollGacha = async (): Promise<{
  characterId: number
  transaction: string
} | null> => {
  const result = (await client.api.smartContract.invoke({
    scriptHash,
    operation: 'roll_gacha',
    gasPrice: 500,
    gasLimit: 100000,
  })) as any

  if ('result' in result && result.result != null && result.result.length > 0) {
    return {
      characterId: parseInt(result.result[0], 16),
      transaction: result.transaction,
    }
  }

  return null
}

export const fetchAddress = async () =>
  await fetch(
    'https://polarisexplorer.ont.io/api/v1/explorer/address/AcTamnvFVZmR3ykoAbz291w2t1T33GtnY6/30/1'
  )
