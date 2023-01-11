import React from 'react'
import { Tooltip } from 'react-bootstrap'

export default function OnlyForLoggedInUser({ message }: { message: string }) {
  return (
    <Tooltip id="button-tooltip">
      {message}
    </Tooltip>
  )
}
