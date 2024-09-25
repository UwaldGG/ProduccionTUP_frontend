import { SharedEndPoints } from "./shared";

const API_URL = 'http://localhost:3000';
export const environment = {
  production: false,
  END_POINTS: new SharedEndPoints(API_URL).END_POINTS
};
