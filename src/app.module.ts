import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { AdminsModule } from './admins/admins.module';
import { ArticlesModule } from './articles/articles.module';
import { AuthModule } from './auth/auth.module';
import { CategoriesModule } from './categories/categories.module';
import { FilesModule } from './files/files.module';
import { MembersModule } from './members/members.module';

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
    CategoriesModule,
    FilesModule,
    MembersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
