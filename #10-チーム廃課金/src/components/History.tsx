import { Colors } from '../style'
import React from 'react'
import styled from 'styled-components'

interface Props {
  hash: string
  date: string
  userAddress: string
  characterName: string
}

export default function History({
  date,
  characterName,
  userAddress,
  hash,
}: Props) {
  return (
    <StyledHistory>
      <Date>{date}</Date>
      <Data>
        <Text
          target="transaction"
          rel="noopener noreferrer"
          href={`https://explorer.ont.io/transaction/${hash}/testnet`}
        >
          <UserAddress>{userAddress}</UserAddress> got{' '}
          <CharacterName>{characterName}</CharacterName>!
        </Text>
      </Data>
    </StyledHistory>
  )
}

const StyledHistory = styled.tr`
  line-height: 24px;
  margin-bottom: 24px;
  color: ${Colors.textLight};
`

const Date = styled.td`
  vertical-align: middle;
  margin-right: 2em;
`

const Data = styled.td`
  vertical-align: middle;
  line-height: 1.4;
`

const Text = styled.a`
  display: block;
  flex: 1;
  color: ${Colors.textLight};
  text-decoration: none;
`

const CharacterName = styled.span`
  font-weight: bold;
`

const UserAddress = styled.span`
  display: inline-block;
  max-width: 10em;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  vertical-align: bottom;
`
