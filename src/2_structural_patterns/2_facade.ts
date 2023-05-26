class Notify {
  send(template: string, to: string) {
    console.log(`Sending ${template}: ${to}`)
  }
}

class Logger {
  log(message: string) {
    console.log(message)
  }
}

class Template {
  private templates = [{ name: 'other', template: '<h1>Template!</h1>' }]

  getByName(name: string) {
    return this.templates.find(t => t.name === name)
  }
}

class NotificationFacade {
  private notify: Notify
  private logger: Logger
  private template: Template

  constructor() {
    this.notify = new Notify()
    this.logger = new Logger()
    this.template = new Template()
  }

  send(to: string, templateName: string) {
    const data = this.template.getByName(templateName)
    if (!data) {
      this.logger.log('There is no template')
      return
    }
    this.notify.send(data.template, to)
    this.logger.log('Template is send')
  }
}

const service = new NotificationFacade()
service.send('a@a.com', 'other')
