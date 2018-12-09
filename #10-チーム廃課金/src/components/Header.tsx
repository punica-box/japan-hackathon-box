import React from 'react'
import styled from 'styled-components'
import { Colors } from '../style'

export default function Header({ title }: { title: string }) {
  return <HeaderBar>{title}</HeaderBar>
}

const HeaderBar = styled.header`
  background-color: ${Colors.primary};
  color: ${Colors.background};
  text-align: center;
  font-size: 24px;
  padding: 16px 0;
  position: fixed;
  width: 100%;
  z-index: 1;
`
