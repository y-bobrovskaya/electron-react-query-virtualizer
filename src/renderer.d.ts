export interface IElectronAPI {
    setTitle: (param: string) => void,
    // openURL: (param: string) => void,
    open: (param: string) => void,
    notify: () => void,
}

declare global {
    interface Window {
        electronAPI: IElectronAPI
    }
}
