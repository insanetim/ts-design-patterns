interface IProvider {
  sendMessage(message: string): void
  connect(config: unknown): void
  disconnect(): void
}

class TelegramProvider implements IProvider {
  sendMessage(message: string): void {
    console.log(message)
  }
  connect(config: string): void {
    console.log(config)
  }
  disconnect(): void {
    console.log('Disconnected TG')
  }
}

class WhatsUpProvider implements IProvider {
  sendMessage(message: string): void {
    console.log(message)
  }
  connect(config: string): void {
    console.log(config)
  }
  disconnect(): void {
    console.log('Disconnected WU')
  }
}

class NotificationSender {
  constructor(private provider: IProvider) {}

  send() {
    this.provider.connect('connect')
    this.provider.sendMessage('message')
    this.provider.disconnect()
  }
}

class DelayedNotificationSender extends NotificationSender {
  constructor(provider: IProvider) {
    super(provider)
  }

  sendDelayed() {}
}

const senderTG = new NotificationSender(new TelegramProvider())
senderTG.send()

const senderWU = new NotificationSender(new WhatsUpProvider())
senderWU.send()
