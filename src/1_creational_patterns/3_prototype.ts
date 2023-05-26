interface Prototype<T> {
  clone(): T
}

class UserHistory implements Prototype<UserHistory> {
  createdAt: Date

  constructor(public email: string, public name: string) {
    this.createdAt = new Date()
  }

  clone(): UserHistory {
    const clone = new UserHistory(this.email, this.name)
    clone.createdAt = this.createdAt

    return clone
  }
}

const user = new UserHistory('a@a.com', 'John')
console.log(user)
const user2 = user.clone()
console.log(user2)
