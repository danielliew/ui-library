export type screenSegments = 'topRight' | 'bottomRight' | 'topLeft' | 'bottomLeft'

export interface RefListenerState {
    x: number;
    y: number;
    screenSegments: screenSegments
}
