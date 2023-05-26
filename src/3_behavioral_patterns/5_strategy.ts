class UserStrategy {
  githubToken: string
  jwtToken: string
}

interface AuthStrategy {
  auth(user: UserStrategy): boolean
}

class Auth {
  constructor(private strategy: AuthStrategy) {}

  setStrategy(strategy: AuthStrategy) {
    this.strategy = strategy
  }

  public authUser(user: UserStrategy): boolean {
    return this.strategy.auth(user)
  }
}

class JWTStrategy implements AuthStrategy {
  auth(user: UserStrategy): boolean {
    if (user.jwtToken) {
      // ...
      return true
    }
    return false
  }
}

class GithubStrategy implements AuthStrategy {
  auth(user: UserStrategy): boolean {
    if (user.githubToken) {
      // ...
      return true
    }
    return false
  }
}

const userStrategy = new UserStrategy()
userStrategy.jwtToken = 'token'
const authStrategy = new Auth(new JWTStrategy())
console.log(authStrategy.authUser(userStrategy))
authStrategy.setStrategy(new GithubStrategy())
console.log(authStrategy.authUser(userStrategy))
