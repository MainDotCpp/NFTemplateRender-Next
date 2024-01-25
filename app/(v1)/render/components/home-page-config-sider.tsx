'use client'

import { observer } from 'mobx-react'
import { templateStore } from '@/stores/template-store'

const HomePageConfigSider = () => {
  return (
    <div>
      {templateStore.stage?.getLayers().map((layer, index) => {
        return <div key={index}>图层{index + 1}</div>
      })}
    </div>
  )
}

export default observer(HomePageConfigSider)
