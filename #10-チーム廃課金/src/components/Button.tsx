import React from 'react'
import styled from 'styled-components'
import { Colors } from '../style'

interface Props {
  label: string
  className?: string
  onClick?(ev: React.MouseEvent): void
}

export default function Button({ label, className, onClick }: Props) {
  return (
    <StyledButton className={className} onClick={onClick}>
      {label}
    </StyledButton>
  )
}

const StyledButton = styled.button`
  outline: none;
  background-color: ${Colors.primary};
  color: ${Colors.background};
  border: none;
  font-size: 20px;
  padding: 12px 40px;
  border-radius: 80px;
  cursor: pointer;
`
