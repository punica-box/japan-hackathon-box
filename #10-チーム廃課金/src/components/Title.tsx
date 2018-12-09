import React from 'react'
import styled from 'styled-components'

export default function Title({ children }: { children: React.ReactChild }) {
  return <StyledTitle>{children}</StyledTitle>
}

const StyledTitle = styled.h2`
  font-size: 18px;
  font-weight: bold;
  text-align: center;
  margin: 32px 0 12px;
  line-height: 36px;
  white-space: pre-wrap;
`
