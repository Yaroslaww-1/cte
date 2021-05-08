import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IGoogleAuthConfig } from '@src/config/google-auth.config';
import { GOOGLE_AUTH_CONFIG } from '@src/config/config';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(private configService: ConfigService) {
    super({
      clientID: configService.get<IGoogleAuthConfig>(GOOGLE_AUTH_CONFIG)?.CLIENT_ID,
      clientSecret: configService.get<IGoogleAuthConfig>(GOOGLE_AUTH_CONFIG)?.CLIENT_SECRET,
      callbackURL: 'http://localhost:5001' + '/api/google-auth/callback',
      scope: ['email', 'profile'],
    });
  }
  /* eslint-disable @typescript-eslint/no-explicit-any */
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  async validate(accessToken: string, refreshToken: string, profile: any, done: VerifyCallback): Promise<void> {
    const { name, emails, photos } = profile;
    const user = {
      email: emails[0].value,
      firstName: name.givenName,
      lastName: name.familyName,
      picture: photos[0].value,
      accessToken,
    };
    done(null, user);
  }
}
