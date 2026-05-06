import { OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
export declare class MetricsGateway implements OnGatewayConnection, OnGatewayDisconnect {
    server: Server;
    private logger;
    handleConnection(client: Socket): void;
    handleDisconnect(client: Socket): void;
    handleJoinProject(client: Socket, projectId: string): {
        event: string;
        data: string;
    };
    handleLeaveProject(client: Socket, projectId: string): {
        event: string;
        data: string;
    };
    broadcastMetric(projectId: string, metric: any): void;
}
