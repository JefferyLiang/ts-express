import { Controller, Get } from "express-ts-decorator";

@Controller("/api/tester")
export class TesterController {
  @Get("")
  public testerGet() {
    return "Hello express with typescript and decorator";
  }
}
