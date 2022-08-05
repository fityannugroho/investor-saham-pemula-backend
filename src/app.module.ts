import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AdminsModule } from './admins/admins.module';
import { ArticlesModule } from './articles/articles.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AdminsModule,
    ArticlesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
