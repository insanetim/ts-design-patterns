class User {
  constructor(public userId: number) {}
}

class CommandHistory {
  public commands: Command[] = []

  push(command: Command) {
    this.commands.push(command)
  }

  remove(command: Command) {
    this.commands = this.commands.filter(c => c.commandId !== command.commandId)
  }
}

abstract class Command {
  public commandId: number

  abstract execute(): void

  constructor(public history: CommandHistory) {
    this.commandId = Math.random()
  }
}

class UserService {
  saveUser(user: User) {
    console.log(`Save user with id ${user.userId}`)
  }

  deleteUser(userId: number) {
    console.log(`Delete user with id ${userId}`)
  }
}

class AddUserCommand extends Command {
  constructor(private user: User, private receiver: UserService, history: CommandHistory) {
    super(history)
  }

  override execute(): void {
    this.receiver.saveUser(this.user)
    this.history.push(this)
  }

  undo() {
    this.receiver.deleteUser(this.user.userId)
    this.history.remove(this)
  }
}

class Controller {
  receiver: UserService
  history: CommandHistory = new CommandHistory()

  addReceiver(receiver: UserService) {
    this.receiver = receiver
  }

  run() {
    const addUserCommand = new AddUserCommand(new User(1), this.receiver, this.history)
    addUserCommand.execute()
    console.log(addUserCommand.history)
    addUserCommand.undo()
    console.log(addUserCommand.history)
  }
}

const commandController = new Controller()
commandController.addReceiver(new UserService())
commandController.run()
