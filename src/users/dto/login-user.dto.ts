import { ApiProperty } from '@nestjs/swagger';

export class LoginUserDto {
    @ApiProperty({
        default: 'admin'
    })
    username: string;
    
    @ApiProperty({
        default: 'admin'
    })
    password: string;
}
