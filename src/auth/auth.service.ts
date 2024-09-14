import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(User.name) private readonly userModel:Model<User>,
        private jwtService: JwtService
    ){
    }

    async register(registerDto: RegisterDto): Promise<{token:string}>{
        try{
            const {name, email, password} = registerDto

            const hashedPassword = await bcrypt.hash(password,10);
    
            const user = await this.userModel.create({
                name,
                email,
                password: hashedPassword
            })
    
            const token = this.jwtService.sign({id: user._id});
            console.log(token);
            return{
                token
            }
        }catch(error){
            console.error('Error registration:', error);
            throw error;         
        }
    }

    async login(loginDto: LoginDto): Promise<{token:string}> {
        try{
            const { email,password } = loginDto;
        
            const user = await this.userModel.findOne({email});
            if(!user){
                throw new UnauthorizedException('Invalid email or password');
            }
    
            const isPasswordMatched = await bcrypt.compare(password, user.password);
            if(!isPasswordMatched){
                throw new UnauthorizedException('Invalid email or password');
            }
    
            const token = this.jwtService.sign({id: user._id});
            console.log(token);
            return{
                token
            }
        }catch(error){
            console.error('Error login:', error);
            throw error;       
        }
    }
    
}
