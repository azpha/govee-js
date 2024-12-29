import type { GoveeApiResponse, GoveeCapability } from './types.ts'
import crypto from 'crypto'

const baseUrl = "https://openapi.api.govee.com/router/api/v1"
class GoveeApi {
    key: string;

    constructor(key: string) {
        this.key = key;
    }

    private generateUniqueKey() {
        return crypto.randomBytes(16).toString('hex');
    }
    private async changeDeviceCapability(payload: { device: string, sku: string, capability: GoveeCapability }) {
        try {
            const response = await fetch(`${baseUrl}/device/control`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Govee-Api-Key': this.key
                },
                body: JSON.stringify({
                    requestId: this.generateUniqueKey(),
                    payload
                })
            })

            return response.ok
        } catch (e) {
            throw e;
        }
    }

    async getDevices() {
        try {
            const response = await fetch(`${baseUrl}/user/devices`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Govee-API-Key': this.key
                }
            });
    
            if (!response.ok) {
                throw new Error(`Govee API returned status ${response.status}`);
            }
    
            const data = await response.json() as GoveeApiResponse;
            return data.data;
        } catch (error) {
            throw error;
        }
    }

    // device methods
    public light = {
        /**
         * 
         * @param device Govee Device ID
         * @param sku Govee Device SKU
         * @returns boolean
         */
        off: async (device: string, sku: string) => {
            try {
                return await this.changeDeviceCapability({
                    device,
                    sku,
                    capability: {
                        instance: "powerSwitch",
                        type: "device.capabilities.on_off",
                        value: 0
                    }
                })
            } catch (e) {
                throw e;
            }
        },

        /**
         * 
         * @param device Govee Device ID
         * @param sku Govee Device SKU
         * @returns boolean
         */
        on: async (device: string, sku: string) => {
            try {
                return await this.changeDeviceCapability({
                    device,
                    sku,
                    capability: {
                        instance: "powerSwitch",
                        type: "device.capabilities.on_off",
                        value: 1
                    }
                })
            } catch (e) {
                throw e;
            }
        },

        /**
         * 
         * @param device Govee Device ID
         * @param sku Govee Device SKU
         * @param rgb RGB Decimal Value
         * @returns boolean
         */
        color: async (device: string, sku: string, rgb: number) => {
            try {
                return await this.changeDeviceCapability({
                    device,
                    sku,
                    capability: {
                        instance: "colorRgb",
                        type: "device.capabilities.color_setting",
                        value: rgb
                    }
                })
            } catch (e) {
                throw e;
            }
        },

        /**
         * 
         * @param device Govee Device ID
         * @param sku Govee Device SKU
         * @param brightness Brightness percentage
         * @returns boolean
         */
        brightness: async (device: string, sku: string, brightness: number) => {
            try {
                return await this.changeDeviceCapability({
                    device,
                    sku,
                    capability: {
                        instance: "brightness",
                        type: "device.capabilities.range",
                        value: brightness
                    }
                })
            } catch (e) {
                throw e;
            }
        }
    }
}

export default GoveeApi