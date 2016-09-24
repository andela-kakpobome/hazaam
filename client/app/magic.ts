class Greeter {
  saySomething(message: string = "what's up") {
    return message + " something"
  }
}

var greeter = new Greeter();
greeter.saySomething();
