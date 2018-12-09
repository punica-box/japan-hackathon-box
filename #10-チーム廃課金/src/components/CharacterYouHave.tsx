import React, { useCallback } from 'react'
import styled from 'styled-components'
import CharacterImg from './CharacterImg'
import { Character } from '../types'

interface Props {
  character: Character
  select(id: number): void
}

export default function CharacterYouHave({ character, select }: Props) {
  const onClick = useCallback(() => select(character.id), [character, select])

  return (
    <Wrapper>
      <CharacterImg
        src={character.image}
        name={character.name}
        rarity={character.rarity}
        onClick={onClick}
      />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  margin: 0 8px 24px 8px;
  cursor: pointer;
`
