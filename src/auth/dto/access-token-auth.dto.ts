import { ApiProperty } from "@nestjs/swagger";

export class AccessTokenAuthsDto {
    @ApiProperty()
    access_token: string;
}
