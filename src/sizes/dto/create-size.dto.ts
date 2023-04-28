import { IsString, IsNotEmpty, IsArray, IsOptional } from 'class-validator';
export class CreateShirtDto {
    @IsString()
    @IsNotEmpty()
    color: string;

    @IsString()
    @IsNotEmpty()
    brand:string;

    @IsString({each: true})
    @IsArray()
    @IsOptional()
    zise?:string[];
}
