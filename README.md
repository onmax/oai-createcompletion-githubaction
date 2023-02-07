<p align="center">
  <a href="https://github.com/onmax/oai-createcompletion-githubaction/actions"><img alt="oai-createcompletion-githubaction status" src="https://github.com/onmax/oai-createcompletion-githubaction/actions/workflows/test.yml/badge.svg"></a>
</p>

# OpenAI CreateCompletion - GitHub Action

Use the OpenAI CreateCompletion feature to generate completions for text prompts to add AI-powered text generation capabilities to your workflow.

![Issue Form Parser](./oai-createcompletion-githubaction-cover.png)

---

## Description

This Action provides an easy and convenient way to use the OpenAI CreateCompletion feature in your GitHub workflows. You can create completions for text prompts using OpenAI's state-of-the-art language generation models. The action can be easily configured to use the OpenAI model of your choice and customised with parameters such as temperature and maximum number of tokens generated. You can learn more about the CreateCompletion feature [here](https://beta.openai.com/docs/api-reference/completions/create).

## Parameters

| Name | Required | Description | Default | 
| ------------- | ------------- | ------------- | ------------- |
| `model` | `true` | Model to use | - |
| `prompt` | `true` | Prompt for the model | - |
| `max_tokens` | `false` | Maximum number of tokens to generate | 12 |
| `temperature` | `false` | Temperature for the model | 0.4 |
| `openai_api_key` | `true` | OpenAI API key | - |
| `openai_org_id` | `false` | OpenAI organization ID | - |

## Usage

First, you need to create an Open AI account and get your API keys [here](https://platform.openai.com/account/api-keys). Then, save your keys as secrets in your repository going to `Settings > Secrets > Actions`. You can read more about secrets [here](https://docs.github.com/en/actions/reference/encrypted-secrets).

Finally, you can use the action in your workflow:

```yaml
steps:
  - name: Execute OpenAI CreateCompletion
    id: openai
    uses: onmax/openai-createcompletion-github-action@v1.0
    with:
      model: davinci # or curie, babbage, ada. Or any other model documented in the openai docs
      prompt: "This is a test" # the prompt to generate the completion
      max_tokens: 12 # the maximum number of tokens to generate. Optional
      temperature: 0.4 # the temperature for the model. Optional
      openai_api_key: ${{ secrets.OPENAI_API_KEY }} # your openai api key
      openai_org_id: ${{ secrets.OPENAI_ORG_ID }} # your openai organization id. Optional

  # Examples on how to use the output
  - name: Show response from OpenAI CreateCompletion
    run: |
      # Using the character `'` to prevent all characters enclosed within
      # them from being treated as special characters (e.g. $ or `)
      echo '${{ steps.openai.outputs.response }}'

      # Show texts -> Array of strings
      echo '${{ fromJson(steps.openai.outputs.response).texts }}'
```

## ⚠️ Limitations

- The action only supports the `CreateCompletion` endpoint. If you need to use other endpoints. PR are welcome!

## Example

Using the following parameters

| Name | Value |
| ------------- | ------------- |
| model | `davinci` |
| prompt | `"This is a test"` |
| max_tokens | `12` |
| temperature | `0.4` |
| openai_api_key | `${{ secrets.OPENAI_API_KEY }}` |

Will return:

```json
{
  "raw": {
    "id": "cmpl-xxxxxxxxxxxxxxxxxxxxxxxx",
    "object": "text_completion",
    "created": 1675557848,
    "model": "text-davinci-003",
    "choices": [
      {
        "text": "\n\nThis is indeed a test",
        "index": 0,
        "logprobs": null,
        "finish_reason": "length"
      }
    ],
    "usage": {
      "prompt_tokens": 5,
      "completion_tokens": 7,
      "total_tokens": 12
    }
  },
  "texts": "\n\nThis is indeed a test"
}
```

See the [example workflow](./.github/workflows/test.yml) for more details on how to use the action and the [output](https://github.com/onmax/oai-createcompletion-githubaction/actions/runs/4110827051/jobs/7094012603#step:5:4)
