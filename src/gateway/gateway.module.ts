import { Module } from '@nestjs/common';
import { GatewaySocket } from './gateway';

@Module({
  imports: [GatewaySocket],
})
export class GatewayModule {}
