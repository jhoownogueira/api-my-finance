import { Controller, Body, Post, HttpCode } from '@nestjs/common';
import { SignInDTO } from './dtos/sign-in.dto';
import { SignInService } from './service/sign-in.service';
import { RefreshTokenDTO } from './dtos/refresh-token.dto';
import { RefreshTokenService } from './service/refresh-token.service';

@Controller('')
export class LoginController {
  constructor(
    private signInService: SignInService,
    private refreshTokenService: RefreshTokenService,
  ) {}

  @Post('/login')
  @HttpCode(200)
  async SignIn(@Body() signInDTO: SignInDTO) {
    const userTokens = await this.signInService.execute(signInDTO);
    return userTokens;
  }

  @Post('/refresh')
  @HttpCode(200)
  async refresh(@Body() refreshTokenDTO: RefreshTokenDTO) {
    return await this.refreshTokenService.execute(
      refreshTokenDTO.refresh_token,
    );
  }
}
