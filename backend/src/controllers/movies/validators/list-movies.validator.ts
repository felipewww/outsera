import { IsOptional, IsBooleanString } from 'class-validator';
import { ApiPropertyOptional } from "@nestjs/swagger";

export class GetMoviesQueryDto {
  @ApiPropertyOptional({ description: 'Pagina padrão = 1' })
  @IsOptional()
  page: number;

  @ApiPropertyOptional({ description: 'Filtrar por vencedores (0/1)' })
  @IsOptional()
  winner: 0 | 1;
}
