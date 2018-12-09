import React, { useCallback, useState, useEffect } from 'react'
import moment from 'moment'
import styled from 'styled-components'

import GlobalStyle from './GlobalStyle'
import Body from './Body'
import Hero from './Hero'
import Title from './Title'
import Button from './Button'
import CharacterYouHave from './CharacterYouHave'
import History from './History'
import GachaResult from './GachaResult'
import CharacterModal from './CharacterModal'

import { rollGacha } from '../clients/ontology'
import { unique } from '../utils'
import { characterMap } from '../characters'
import { Character, Transaction } from '../types'
import { addTransaction, transactions } from '../clients/firebase'
import { Colors } from '../style'

const initialGachaResult = null

interface Props {
  userAddress: string
}

export default function Main({ userAddress }: Props) {
  const [latestTransactions, updateLatestTransactions] = useState<
    Transaction[]
  >([])
  const [isCharacterListOpen, updateIsCharacterListOpen] = useState(false)

  const [assetCharacterIds, updateAssetCharacterIds] = useState<number[]>([])

  useEffect(() => {
    transactions
      .orderByChild('timestamp')
      .limitToLast(10)
      .on('value', snapshot => {
        const tmp = []
        snapshot.forEach(item => {
          tmp.push(item.val())
        })
        updateLatestTransactions(tmp.reverse())
      })
    transactions
      .orderByChild('address')
      .equalTo(userAddress)
      .on('value', snapshot => {
        const tmp = []
        snapshot.forEach(item => {
          tmp.push(item.val().characterId)
        })
        updateAssetCharacterIds(unique(tmp))
      })
  })

  const openCharacterModal = useCallback(
    () => updateIsCharacterListOpen(true),
    [updateIsCharacterListOpen]
  )
  const closeCharacterModal = useCallback(
    () => updateIsCharacterListOpen(false),
    [updateIsCharacterListOpen]
  )

  const [gachaResult, changeGachaResult] = useState<Character | null>(
    initialGachaResult
  )

  const execRollGacha = useCallback(
    async () => {
      const { characterId, transaction } = await rollGacha()
      if (typeof characterId === 'number') {
        changeGachaResult(characterMap[characterId])
        addTransaction({
          hash: transaction,
          address: userAddress,
          characterId,
          timestamp: Date.now(),
        })
      }
    },
    [changeGachaResult, userAddress]
  )

  const closeModal = useCallback(() => void changeGachaResult(null), [
    changeGachaResult,
  ])

  const [selectedCharacterId, selectCharacterId] = useState<number | null>(null)

  const closeCharacterDetail = useCallback(() => selectCharacterId(null), [
    selectedCharacterId,
    selectCharacterId,
  ])

  return (
    <Body pageTitle="ONT-GACHA">
      <>
        <GlobalStyle />
        <Hero>{'Get a chance\nwith ONT-GACHA'}</Hero>
        <ButtonWrapper>
          <Button label="Roll a GACHA" onClick={execRollGacha} />
          <CheckCharacters onClick={openCharacterModal}>
            Check all characters
          </CheckCharacters>
        </ButtonWrapper>

        {assetCharacterIds.length > 0 && (
          <>
            <Title>Characters you have</Title>
            <CharacterWrapper>
              {assetCharacterIds.map(characterId => (
                <CharacterYouHave
                  key={characterId}
                  character={characterMap[characterId]}
                  select={selectCharacterId}
                />
              ))}
            </CharacterWrapper>
          </>
        )}

        {latestTransactions.length > 0 && (
          <>
            <Title>Everyone's GACHA history</Title>
            <HistoryWrapper>
              <tbody>
                {latestTransactions.map(transaction => (
                  <History
                    key={transaction.hash}
                    hash={transaction.hash}
                    date={moment(transaction.timestamp).format('L')}
                    characterName={characterMap[transaction.characterId].name}
                    userAddress={transaction.address}
                  />
                ))}
              </tbody>
            </HistoryWrapper>
          </>
        )}
        {isCharacterListOpen && <CharacterModal close={closeCharacterModal} />}
        {gachaResult && (
          <GachaResult character={gachaResult} close={closeModal} />
        )}
        {selectedCharacterId && (
          <GachaResult
            character={characterMap[selectedCharacterId]}
            close={closeCharacterDetail}
          />
        )}
      </>
    </Body>
  )
}

const ButtonWrapper = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  max-width: 300px;
  margin: 0 auto;
`

const CheckCharacters = styled.a`
  margin-top: 16px;
  font-size: 16px;
  text-align: center;
  color: ${Colors.assort};
  cursor: pointer;
`

const CharacterWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  margin: 0 auto;
  padding: 0 16px;
`

const HistoryWrapper = styled.table`
  border-collapse: separate;
  border-spacing: 12px;
  max-width: 500px;
  padding: 0 16px;
  margin: 0 auto;
`
