import { PocketBase, AuthModel } from 'pocketbase';

declare namespace App {
  // interface Error {}
  interface Locals {
    pb: PocketBase
    user: User | null
  }
  // interface PageData {}
  // interface Platform {}
}