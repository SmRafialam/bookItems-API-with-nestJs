// import { Injectable, UnauthorizedException } from "@nestjs/common";
// import { PassportStrategy } from "@nestjs/passport";
// import { ExtractJwt, Strategy } from "passport-jwt";
// import { UsersService } from "src/users/users.service";

// @Injectable()
// export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
//     constructor(private userService: UsersService) {
//         super({
//             jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
//             ignoreExpiration: false,
//             secretOrKey: process.env.JWT_SECRET,
//         })
//     }

//     async validate(payload: any) {
//     const user = await this.userService.getUserByEmailId(payload.email);
//     if (!user) {
//       throw new UnauthorizedException();
//     }
//     return { userId: payload.sub, email: payload.email };
//   }
// }