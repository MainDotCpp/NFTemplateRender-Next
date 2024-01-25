'use client'
import { Layout } from 'antd'
import { Content, Header } from 'antd/es/layout/layout'
import React from 'react'
import TheMenu from '@/app/the-menu'

export default function V1Layout({ children }: { children: React.ReactNode }) {
  return (
    <Layout className="h-screen">
      <Header>
        <TheMenu />
      </Header>
      <Content className="flex-grow">{children}</Content>
      {/*<Footer>footer</Footer>*/}
    </Layout>
  )
}
