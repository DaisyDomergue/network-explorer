import React, { useState, useReducer, useCallback } from 'react'
import styled from 'styled-components'
import { Meta } from '@storybook/react/types-6-0'

import Stats from '../Stats'
import Error from '../Error'

import NodeList from '.'

const Wrapper = styled.div`
  background-color: lightblue;
  padding: 16px;
`

export default {
  title: 'NodeList',
  component: NodeList,
  decorators: [(Story) => <Wrapper><Story /></Wrapper>],
} as Meta

const nodes = [
  {
    id: '0xa3d1F77ACfF0060F7213D7BF3c7fEC78df847De1',
    title: 'Quick Green Aadvaark',
    latitude: 60.16952,
    longitude: 24.93545,
    placeName: 'Helsinki',
  }, {
    id: '0x13581255eE2D20e780B0cD3D07fac018241B5E03',
    title: 'Warm Fiery Octagon',
    latitude: 60.14952,
    longitude: 24.92545,
    placeName: 'Helsinki',
  },
  {
    id: '0xFeaDE0B77130F5468D57037e2a259295bfdD8390',
    title: 'Gold Spicy Fieldmouse',
    latitude: 52.51667,
    longitude: 13.38333,
    placeName: 'Berlin',
  },
  {
    id: '0x538a2Fa87E03B280e10C83AA8dD7E5B15B868BD9',
    title: 'Curved Slick Diamond',
    latitude: 47.49833,
    longitude: 19.04083,
    placeName: 'Budapest',
  },
]

export const Basic = () => (
  <NodeList>
    {nodes.map(({ id, title, placeName }) => (
      <NodeList.Node
        key={id}
        nodeId={id}
        title={title}
        placeName={placeName}
      />
    ))}
  </NodeList>
)

export const WithHeader = () => (
  <NodeList>
    <NodeList.Header>
      Showing all
      {' '}
      <strong>{nodes.length}</strong>
      {' '}
      nodes
    </NodeList.Header>
    {nodes.map(({ id, title, placeName }) => (
      <NodeList.Node
        key={id}
        nodeId={id}
        title={title}
        placeName={placeName}
      />
    ))}
  </NodeList>
)

export const WithStats = () => {
  const [activeNode, setActiveNode] = useState<string | undefined>(undefined)

  return (
    <NodeList>
      {nodes.map(({ id, title, placeName }) => (
        <NodeList.Node
          key={id}
          nodeId={id}
          title={title}
          placeName={placeName}
          onClick={() => setActiveNode((prev) => prev !== id ? id : undefined)}
          isActive={activeNode === id}
        >
          <Stats>
            <Stats.Stat
              id="messagesPerSecond"
              label="Msgs/sec"
              value={undefined}
            />
            <Stats.Stat
              id="mbsPerSecond"
              label="MB/S"
              value={undefined}
            />
            <Stats.Stat
              id="latency"
              label="Latency ms"
              value={undefined}
            />
          </Stats>
        </NodeList.Node>
      ))}
    </NodeList>
  )
}

type Store = {
  activeNode?: string | undefined,
  selectedStat?: string | undefined,
  error?: string | undefined,
}

export const WithStatsAndError = () => {
  const [{
    activeNode,
    selectedStat,
    error,
  }, update] = useReducer((prevState: Store, nextState: Store) => ({
    ...(prevState || {}),
    ...nextState,
  }), {
    activeNode: undefined,
    selectedStat: undefined,
    error: undefined,
  })

  const onNodeClick = useCallback((id) => {
    update({
      activeNode: id,
      selectedStat: undefined,
      error: undefined,
    })
  }, [update])

  const onStatClick = useCallback((id) => {
    update({
      selectedStat: id,
      error: id && `Failed to load ${id}`,
    })
  }, [update])

  return (
    <NodeList>
      {nodes.map(({ id, title, placeName }) => (
        <NodeList.Node
          key={id}
          nodeId={id}
          title={title}
          placeName={placeName}
          onClick={() => onNodeClick(id !== activeNode ? id : undefined)}
          isActive={activeNode === id}
        >
          <Stats active={selectedStat}>
            <Stats.Stat
              id="messagesPerSecond"
              label="Msgs/sec"
              value={undefined}
              onClick={() => onStatClick(selectedStat !== 'messagesPerSecond' ? 'messagesPerSecond' : undefined)}
            />
            <Stats.Stat
              id="mbsPerSecond"
              label="MB/S"
              value={undefined}
              onClick={() => onStatClick(selectedStat !== 'mbsPerSecond' ? 'mbsPerSecond' : undefined)}
            />
            <Stats.Stat
              id="latency"
              label="Latency ms"
              value={undefined}
              onClick={() => onStatClick(selectedStat !== 'latency' ? 'latency' : undefined)}
            />
          </Stats>
          {!!error && (
            <Error>
              {error}
            </Error>
          )}
        </NodeList.Node>
      ))}
    </NodeList>
  )
}
