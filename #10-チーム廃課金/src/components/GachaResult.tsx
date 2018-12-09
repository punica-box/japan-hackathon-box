import React from 'react'
import styled from 'styled-components'
import { Colors, mapRarityToColor } from '../style'
import { Character, Rarity } from '../types'
import CharacterImg from './CharacterImg'
import Modal from './Modal'
import Button from './Button'

interface Props {
  character: Character
  close(): void
}

export default function GachaResult({ character, close }: Props) {
  return (
    <GachaResultModal close={close}>
      <Title>
        You got{' '}
        <CharacterName rarity={character.rarity}>
          {character.name}
        </CharacterName>
        !
      </Title>
      <ModalBody>
        <CharacterImg
          src={character.image}
          name={character.name}
          rarity={character.rarity}
        />
        <CharacterDescription>{character.description}</CharacterDescription>
        <CloseButton label="close" onClick={close} />
      </ModalBody>
    </GachaResultModal>
  )
}

const Title = styled.h1`
  font-weight: bold;
  font-size: 24px;
  text-align: center;
`

const CloseButton = styled(Button)`
  background-color: ${Colors.default};
  padding: 12px;
`

const GachaResultModal = styled(Modal)`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const ModalBody = styled.div`
  margin-top: 16px;
  display: flex;
  flex-direction: column;
`

const CharacterName = styled.span<{ rarity: Rarity }>`
  color: ${({ rarity }) => mapRarityToColor(rarity)};
`

const CharacterDescription = styled.div`
  margin: 16px 0;
  max-width: 300px;
  line-height: 1.5;
  font-size: 14px;
  color: ${Colors.textLight};
`
