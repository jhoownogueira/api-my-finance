import { Controller, Body, Post } from '@nestjs/common';
import { SignInDTO } from './dtos/sign-in.dto';
import { SignInService } from './service/sign-in.service';

@Controller('/login')
export class LoginController {
  constructor(private signInService: SignInService) {}

  @Post()
  async SignIn(@Body() signInDTO: SignInDTO) {
    const token = await this.signInService.execute(signInDTO);
    return token;
  }
}
