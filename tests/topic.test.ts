import { Topic } from '../src/topic'
let topic, listener, payload, topicName, channelName

beforeEach(() => {
  payload = {
    propOne: 'one',
  }
  channelName = 'rocketLaunch'
  topicName = 'rocketLanded'
  listener = jest.fn()
  topic = new Topic(topicName, channelName)
})

describe('Topic', () => {
  test('emit payload with topic specific data', () => {
    const expectedPayload = {
      payload: payload,
      channel: channelName,
      topic: topicName,
    }
    topic.addListener(listener)

    topic.emit(payload)

    expect(listener).toBeCalledWith(expect.objectContaining(expectedPayload))
  })

  test('destroy', () => {
    const emitterEmitSpy = jest.spyOn(topic.emitter, 'emit')

    topic.destroy()

    expect(emitterEmitSpy).toBeCalledWith('topic_destroyed', topic.name)
  })
})
