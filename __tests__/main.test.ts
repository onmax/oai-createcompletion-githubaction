import {expect, test} from '@jest/globals'
import * as cp from 'child_process'
import * as path from 'path'
import * as process from 'process'
import {getResponse} from '../src/openai'

test('logs', async () => {
  const prompt = `I am going to send you a noun that represents what an icon is. I need you to come up with words and terms that people might use to look for the icon in a search bar. For example, for cross a list of keywords would be x, times, cancel, close, clear, delete, remove, reject, refuse, deny, wrong, error, invalid, fail. For the share icon? Your response has to be with lower case and comma separated and don't add new lines.\n\n`

  const apiKey = process.env.OPENAI_API_KEY
  const organization = process.env.OPENAI_ORG_ID

  if (!apiKey) throw new Error('No API key or organization provided')

  const response = await getResponse({
    modelConf: {
      model: 'text-davinci-003',
      prompt,
      max_tokens: 60,
      temperature: 0.5
    },
    apiConf: {
      apiKey,
      organization
    }
  })

  console.log(JSON.stringify(response))
  expect(response).toBeInstanceOf(Object)
})

// shows how the runner will run a javascript action with env / stdout protocol
test('test runs', () => {
  const apiKey = process.env.OPENAI_API_KEY
  const organization = process.env.OPENAI_ORG_ID

  process.env['INPUT_MODEL'] = 'ada'
  process.env['INPUT_PROMPT'] = 'Hi!'
  process.env['INPUT_OPENAI_API_KEY'] = apiKey || ''
  process.env['INPUT_OPENAI_ORG_ID'] = organization || ''
  const np = process.execPath
  const ip = path.join(__dirname, '..', 'lib', 'main.js')
  const options: cp.ExecFileSyncOptions = {
    env: process.env
  }
  console.log(cp.execFileSync(np, [ip], options).toString())
})
