import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { AdminsModule } from './admins/admins.module';
import { ArticlesModule } from './articles/articles.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    {
      ...PassportModule.register({ property: 'payload' }),
      global: true,
    },
    AdminsModule,
    ArticlesModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
