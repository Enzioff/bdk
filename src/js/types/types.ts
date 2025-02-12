export enum breakPointsValues {
    DESKTOP = 1300,
    MOBILE_MAX = 1299,
    MOBILE = 375
}

export enum Direction {
    LEFT = 'left',
    RIGHT = 'right',
}

declare global {
    var lead_form_ajax: {
        nonce: string;
        url: string;
    };
}

export { };