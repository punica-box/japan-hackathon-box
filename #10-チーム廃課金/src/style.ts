import { Rarity } from './types'

export enum Colors {
  primary = '#2ca5c7',
  assort = '#47a3c2',
  background = '#fff',
  default = '#999',
  text = '#333',
  textLight = '#666',
}

export function mapRarityToColor(rarity?: Rarity) {
  switch (rarity) {
    case 'N':
      return '#888'
    case 'R':
      return Colors.primary
    case 'SR':
      return '#f2ad18'
    case 'SSR':
      return '#ff1e4f'
    default:
      return '#888'
  }
}
