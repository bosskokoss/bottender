/* @flow */

import wait from 'delay';

import LineBotAPIClient from '../graph/LineBotAPIClient';

import Context from './Context';
import DelayableJobQueue from './DelayableJobQueue';
import SessionData from './SessionData';

type MessageDelay = number | ((text: string) => number);

type Options = {
  client: LineBotAPIClient,
  data: SessionData,
  messageDelay: MessageDelay,
};

export default class LineContext extends Context {
  _client: LineBotAPIClient;
  _data: SessionData;
  _jobQueue: DelayableJobQueue;
  _messageDelay: MessageDelay;

  constructor({ lineAPIClient, data, messageDelay }: Options) {
    super({ data, messageDelay });
    this._client = lineAPIClient;
    this._jobQueue.beforeEach(({ delay }) => wait(delay));
  }

  sendText(text: string): void {
    this._jobQueue.enqueue({
      instance: this._client,
      method: 'pushText',
      args: [this._data.user.id, text],
      delay: this._getMessageDelay(text),
    });
  }

  sendImage(contentUrl: string, previewUrl: ?string): void {
    this._jobQueue.enqueue({
      instance: this._client,
      method: 'pushImage',
      args: [this._data.user.id, contentUrl, previewUrl],
      delay: this._getMessageDelay(),
    });
  }

  sendVideo(contentUrl: string, previewUrl: string): void {
    this._jobQueue.enqueue({
      instance: this._client,
      method: 'pushVideo',
      args: [this._data.user.id, contentUrl, previewUrl],
      delay: this._getMessageDelay(),
    });
  }

  sendAudio(contentUrl: string, duration: number): void {
    this._jobQueue.enqueue({
      instance: this._client,
      method: 'pushAudio',
      args: [this._data.user.id, contentUrl, duration],
      delay: this._getMessageDelay(),
    });
  }

  sendLocation(
    {
      title,
      address,
      latitude,
      longitude,
    },
  ): void {
    this._jobQueue.enqueue({
      instance: this._client,
      method: 'pushLocation',
      args: [
        this._data.user.id,
        {
          title,
          address,
          latitude,
          longitude,
        },
      ],
      delay: this._getMessageDelay(),
    });
  }

  sendSticker(packageId: string, stickerId: string): void {
    this._jobQueue.enqueue({
      instance: this._client,
      method: 'pushSticker',
      args: [this._data.user.id, packageId, stickerId],
      delay: this._getMessageDelay(),
    });
  }

  sendImagemap(
    altText: string,
    {
      baseUrl,
      baseHeight,
      baseWidth,
      actions,
    },
  ): void {
    this._jobQueue.enqueue({
      instance: this._client,
      method: 'pushImagemap',
      args: [
        this._data.user.id,
        altText,
        {
          baseUrl,
          baseHeight,
          baseWidth,
          actions,
        },
      ],
      delay: this._getMessageDelay(),
    });
  }

  sendButtonTemplate(
    altText: string,
    {
      thumbnailImageUrl,
      title,
      text,
      actions,
    },
  ): void {
    this._jobQueue.enqueue({
      instance: this._client,
      method: 'pushButtonTemplate',
      args: [
        this._data.user.id,
        altText,
        {
          thumbnailImageUrl,
          title,
          text,
          actions,
        },
      ],
      delay: this._getMessageDelay(),
    });
  }

  sendConfirmTemplate(
    altText: string,
    {
      text,
      actions,
    },
  ): void {
    this._jobQueue.enqueue({
      instance: this._client,
      method: 'pushConfirmTemplate',
      args: [
        this._data.user.id,
        altText,
        {
          text,
          actions,
        },
      ],
      delay: this._getMessageDelay(),
    });
  }

  sendCarouselTemplate(altText: string, columns): void {
    this._jobQueue.enqueue({
      instance: this._client,
      method: 'pushCarouselTemplate',
      args: [this._data.user.id, altText, columns],
      delay: this._getMessageDelay(),
    });
  }
}
