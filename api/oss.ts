import { request } from '@/api/request'
import { RcFile } from 'antd/es/upload'

let signData: {
  accessId: string
  dir: string
  expire: string
  host: string
  policy: string
  signature: string
}
const getSign = async () => {
  let res = await request<{
    data: {
      accessId: string
      dir: string
      expire: string
      host: string
      policy: string
      signature: string
    }
  }>('https://95online.cn/api/v2/infraFile/postUrl')
  return res.data
}

let lock = false
export const upload = async (
  file: File | RcFile | any,
  biz: 'DEFAULT' | 'TEMPLATE'
): Promise<string> => {
  if (lock) {
    setTimeout(() => {}, 1000)
    return upload(file, biz)
  }
  if (!signData) {
    lock = true
    signData = await getSign()
    lock = false
  }

  // 生成fileName
  let fileKey = `${signData.dir}/${biz}/${new Date().getTime()}___${file.name}`
  const formData = new FormData()
  formData.set('key', fileKey)
  formData.set('OSSAccessKeyId', signData.accessId)
  formData.set('policy', signData.policy)
  formData.set('Signature', signData.signature)
  formData.set('file', file)

  await fetch('https://cdn.95online.cn/', {
    method: 'POST',
    body: formData,
  })
  return `${signData.host}/${fileKey}`
}
