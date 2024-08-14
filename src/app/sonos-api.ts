export interface SonosApiConfig {
    server: string;
    port: string;
    room: string;
    tts?: {
        enabled?: boolean;
        language?: string;
        volume?: string;
    };
}
