import {defineConfig} from 'sanity';
import {deskTool} from 'sanity/desk';
// @ts-ignore
import {visionTool} from '../sanity_belona-store/sanity/vision'
import {schemaTypes} from './schemas';


export default defineConfig({
  name: 'default',
  title: 'belona-store',

  projectId: 'nqo0u268',
  dataset: 'production',

  plugins: [deskTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },
})