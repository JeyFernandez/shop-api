import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString, MinLength } from "class-validator";

export class CreateProductDto{
    @IsString()
    @MinLength(5)
    title: string;

    @IsNumber()
    price:number;

    @IsString()
    @IsOptional()
    filename:string;

    //Relacion
    @IsString({each: true})
    @IsArray()
    @IsOptional()
    images?:string[];
}