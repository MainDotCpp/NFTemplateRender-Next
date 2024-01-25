'use client'
import { Tabs } from 'antd'
import { getPages } from '@/api/template'
import { useRequest } from 'ahooks'
import HomePageSiderPages from '@/app/(v1)/render/components/home-page-sider-pages'
import { useState } from 'react'
import { observer } from 'mobx-react'
import CustomTabs from '@/app/(v1)/render/components/custom-tabs'
import PageLayerList from '@/app/(v1)/render/components/page-layer-list'

const HomePageSider = ({ templateId }: { templateId: number }) => {
  const { data: pages } = useRequest(getPages)
  const [activeTab, setActiveTab] = useState('layers')
  return (
    <div className="flex">
      <CustomTabs
        onChange={setActiveTab}
        items={[
          { label: '页面', key: 'pages' },
          { label: '图层', key: 'layers' },
          { label: '素材', key: 'material' },
          { label: '配置', key: 'config' },
        ]}
      ></CustomTabs>
      <div className={activeTab === 'pages' ? 'flex-grow' : 'hidden'}>
        <HomePageSiderPages pages={pages || []} />
      </div>
      <div className={activeTab === 'layers' ? 'flex-grow' : 'hidden'}>
        <PageLayerList />
      </div>
    </div>
  )
}

export default observer(HomePageSider)
