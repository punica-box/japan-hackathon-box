import React from 'react'
import styled from 'styled-components'
import Header from './Header'
import { Colors } from '../style'

export default function Body({
  pageTitle,
  children,
}: {
  pageTitle: string
  children: React.ReactChild
}) {
  return (
    <>
      <Header title={pageTitle} />
      <Wrapper>{children}</Wrapper>
    </>
  )
}

const Wrapper = styled.main`
  position: relative;
  padding-top: 56px;
  max-width: 800px;
  margin: 0 auto;
  color: ${Colors.text};
  font-family: -apple-system, BlinkMacSystemFont, 'Helvetica Neue', YuGothic,
    'ヒラギノ角ゴ ProN W3', Hiragino Kaku Gothic ProN, Arial, 'メイリオ', Meiryo,
    sans-serif;
  font-size: 16px;
`
