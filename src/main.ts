import * as core from '@actions/core'
import {getResponse} from './openai'

async function run(): Promise<void> {
  try {
    const model: string = core.getInput('model')
    const max_tokens: number = parseInt(core.getInput('max_tokens'))
    const temperature: number = parseFloat(core.getInput('temperature'))
    const prompt: string = core.getInput('prompt')
    const apiKey: string = core.getInput('openai_api_key')
    const organization: string = core.getInput('openai_org_id')
    const res = await getResponse({
      modelConf: {model, prompt, max_tokens, temperature},
      apiConf: {apiKey, organization}
    })
    core.setOutput('response', JSON.stringify(res))
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}

run()
