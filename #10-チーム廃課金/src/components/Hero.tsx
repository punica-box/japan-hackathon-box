import React from 'react'
import styled from 'styled-components'

export default function Hero({ children }: { children: React.ReactChild }) {
  return <HeroWrapper>{children}</HeroWrapper>
}

const HeroWrapper = styled.h1`
  font-size: 24px;
  font-weight: bold;
  text-align: center;
  margin: 32px 0;
  line-height: 36px;
  white-space: pre-wrap;
  cursor: pointer;
`
