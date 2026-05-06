import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  Req,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiHeader } from '@nestjs/swagger';
import { DeploymentsService } from './deployments.service';
import { CreateDeploymentDto } from './dto/create-deployment.dto';
import { ApiKeyGuard } from '../../common/guards/api-key.guard';
import { Public } from '../../common/decorators/public.decorator';

@ApiTags('Deployments')
@Controller('deployments')
export class DeploymentsController {
  constructor(private readonly deploymentsService: DeploymentsService) {}

  @Public()
  @UseGuards(ApiKeyGuard)
  @Post()
  @ApiOperation({ summary: 'Record a new deployment' })
  @ApiHeader({ name: 'x-api-key', description: 'Project API Key' })
  create(@Body() createDeploymentDto: CreateDeploymentDto, @Req() req: any) {
    return this.deploymentsService.create(createDeploymentDto, req.project.id);
  }

  @ApiBearerAuth()
  @Get(':projectId')
  @ApiOperation({ summary: 'Get deployments for a project' })
  findByProject(@Param('projectId') projectId: string) {
    return this.deploymentsService.findByProject(projectId);
  }
}
