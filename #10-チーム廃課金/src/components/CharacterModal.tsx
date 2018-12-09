import React from 'react'
import Modal from './Modal'
import styled from 'styled-components'
import Button from './Button'
import CharacterImg from './CharacterImg'
import { Colors, mapRarityToColor } from '../style'
import { Rarity, Character } from '../types'
import { characterMap } from '../characters'

interface Props {
  close(): void
}

const mapRarityToProb: { [rarity in Rarity]: number } = {
  SSR: 1,
  SR: 5,
  R: 10,
  N: 84,
}

const rarityOrder: Rarity[] = ['SSR', 'SR', 'R', 'N']

const chracters: Character[] = Object.keys(characterMap).map(
  characterId => characterMap[characterId]
)

export default function CharacterModal({ close }: Props) {
  return (
    <CharacterModalBase close={close}>
      <Title>All characters</Title>
      <ModalBody>
        {rarityOrder.map(rarity => (
          <Category key={rarity}>
            <CategoryTitle>
              <RarityLabel rarity={rarity}>{rarity}</RarityLabel>:{' '}
              {mapRarityToProb[rarity]}%
            </CategoryTitle>
            <CharactersWrapper>
              {chracters
                .filter(c => c.rarity === rarity)
                .map(c => (
                  <CharacterImg key={c.id} small src={c.image} name={c.name} />
                ))}
            </CharactersWrapper>
          </Category>
        ))}
        <Notice>
          This logic is based on the{' '}
          <a
            href="https://explorer.ont.io/transaction/e19ab07498d65d88ed7b3249f3d0da2bd4029ac7ea024add7500fe8cd19969d6/testnet"
            target="_blank"
            style={{ color: '#47a3c2', textDecoration: 'none' }}
          >
            Contract
          </a>{' '}
          deployed on Ontology.
        </Notice>
        <CloseButton label="close" onClick={close} />
      </ModalBody>
    </CharacterModalBase>
  )
}

const CharacterModalBase = styled(Modal)`
  box-sizing: border-box;
  top: 8%;
  min-width: 60%;
  padding: 24px 48px;
  max-height: 90vh;

  @media (max-width: 500px) {
    padding: 16px;
    width: 95%;
  }
`

const Notice = styled.div`
  color: ${Colors.textLight};
  font-size: 12px;
  margin-top: 16px;
`

const Category = styled.div`
  margin-top: 12px;

  @media (max-width: 500px) {
    margin-top: 12px;
  }
`

const Title = styled.h1`
  font-weight: bold;
  font-size: 24px;
  text-align: center;
`

const CloseButton = styled(Button)`
  background-color: ${Colors.default};
  padding: 12px;
  margin-top: 12px;
`

const ModalBody = styled.div`
  margin-top: 8px;
  display: flex;
  flex-direction: column;
`

const CategoryTitle = styled.h2`
  font-weight: bold;
  margin: 10px 0 4px;
  font-size: 16px;
`

const RarityLabel = styled.span<{ rarity: Rarity }>`
  color: ${({ rarity }) => mapRarityToColor(rarity)};
`

const CharactersWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  margin: 0 auto;
  padding: 0 16px;
`
