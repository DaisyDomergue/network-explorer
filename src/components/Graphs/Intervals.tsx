import React, { useCallback } from 'react'
import styled from 'styled-components/macro'

import { useGraphContext, Interval } from './Graphs'

const IntervalChoice = styled.div`
  font-weight: 500;
  font-size: 12px;
  line-height: 32px;
  color: ${({ theme }) => theme.active ? '#323232' : '#A3A3A3'};
  background-color: ${({ theme }) => theme.active ? '#F8F8F8' : 'transparent'};
  padding: 0 13.5px;
  border-radius: 4px;
  user-select: none;
  cursor: ${({ theme }) => !theme.disabled ? 'pointer' : 'not-allowed'};
  opacity: ${({ theme }) => !theme.disabled ? '1' : '0.5'};
`

type IntervalsProps = {
  options: Array<Interval>,
  disabled?: boolean,
  onChange?: (interval: Interval) => void,
}

const labels = {
  '24hours': '24 Hours',
  '1month': '1 Month',
  '3months': '3 Months',
  'all': 'All data',
}

const UnstyledIntervals = ({
  options,
  disabled,
  onChange: onChangeProp,
  ...props
}: IntervalsProps) => {
  const { interval, setInterval } = useGraphContext()

  const onClick = useCallback((nextInterval: Interval) => {
    // typescript wtf :o
    // eslint-disable-next-line @typescript-eslint/no-implied-eval
    setInterval(nextInterval)

    if (typeof onChangeProp === 'function') {
      onChangeProp(nextInterval)
    }
  }, [setInterval, onChangeProp])

  return (
    <div {...props}>
      {(options || []).map((option) => (
        <IntervalChoice
          key={option}
          onClick={() => !disabled && onClick(option)}
          theme={{
            active: interval === option,
            disabled: !!disabled,
          }}
        >
          {labels[option] || option}
        </IntervalChoice>
      ))}
    </div>
  )
}

const Intervals = styled(UnstyledIntervals)`
  border-top: 1px solid #EFEFEF;
  display: grid;
  grid-auto-flow: column;
  justify-content: space-evenly;
  align-content: center;
`

export default Intervals