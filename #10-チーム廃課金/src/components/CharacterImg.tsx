import React from 'react'
import styled from 'styled-components'
import { Colors, mapRarityToColor } from '../style'
import { Rarity } from '../types'

interface Props {
  src: string
  name: string
  rarity?: Rarity
  small?: boolean
  onClick?(ev: React.MouseEvent): void
}

export default function CharacterImg({
  src,
  name,
  rarity,
  small,
  onClick,
}: Props) {
  return (
    <Wrapper onClick={onClick}>
      <ImgWrapper small={small}>
        {rarity && <RaritySign rarity={rarity}>{rarity}</RaritySign>}
        <StyledCharacterImg src={src} rarity={rarity} />
        <CharacterName small={small}>{name}</CharacterName>
      </ImgWrapper>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  margin: 0 16px 32px 16px;
`

const RaritySign = styled.div<{ rarity: Rarity }>`
  position: absolute;
  left: 0;
  top: 4px;
  font-size: 12px;
  background-color: ${({ rarity }) => mapRarityToColor(rarity)};
  text-align: center;
  color: ${Colors.background};
  font-weight: bold;
  width: 2em;
  padding: 4px;
  border-radius: 4px;
`

const CharacterName = styled.div<{ small?: boolean }>`
  text-align: center;
  color: ${Colors.text};
  font-size: ${({ small }) => (small ? 12 : 14)}px;
  margin-top: 8px;
`

const ImgWrapper = styled.div<{ small?: boolean }>`
  position: relative;
  width: ${({ small }) => (small ? 50 : 100)}px;
  height: ${({ small }) => (small ? 50 : 100)}px;
`

const StyledCharacterImg = styled.img<{ rarity?: Rarity }>`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
  border: 1px solid ${({ rarity }) => mapRarityToColor(rarity)};
`
