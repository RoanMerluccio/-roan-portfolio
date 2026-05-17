import { definePlugin } from 'sanity'
import { UploadTool } from './UploadTool'

export const uploadTool = definePlugin({
  name: 'upload-tool',
  tools: [
    {
      name: 'upload',
      title: 'Upload',
      component: UploadTool,
    },
  ],
})
