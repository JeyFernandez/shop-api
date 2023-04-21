import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString, MinLength } from "class-validator";

export class CreateProductDto{
    @IsString()
    @IsNotEmpty()
    @MinLength(5)
    title: string;

    @IsNumber()
    @IsNotEmpty()
    price:number;

    @IsString({each: true})
    @IsArray()
    @IsOptional()
    images?:string[];
}