import { Module } from '@nestjs/common';
import { Oauth2CredentialService } from './oauth2-credential.service';
import { Oauth2CredentialController } from './oauth2-credential.controller';

@Module({
  controllers: [Oauth2CredentialController],
  providers: [Oauth2CredentialService]
})
export class Oauth2CredentialModule {}
