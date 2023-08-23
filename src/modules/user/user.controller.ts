import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  UsePipes,
  Request,
} from '@nestjs/common';
import { CreateUserService } from './services/create-user.service';
import { CreateUserDTO } from './dtos/user.dto';
import { CreateUserValidationPipe } from './pipes/create-user.validation.pipe';
import { AuthGuard } from 'src/infra/providers/auth-guard.provider';

@Controller('/users')
export class UserController {
  constructor(private readonly createUserService: CreateUserService) {}

  @Post()
  @UsePipes(new CreateUserValidationPipe())
  async create(@Body() data: CreateUserDTO) {
    return await this.createUserService.execute(data);
  }

  @Get('/profile')
  @UseGuards(AuthGuard)
  async profile(@Request() req: any) {
    console.log(req.user);
  }
}
