import { Controller } from '@nestjs/common';
import { Oauth2CredentialService } from './oauth2-credential.service';

@Controller('oauth2-credential')
export class Oauth2CredentialController {
  constructor(private readonly oauth2CredentialService: Oauth2CredentialService) {}
}
