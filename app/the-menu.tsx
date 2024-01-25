'use client'
import { Menu, MenuProps } from 'antd'
import React, { useEffect, useState } from 'react'
import { MailOutlined } from '@ant-design/icons'
import { useRouter } from 'next/navigation'

const items: MenuProps['items'] = [
  {
    label: '首页',
    key: '/',
    icon: <MailOutlined />,
  },
  {
    label: '模板市场',
    key: '/market',
    icon: <MailOutlined />,
  },
  {
    label: '设计器',
    key: '/designer',
    icon: <MailOutlined />,
  },
]
const TheMenu = () => {
  const router = useRouter()
  const [key, setKey] = useState('')
  useEffect(() => {
    let item = items.find((it) => {
      return window.location.pathname.startsWith(it!!.key!!.toString())
    })
    setKey(item?.key?.toString() || '/')
  }, [])

  return (
    <Menu
      mode="horizontal"
      theme="dark"
      selectedKeys={[key]}
      onClick={({ key }) => {
        setKey(key)
        router.push(key)
      }}
      items={items}
    />
  )
}

export default TheMenu
