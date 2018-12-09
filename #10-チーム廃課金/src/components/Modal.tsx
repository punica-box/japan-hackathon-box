import React from 'react'
import styled from 'styled-components'
import { Colors } from '../style'

interface Props {
  close(): void
  className?: string
  children: React.ReactChild | React.ReactChild[]
}

const stopPropagation = (ev: MouseEvent | React.MouseEvent) =>
  void ev.stopPropagation()

export default function Modal({ className, children, close }: Props) {
  return (
    <>
      <ModalBackground onClick={close}>
        <ModalContainer className={className} onClick={stopPropagation}>
          {children}
        </ModalContainer>
      </ModalBackground>
    </>
  )
}

const ModalContainer = styled.div`
  position: absolute;
  box-sizing: border-box;
  background-color: ${Colors.background};
  padding: 36px;
  top: 15%;
  left: 50%;
  max-width: 95%;
  min-width: 350px;
  transform: translateX(-50%);
  border-radius: 8px;
`

const ModalBackground = styled.div`
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
`
