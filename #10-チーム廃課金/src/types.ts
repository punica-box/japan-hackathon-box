export interface Character {
  id: number
  name: string
  rarity: Rarity
  image: string
  description: string
}

export interface Transaction {
  hash: string
  address: string
  characterId: number
  timestamp: number
}

export type Rarity = 'N' | 'R' | 'SR' | 'SSR'
