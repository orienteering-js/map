import { inv, matrix, multiply } from "mathjs";

/**
 * A map callibration point, matching gps coordinates with pixel coordinates
 */
export interface MapCalibrationPoint {
  gps: { lat: number; lon: number };
  point: { x: number; y: number };
}

/**
 * A tupple of 3 callibration points
 */
export type MapCalibration = [
  MapCalibrationPoint,
  MapCalibrationPoint,
  MapCalibrationPoint
];

/**
 * A class to convert gps coordinates to pixel coordinates and vice versa from 3 calibration points
 */
export class CoordinatesConverter {
  private latLongToXYCoef: [number, number, number, number, number, number];
  private xYToLatLongCoef: [number, number, number, number, number, number];

  /**
   * @param mapCallibration A tupple of 3 callibration points, the minimum information needed to transform coordinates
   * from gps to pixel and vice versa
   */
  constructor(mapCallibration: MapCalibration) {
    this.latLongToXYCoef = multiply(
      inv(
        matrix([
          [mapCallibration[0].gps.lon, 0, mapCallibration[0].gps.lat, 0, 1, 0],
          [0, mapCallibration[0].gps.lon, 0, mapCallibration[0].gps.lat, 0, 1],
          [mapCallibration[1].gps.lon, 0, mapCallibration[1].gps.lat, 0, 1, 0],
          [0, mapCallibration[1].gps.lon, 0, mapCallibration[1].gps.lat, 0, 1],
          [mapCallibration[2].gps.lon, 0, mapCallibration[2].gps.lat, 0, 1, 0],
          [0, mapCallibration[2].gps.lon, 0, mapCallibration[2].gps.lat, 0, 1],
        ])
      ),
      [
        mapCallibration[0].point.x,
        mapCallibration[0].point.y,
        mapCallibration[1].point.x,
        mapCallibration[1].point.y,
        mapCallibration[2].point.x,
        mapCallibration[2].point.y,
      ]
    ).toArray() as [number, number, number, number, number, number];

    this.xYToLatLongCoef = multiply(
      inv(
        matrix([
          [mapCallibration[0].point.x, 0, mapCallibration[0].point.y, 0, 1, 0],
          [0, mapCallibration[0].point.x, 0, mapCallibration[0].point.y, 0, 1],
          [mapCallibration[1].point.x, 0, mapCallibration[1].point.y, 0, 1, 0],
          [0, mapCallibration[1].point.x, 0, mapCallibration[1].point.y, 0, 1],
          [mapCallibration[2].point.x, 0, mapCallibration[2].point.y, 0, 1, 0],
          [0, mapCallibration[2].point.x, 0, mapCallibration[2].point.y, 0, 1],
        ])
      ),
      [
        mapCallibration[0].gps.lon,
        mapCallibration[0].gps.lat,
        mapCallibration[1].gps.lon,
        mapCallibration[1].gps.lat,
        mapCallibration[2].gps.lon,
        mapCallibration[2].gps.lat,
      ]
    ).toArray() as [number, number, number, number, number, number];
  }

  /**
   * Convert gps coordinates to pixel coordinates
   *
   * @param latLon A tuple of a latitude and a longitude
   * @returns A tuple of an X and an Y coorinate
   */
  latLongToXY([lat, lon]: [number, number]): [number, number] {
    const x =
      this.latLongToXYCoef[0] * lon +
      this.latLongToXYCoef[2] * lat +
      this.latLongToXYCoef[4];
    const y =
      this.latLongToXYCoef[1] * lon +
      this.latLongToXYCoef[3] * lat +
      this.latLongToXYCoef[5];

    return [x, y];
  }

  /**
   * Convert pixel coordinates to gps coordinates
   *
   * @param xY A tuple of an X and an Y coorinate
   * @returns A tuple of a latitude and a longitude
   */
  xYToLatLong([x, y]: [number, number]): [number, number] {
    const lon =
      this.xYToLatLongCoef[0] * x +
      this.xYToLatLongCoef[2] * y +
      this.xYToLatLongCoef[4];
    const lat =
      this.xYToLatLongCoef[1] * x +
      this.xYToLatLongCoef[3] * y +
      this.xYToLatLongCoef[5];

    return [lat, lon];
  }
}
