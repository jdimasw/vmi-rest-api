import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
    @ApiProperty()
    id: number;

    @ApiProperty({default: 'user4'})
    username: string;
    
    @ApiProperty({default: 'user4'})
    password: string;

    @ApiProperty({default: 'User 4'})
    name: string;

    @ApiProperty({default: 'this is user4 description'})
    description: string;

    @ApiProperty({ enum: ['admin', 'user'], default: 'user' })
    role: string;
}
