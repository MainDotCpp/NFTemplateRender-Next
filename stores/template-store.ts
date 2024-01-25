// @ts-nocheck
'use client'
import { Page } from '@prisma/client'
import { makeAutoObservable, toJS } from 'mobx'
import Konva from 'konva'
import { updatePage } from '@/api/template'
import { message } from 'antd'

class TemplateStore {
  currentPage?: Page = undefined
  stage: Konva.Stage | null = null

  setCurrentPage = (page: Page) => {
    this.currentPage = page
    this.initStage()
  }

  initStage = () => {
    this.stage = Konva.Node.create(this.currentPage?.content, 'container')
    let img = new Image()
    img.src = this.currentPage?.baseImgUrl!!
    // @ts-ignore
    this.stage?.find('#bg')[0].image(img)

    // 占位图填充
    // @ts-ignore
    console.log(this.stage?.getLayers())
    for (let elId of Object.keys(this.currentPage?.config)) {
      let config = this.currentPage?.config[elId]
      let node = this.stage?.findOne(`#${elId}`)
      if (node) {
        let img = new Image()
        img.src = `https://fakeimg.pl/${config.width}x${config.height}/`
        node.image(img)
      }
    }
  }

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true })
  }

  updatePageContent(content: string) {
    this.currentPage!!.content = content
    updatePage(toJS(this.currentPage!!)).then()
    message.success('保存成功').then()
  }

  addConfig(param: {
    width: number
    id: string
    type: string
    height: number
  }) {
    // @ts-ignore
    this.currentPage.config[param.id] = param
  }

  setBgImage(url: string) {
    // @ts-ignore
    let img = new Image()
    img.src = url
    this.stage?.find('#bg')[0].image(img)
    img.onload = () => {
      this.currentPage.baseImgUrl = url
      this.stage?.width(img.width)
      this.stage?.height(img.height)
    }
  }
}

export const templateStore = new TemplateStore()
