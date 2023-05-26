interface IMediator {
  notify(sender: string, event: string): void
}

abstract class Mediated {
  mediator: IMediator

  setMediator(mediator: IMediator) {
    this.mediator = mediator
  }
}

class Notifications {
  send() {
    console.log('Send notification')
  }
}

class Log {
  log(message: string) {
    console.log(message)
  }
}

class EventHandler extends Mediated {
  myEvent() {
    this.mediator.notify('EventHandler', 'myEvent')
  }
}

class NotificationMediator implements IMediator {
  constructor(public notifications: Notifications, public logger: Log, public eventHandler: EventHandler) {}

  notify(_: string, event: string): void {
    switch (event) {
      case 'myEvent':
        this.notifications.send()
        this.logger.log('Sended')
        break
    }
  }
}

const handler = new EventHandler()
const logger = new Log()
const notifications = new Notifications()

const m = new NotificationMediator(notifications, logger, handler)
handler.setMediator(m)

handler.myEvent()
